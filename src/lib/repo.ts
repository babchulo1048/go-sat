import { db, type Dirty, type LocalAnswer, type LocalAttempt, type LocalNote, type RunnerState } from "@/lib/db";
import { getDeviceId, newId } from "@/lib/device";
import { checkAnswer, scoreAttempt } from "@/lib/scoring";
import { requestSync } from "@/lib/sync";
import type { ErrorCategoryId, Question, Test, TestPart } from "@/types/db";

/**
 * Every mutation here writes to IndexedDB and returns immediately, then nudges
 * the sync engine. Nothing in the UI ever awaits the network.
 */

const DIRTY: Dirty = 1;

/* ------------------------------------------------------------- content reads */

export async function getTests(): Promise<Test[]> {
  const tests = await db.tests.toArray();
  return tests
    .filter((t) => t.is_published)
    .sort((a, b) => a.sort_order - b.sort_order || a.title.localeCompare(b.title));
}

export async function getTest(testId: string): Promise<Test | undefined> {
  return db.tests.get(testId);
}

export async function getParts(testId: string): Promise<TestPart[]> {
  const parts = await db.parts.where("test_id").equals(testId).toArray();
  return parts.sort((a, b) => a.part_index - b.part_index);
}

export async function getQuestions(partId: string): Promise<Question[]> {
  const qs = await db.questions.where("part_id").equals(partId).toArray();
  return qs.sort((a, b) => a.order_index - b.order_index);
}

export async function getTestQuestionCount(testId: string): Promise<number> {
  const parts = await getParts(testId);
  let n = 0;
  for (const p of parts) n += await db.questions.where("part_id").equals(p.id).count();
  return n;
}

/* ---------------------------------------------------------------- attempts */

export async function createAttempt(
  testId: string,
  mode: "timed" | "untimed",
): Promise<LocalAttempt> {
  const parts = await getParts(testId);
  const first = parts[0];

  const attempt: LocalAttempt = {
    id: newId(),
    device_id: getDeviceId(),
    test_id: testId,
    status: "in_progress",
    started_at: new Date().toISOString(),
    completed_at: null,
    raw_rw: null,
    raw_math: null,
    scaled_rw: null,
    scaled_math: null,
    scaled_total: null,
    total_seconds: null,
    _dirty: DIRTY,
  };

  const runner: RunnerState = {
    attempt_id: attempt.id,
    test_id: testId,
    mode,
    part_index: 0,
    question_index: 0,
    part_deadline:
      mode === "timed" && first ? Date.now() + first.duration_seconds * 1000 : null,
    break_taken: false,
    updated_at: Date.now(),
  };

  await db.transaction("rw", [db.attempts, db.runner], async () => {
    await db.attempts.put(attempt);
    await db.runner.put(runner);
  });

  requestSync();
  return attempt;
}

export async function getRunnerState(attemptId: string): Promise<RunnerState | undefined> {
  return db.runner.get(attemptId);
}

export async function saveRunnerState(state: RunnerState): Promise<void> {
  await db.runner.put({ ...state, updated_at: Date.now() });
}

/** The single in-progress attempt, if any — powers the Home "Continue" card. */
export async function getActiveAttempt(): Promise<LocalAttempt | undefined> {
  const rows = await db.attempts.where("status").equals("in_progress").toArray();
  rows.sort((a, b) => b.started_at.localeCompare(a.started_at));
  return rows[0];
}

export async function getAttempt(id: string): Promise<LocalAttempt | undefined> {
  return db.attempts.get(id);
}

export async function listAttempts(): Promise<LocalAttempt[]> {
  const rows = await db.attempts.toArray();
  return rows.sort((a, b) => b.started_at.localeCompare(a.started_at));
}

export async function listCompletedAttempts(): Promise<LocalAttempt[]> {
  return (await listAttempts()).filter((a) => a.status === "completed");
}

export async function abandonAttempt(attemptId: string): Promise<void> {
  const a = await db.attempts.get(attemptId);
  if (!a) return;
  await db.attempts.put({ ...a, status: "abandoned", _dirty: DIRTY });
  await db.runner.delete(attemptId);
  requestSync();
}

export async function completeAttempt(attemptId: string): Promise<void> {
  const attempt = await db.attempts.get(attemptId);
  if (!attempt) return;

  const score = await scoreAttempt(attemptId);

  const updated: LocalAttempt = {
    ...attempt,
    status: "completed",
    completed_at: new Date().toISOString(),
    raw_rw: score.rawBySection.rw?.correct ?? null,
    raw_math: score.rawBySection.math?.correct ?? null,
    scaled_rw: score.scaledBySection.rw ?? null,
    scaled_math: score.scaledBySection.math ?? null,
    scaled_total: score.scaledTotal,
    total_seconds: score.totalSeconds,
    _dirty: DIRTY,
  };

  await db.transaction("rw", [db.attempts, db.runner], async () => {
    await db.attempts.put(updated);
    await db.runner.delete(attemptId);
  });

  requestSync();
}

