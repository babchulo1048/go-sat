import { db, type LocalDetResponse, type VocabProgress } from "@/lib/db";
import { getDeviceId, newId } from "@/lib/device";
import { requestSync } from "@/lib/sync";
import type { DetMetrics, DetMode, DetTaskId, RubricKey, SelfScores } from "./types";

export async function saveDetResponse(params: {
  taskId: DetTaskId;
  promptId: string;
  mode: DetMode;
  text: string;
  part2: string | null;
  metrics: DetMetrics;
  selfScores: SelfScores;
  reflection: string;
}): Promise<LocalDetResponse> {
  const row: LocalDetResponse = {
    id: newId(),
    device_id: getDeviceId(),
    task_id: params.taskId,
    prompt_id: params.promptId,
    mode: params.mode,
    response_text: params.text,
    part2_text: params.part2,
    audio_mime: null,
    duration_seconds: params.metrics.seconds_used,
    metrics: params.metrics,
    self_scores: params.selfScores,
    reflection: params.reflection.trim() || null,
    created_at: new Date().toISOString(),
    _dirty: 1,
  };
  await db.detResponses.put(row);
  requestSync();
  return row;
}

export async function listDetResponses(taskId?: DetTaskId): Promise<LocalDetResponse[]> {
  const rows = taskId
    ? await db.detResponses.where("task_id").equals(taskId).toArray()
    : await db.detResponses.toArray();
  return rows.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function averageSelfScore(scores: SelfScores | null): number | null {
  if (!scores) return null;
  const vals = Object.values(scores).filter((v): v is 1 | 2 | 3 | 4 => typeof v === "number");
  return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
}

/** Average per criterion across attempts — the trend she should watch. */
export function criterionAverages(rows: LocalDetResponse[]): Partial<Record<RubricKey, number>> {
  const sums: Partial<Record<RubricKey, { t: number; n: number }>> = {};
  for (const r of rows) {
    for (const [k, v] of Object.entries(r.self_scores ?? {})) {
      if (typeof v !== "number") continue;
      const cur = (sums[k as RubricKey] ??= { t: 0, n: 0 });
      cur.t += v;
      cur.n += 1;
    }
  }
  const out: Partial<Record<RubricKey, number>> = {};
  for (const [k, { t, n }] of Object.entries(sums) as [RubricKey, { t: number; n: number }][]) {
    out[k] = Math.round((t / n) * 10) / 10;
  }
  return out;
}

/* ----------------------------------------------------------- vocabulary */

export async function getVocabProgress(): Promise<Map<string, VocabProgress>> {
  const rows = await db.vocabProgress.toArray();
  return new Map(rows.map((r) => [r.term, r]));
}

export async function setVocabStatus(
  term: string,
  status: VocabProgress["status"],
  sentence?: string,
): Promise<void> {
  const cur = await db.vocabProgress.get(term);
  await db.vocabProgress.put({
    term,
    status,
    sentence: sentence ?? cur?.sentence ?? "",
    updated_at: Date.now(),
  });
}

export async function saveVocabSentence(term: string, sentence: string): Promise<void> {
  const cur = await db.vocabProgress.get(term);
  await db.vocabProgress.put({
    term,
    status: cur?.status === "known" ? "known" : "learning",
    sentence,
    updated_at: Date.now(),
  });
}

/* --------------------------------------------------------------- drills */

export async function recordDrill(pattern: string, plain: string, answer: string, correct: boolean) {
  await db.drillAttempts.add({ pattern, plain, answer, correct, at: Date.now() });
}

export async function drillStats(): Promise<Map<string, { done: number; correct: number }>> {
  const out = new Map<string, { done: number; correct: number }>();
  for (const a of await db.drillAttempts.toArray()) {
    const cur = out.get(a.pattern) ?? { done: 0, correct: 0 };
    cur.done += 1;
    if (a.correct) cur.correct += 1;
    out.set(a.pattern, cur);
  }
  return out;
}
