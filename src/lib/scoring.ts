import { db } from "@/lib/db";
import type { Question, Section } from "@/types/db";

// Re-exported so existing imports of `checkAnswer` from scoring keep working.
export { checkAnswer } from "@/lib/answerCheck";

/* ============================================================================
   SCALED SCORES
   ========================================================================= */

/**
 * Raw → scaled using the seeded conversion table.
 *
 * IMPORTANT: this is an approximation. The real SAT scores with item response
 * theory over an adaptive form, where WHICH questions you answered correctly
 * changes the result. A linear practice test cannot reproduce that, which is
 * why every score in this app is labelled "Estimated".
 */
export async function rawToScaled(section: Section, raw: number): Promise<number> {
  const exact = await db.conversions.get([section, raw]);
  if (exact) return exact.scaled;

  // Table gap or out-of-range: clamp to the nearest defined row.
  const rows = await db.conversions.where("section").equals(section).toArray();
  if (!rows.length) return 200;
  rows.sort((a, b) => a.raw_score - b.raw_score);
  const first = rows[0]!;
  const last = rows[rows.length - 1]!;
  if (raw <= first.raw_score) return first.scaled;
  if (raw >= last.raw_score) return last.scaled;

  let best = first;
  for (const r of rows) {
    if (Math.abs(r.raw_score - raw) < Math.abs(best.raw_score - raw)) best = r;
  }
  return best.scaled;
}

/* ============================================================================
   ESTIMATE BANDS

   The app never shows a single score number for a mock. A point value like
   "1280" reads as a fact and gets remembered as one, however it is labelled —
   and it isn't a fact. Two sources of error stack up here:

     1. This test is linear. The real SAT routes you into an easier or harder
        second module and scores with item response theory, so WHICH questions
        you answered correctly changes the result.
     2. These are original questions written to the published spec, not
        calibrated College Board items.

   A band is the honest representation, and it still shows progress across
   several attempts, which is the only thing a practice score is good for.
   ========================================================================= */

export const ESTIMATE_MARGIN_TOTAL = 50;
export const ESTIMATE_MARGIN_SECTION = 30;

export interface ScoreBand {
  low: number;
  high: number;
}

export function scoreBand(
  scaled: number,
  margin: number,
  min: number,
  max: number,
): ScoreBand {
  const round10 = (n: number) => Math.round(n / 10) * 10;
  return {
    low: Math.max(min, round10(scaled - margin)),
    high: Math.min(max, round10(scaled + margin)),
  };
}

export const totalBand = (scaled: number): ScoreBand =>
  scoreBand(scaled, ESTIMATE_MARGIN_TOTAL, 400, 1600);

export const sectionBand = (scaled: number): ScoreBand =>
  scoreBand(scaled, ESTIMATE_MARGIN_SECTION, 200, 800);

export const formatBand = (b: ScoreBand): string => `${b.low}–${b.high}`;

export interface DomainBreakdown {
  domain_id: string;
  correct: number;
  total: number;
  accuracy: number;
  avgSeconds: number;
}

export interface AttemptScore {
  rawBySection: Partial<Record<Section, { correct: number; total: number }>>;
  scaledBySection: Partial<Record<Section, number>>;
  scaledTotal: number | null;
  correct: number;
  total: number;
  accuracy: number;
  totalSeconds: number;
  avgSecondsBySection: Partial<Record<Section, number>>;
  byDomain: DomainBreakdown[];
}

/**
 * Score a completed attempt from local data only, so results work offline.
 * `sectionsPresent` decides whether a scaled 400–1600 total is meaningful:
 * only a full mock covering both sections earns one.
 */
export async function scoreAttempt(attemptId: string): Promise<AttemptScore> {
  const answers = await db.answers.where("attempt_id").equals(attemptId).toArray();
  const questionIds = answers.map((a) => a.question_id);
  const questions = await db.questions.bulkGet(questionIds);

  const qById = new Map<string, Question>();
  questions.forEach((q) => q && qById.set(q.id, q));

  const partIds = [...new Set([...qById.values()].map((q) => q.part_id))];
  const parts = await db.parts.bulkGet(partIds);
  const sectionByPart = new Map<string, Section>();
  parts.forEach((p) => p && sectionByPart.set(p.id, p.section));

  const rawBySection: AttemptScore["rawBySection"] = {};
  const secondsBySection: Partial<Record<Section, number>> = {};
  const countBySection: Partial<Record<Section, number>> = {};
  const domainAgg = new Map<string, { correct: number; total: number; seconds: number }>();

  let correct = 0;
  let totalSeconds = 0;

  for (const a of answers) {
    const q = qById.get(a.question_id);
    if (!q) continue;
    const section = sectionByPart.get(q.part_id);

    if (a.is_correct) correct += 1;
    totalSeconds += a.seconds_spent;

    if (section) {
      const bucket = (rawBySection[section] ??= { correct: 0, total: 0 });
      bucket.total += 1;
      if (a.is_correct) bucket.correct += 1;
      secondsBySection[section] = (secondsBySection[section] ?? 0) + a.seconds_spent;
      countBySection[section] = (countBySection[section] ?? 0) + 1;
    }

    const d = domainAgg.get(q.domain_id) ?? { correct: 0, total: 0, seconds: 0 };
    d.total += 1;
    d.seconds += a.seconds_spent;
    if (a.is_correct) d.correct += 1;
    domainAgg.set(q.domain_id, d);
  }

  const scaledBySection: AttemptScore["scaledBySection"] = {};
  for (const section of Object.keys(rawBySection) as Section[]) {
    scaledBySection[section] = await rawToScaled(section, rawBySection[section]!.correct);
  }

  // A 400–1600 total is only meaningful when both sections were attempted.
  const hasBoth = scaledBySection.rw !== undefined && scaledBySection.math !== undefined;
  const scaledTotal = hasBoth ? scaledBySection.rw! + scaledBySection.math! : null;

  const avgSecondsBySection: Partial<Record<Section, number>> = {};
  (Object.keys(secondsBySection) as Section[]).forEach((s) => {
    const n = countBySection[s] ?? 0;
    if (n > 0) avgSecondsBySection[s] = Math.round((secondsBySection[s] ?? 0) / n);
  });

  const byDomain: DomainBreakdown[] = [...domainAgg.entries()]
    .map(([domain_id, v]) => ({
      domain_id,
      correct: v.correct,
      total: v.total,
      accuracy: v.total ? v.correct / v.total : 0,
      avgSeconds: v.total ? Math.round(v.seconds / v.total) : 0,
    }))
    .sort((a, b) => a.accuracy - b.accuracy); // weakest first, always

  return {
    rawBySection,
    scaledBySection,
    scaledTotal,
    correct,
    total: answers.length,
    accuracy: answers.length ? correct / answers.length : 0,
    totalSeconds,
    avgSecondsBySection,
    byDomain,
  };
}