/* ----------------------------------------------------------------- answers */

export async function getAnswers(attemptId: string): Promise<LocalAnswer[]> {
  return db.answers.where("attempt_id").equals(attemptId).toArray();
}

export async function getAnswerFor(
  attemptId: string,
  questionId: string,
): Promise<LocalAnswer | undefined> {
  return db.answers
    .where("attempt_id")
    .equals(attemptId)
    .and((a) => a.question_id === questionId)
    .first();
}

/**
 * Upsert an answer. Correctness is computed here, at write time, so results and
 * the mistake log never depend on being online.
 *
 * `addSeconds` accumulates — a question revisited three times sums its time,
 * which is what the pacing statistics need.
 */
export async function saveAnswer(params: {
  attemptId: string;
  question: Question;
  selected: string | null;
  addSeconds?: number;
  flagged?: boolean;
}): Promise<void> {
  const { attemptId, question, selected, addSeconds = 0, flagged } = params;

  /*
   * The read-then-write MUST be atomic.
   *
   * The runner calls this from two places that can overlap: selecting an
   * answer (fire-and-forget) and navigating away (awaited). Without a
   * transaction both calls saw "no existing row", minted different ids, and
   * wrote two local rows for the same question. Locally harmless — but the
   * server has a unique constraint on (attempt_id, question_id), so the batch
   * upsert 409s and sync stays broken forever after. Dexie serialises
   * transactions on the same table, which closes the race.
   */
  await db.transaction("rw", db.answers, async () => {
    const existing = await db.answers
      .where("attempt_id")
      .equals(attemptId)
      .and((a) => a.question_id === question.id)
      .first();

    const row: LocalAnswer = {
      id: existing?.id ?? newId(),
      attempt_id: attemptId,
      question_id: question.id,
      selected,
      is_correct: checkAnswer(question, selected),
      seconds_spent: (existing?.seconds_spent ?? 0) + Math.max(0, Math.round(addSeconds)),
      was_flagged: flagged ?? existing?.was_flagged ?? false,
      error_category: existing?.error_category ?? null,
      _dirty: DIRTY,
      _answeredAt: Date.now(),
    };

    await db.answers.put(row);
  });

  requestSync();
}

export async function setErrorCategory(
  answerId: string,
  category: ErrorCategoryId | null,
): Promise<void> {
  const a = await db.answers.get(answerId);
  if (!a) return;
  await db.answers.put({ ...a, error_category: category, _dirty: DIRTY });
  requestSync();
}

/** Every wrong answer ever recorded — the mistake log's source. */
export async function getAllWrongAnswers(): Promise<LocalAnswer[]> {
  const rows = await db.answers.toArray();
  return rows.filter((a) => !a.is_correct);
}

/* ------------------------------------------------------------------- notes */

export async function listNotes(): Promise<LocalNote[]> {
  const rows = await db.notes.toArray();
  return rows
    .filter((n) => n._deleted !== 1)
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at));
}

export async function getNoteFor(params: {
  attemptId?: string | null;
  questionId?: string | null;
}): Promise<LocalNote | undefined> {
  const { attemptId = null, questionId = null } = params;
  const rows = await db.notes.toArray();
  return rows.find(
    (n) =>
      n._deleted !== 1 &&
      (n.attempt_id ?? null) === attemptId &&
      (n.question_id ?? null) === questionId,
  );
}

export async function upsertNote(params: {
  id?: string;
  attemptId?: string | null;
  questionId?: string | null;
  body: string;
}): Promise<LocalNote | null> {
  const { id, attemptId = null, questionId = null, body } = params;
  const existing = id
    ? await db.notes.get(id)
    : await getNoteFor({ attemptId, questionId });

  // An emptied note is a deleted note.
  if (!body.trim()) {
    if (existing) await deleteNote(existing.id);
    return null;
  }

  const now = new Date().toISOString();
  const row: LocalNote = {
    id: existing?.id ?? newId(),
    device_id: getDeviceId(),
    attempt_id: attemptId,
    question_id: questionId,
    body,
    created_at: existing?.created_at ?? now,
    updated_at: now,
    _dirty: DIRTY,
  };

  await db.notes.put(row);
  requestSync();
  return row;
}

export async function deleteNote(noteId: string): Promise<void> {
  const n = await db.notes.get(noteId);
  if (!n) return;
  // Tombstone rather than hard-delete, so the deletion reaches the server too.
  await db.notes.put({ ...n, _deleted: 1, _dirty: DIRTY });
  requestSync();
}

/* --------------------------------------------------------------- wipe data */

export async function resetAllProgress(): Promise<void> {
  await db.transaction("rw", [db.attempts, db.answers, db.notes, db.runner], async () => {
    await Promise.all([
      db.attempts.clear(),
      db.answers.clear(),
      db.notes.clear(),
      db.runner.clear(),
    ]);
  });
}
