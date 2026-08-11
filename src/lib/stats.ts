import { db, type LocalAnswer, type LocalAttempt } from "@/lib/db";
import { dayKey } from "@/lib/format";
import type { Domain, ErrorCategoryId, Question, Section, TestPart } from "@/types/db";

/**
 * Aggregations for Home and Progress. Everything reads from IndexedDB so the
 * dashboards work offline exactly like the rest of the app.
 */

export interface EnrichedAnswer {
  answer: LocalAnswer;
  question: Question;
  section: Section;
  domainId: string;
  answeredAt: number;
}

/** Join answers to their question, part and section once, then reuse. */
export async function loadEnrichedAnswers(): Promise<EnrichedAnswer[]> {
  const [answers, questions, parts] = await Promise.all([
    db.answers.toArray(),
    db.questions.toArray(),
    db.parts.toArray(),
  ]);

  const qById = new Map<string, Question>(questions.map((q) => [q.id, q]));
  const sectionByPart = new Map<string, Section>(
    parts.map((p: TestPart) => [p.id, p.section]),
  );

  const out: EnrichedAnswer[] = [];
  for (const a of answers) {
    const q = qById.get(a.question_id);
    if (!q) continue;
    const section = sectionByPart.get(q.part_id);
    if (!section) continue;
    out.push({
      answer: a,
      question: q,
      section,
      domainId: q.domain_id,
      answeredAt: a._answeredAt ?? 0,
    });
  }
  return out;
}

export async function getDomainMap(): Promise<Map<string, Domain>> {
  const domains = await db.domains.toArray();
  return new Map(domains.map((d) => [d.id, d]));
}

/* ------------------------------------------------------------ daily habits */

export function countOnDay(rows: EnrichedAnswer[], day: string): number {
  return rows.filter((r) => r.answeredAt && dayKey(r.answeredAt) === day).length;
}

export function countInLastDays(rows: EnrichedAnswer[], days: number): number {
  const cutoff = Date.now() - days * 86_400_000;
  return rows.filter((r) => r.answeredAt >= cutoff).length;
}

/**
 * Consecutive days with at least one question answered, counting back from
 * today. Yesterday still counts as alive so an evening study session doesn't
 * appear to break the streak the following morning.
 */
export function computeStreak(rows: EnrichedAnswer[]): number {
  const days = new Set(rows.filter((r) => r.answeredAt).map((r) => dayKey(r.answeredAt)));
  if (!days.size) return 0;

  const today = new Date();
  if (!days.has(dayKey(today))) {
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (!days.has(dayKey(yesterday))) return 0;
    today.setDate(today.getDate() - 1);
  }

  let streak = 0;
  const cursor = new Date(today);
  while (days.has(dayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** Answer counts per day for the last N days — the consistency heatmap. */
export function activityByDay(
  rows: EnrichedAnswer[],
  days: number,
): { day: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const r of rows) {
    if (!r.answeredAt) continue;
    const k = dayKey(r.answeredAt);
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }

  const out: { day: string; count: number }[] = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() - (days - 1));
  for (let i = 0; i < days; i += 1) {
    const k = dayKey(cursor);
    out.push({ day: k, count: counts.get(k) ?? 0 });
    cursor.setDate(cursor.getDate() + 1);
  }
  return out;
}

/* ------------------------------------------------------------ accuracy */

export interface DomainStat {
  id: string;
  name: string;
  section: Section;
  correct: number;
  total: number;
  accuracy: number;
  avgSeconds: number;
}

export function domainStats(
  rows: EnrichedAnswer[],
  domains: Map<string, Domain>,
  sinceDays?: number,
): DomainStat[] {
  const cutoff = sinceDays ? Date.now() - sinceDays * 86_400_000 : 0;
  const agg = new Map<string, { correct: number; total: number; seconds: number }>();

  for (const r of rows) {
    if (cutoff && r.answeredAt < cutoff) continue;
    const cur = agg.get(r.domainId) ?? { correct: 0, total: 0, seconds: 0 };
    cur.total += 1;
    cur.seconds += r.answer.seconds_spent;
    if (r.answer.is_correct) cur.correct += 1;
    agg.set(r.domainId, cur);
  }

  return [...agg.entries()]
    .map(([id, v]) => {
      const d = domains.get(id);
      return {
        id,
        name: d?.name ?? id,
        section: d?.section ?? "rw",
        correct: v.correct,
        total: v.total,
        accuracy: v.total ? v.correct / v.total : 0,
        avgSeconds: v.total ? Math.round(v.seconds / v.total) : 0,
      };
    })
    .sort((a, b) => a.accuracy - b.accuracy); // weakest first
}

/* -------------------------------------------------- error category trends */

export interface ErrorCategoryPoint {
  label: string;
  /** counts keyed by category id */
  counts: Record<ErrorCategoryId, number>;
  total: number;
}

/**
 * Error-category mix bucketed into weeks. This is the leading indicator: when
 * categories 1–2 (knowledge) shrink while 4–5 (execution) grow, real progress
 * is happening even if the score hasn't moved yet.
 */
export function errorCategoryTrend(
  rows: EnrichedAnswer[],
  weeks = 6,
): ErrorCategoryPoint[] {
  const now = Date.now();
  const week = 7 * 86_400_000;
  const points: ErrorCategoryPoint[] = [];

  for (let i = weeks - 1; i >= 0; i -= 1) {
    const end = now - i * week;
    const start = end - week;
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 } as Record<
      ErrorCategoryId,
      number
    >;
    let total = 0;

    for (const r of rows) {
      const cat = r.answer.error_category;
      if (!cat) continue;
      if (r.answeredAt < start || r.answeredAt >= end) continue;
      counts[cat] += 1;
      total += 1;
    }

    points.push({
      label: i === 0 ? "This week" : `${i}w ago`,
      counts,
      total,
    });
  }

  return points;
}

export function errorCategoryTotals(
  rows: EnrichedAnswer[],
): Record<ErrorCategoryId, number> {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 } as Record<
    ErrorCategoryId,
    number
  >;
  for (const r of rows) {
    if (r.answer.error_category) counts[r.answer.error_category] += 1;
  }
  return counts;
}

/* ------------------------------------------------------------ pacing */

export function avgSecondsBySection(
  rows: EnrichedAnswer[],
  sinceDays?: number,
): Partial<Record<Section, number>> {
  const cutoff = sinceDays ? Date.now() - sinceDays * 86_400_000 : 0;
  const agg: Partial<Record<Section, { seconds: number; n: number }>> = {};

  for (const r of rows) {
    if (cutoff && r.answeredAt < cutoff) continue;
    const cur = (agg[r.section] ??= { seconds: 0, n: 0 });
    cur.seconds += r.answer.seconds_spent;
    cur.n += 1;
  }

  const out: Partial<Record<Section, number>> = {};
  (Object.keys(agg) as Section[]).forEach((s) => {
    const v = agg[s]!;
    if (v.n) out[s] = Math.round(v.seconds / v.n);
  });
  return out;
}

/* ------------------------------------------------------------ score history */

export interface ScorePoint {
  date: string;
  label: string;
  total: number | null;
  rw: number | null;
  math: number | null;
}

export function scoreHistory(
  attempts: LocalAttempt[],
  titleById: Map<string, string>,
): ScorePoint[] {
  return attempts
    .filter((a) => a.status === "completed" && a.scaled_total !== null)
    .sort((a, b) => (a.completed_at ?? "").localeCompare(b.completed_at ?? ""))
    .map((a) => ({
      date: a.completed_at ?? a.started_at,
      label: titleById.get(a.test_id) ?? "Test",
      total: a.scaled_total,
      rw: a.scaled_rw,
      math: a.scaled_math,
    }));
}
