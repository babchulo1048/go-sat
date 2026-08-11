import Dexie, { type Table } from "dexie";
import type {
  Answer,
  Attempt,
  Domain,
  Note,
  Question,
  ScoreConversion,
  Skill,
  Test,
  TestPart,
} from "@/types/db";

/**
 * IndexedDB mirror of the Supabase schema.
 *
 * Content tables (domains…score_conversions) are a read-through cache: they are
 * replaced from the server whenever we can reach it, and read from locally
 * always.
 *
 * User tables (attempts, answers, notes) are the OPPOSITE: local is the source
 * of truth. Every write lands here first and synchronously; the server is a
 * backup that catches up later. `_dirty` marks rows the server hasn't confirmed.
 *
 * Using a dirty FLAG rather than an operation QUEUE keeps sync idempotent —
 * replaying it can never double-apply anything, and a row edited three times
 * offline syncs once.
 */

/** IndexedDB cannot index booleans, so dirtiness is 0 | 1. */
export type Dirty = 0 | 1;

export type LocalAttempt = Attempt & { _dirty: Dirty };
export type LocalNote = Note & { _dirty: Dirty; _deleted?: Dirty };

/**
 * `_answeredAt` is local-only (epoch ms) and stripped before upload — the
 * server `answers` table has no timestamp column. It exists because the daily
 * goal, the streak and the consistency calendar all need to know WHEN a
 * question was answered, which the parent attempt's start time can't tell us
 * once she reviews or re-attempts on a later day.
 */
export type LocalAnswer = Answer & { _dirty: Dirty; _answeredAt: number };

/** Live state of an in-progress test, so a refresh resumes exactly. */
export interface RunnerState {
  attempt_id: string;
  test_id: string;
  mode: "timed" | "untimed";
  part_index: number;
  question_index: number;
  /**
   * Epoch ms at which the CURRENT part expires (null in untimed mode).
   *
   * Deliberately stored as an absolute deadline rather than "seconds
   * remaining": it makes resume-after-refresh correct for free, with no
   * per-tick persistence and no drift.
   */
  part_deadline: number | null;
  break_taken: boolean;
  updated_at: number;
}

export interface MetaRow {
  key: string;
  value: unknown;
}

/**
 * A spaced re-attempt of a previously-missed question.
 *
 * Deliberately LOCAL-ONLY: the server `answers` table is keyed to a formal
 * attempt, and a re-attempt belongs to no single test. Keeping it local avoids
 * inventing a synthetic test row just to satisfy a foreign key. The trade-off
 * is that re-attempt history doesn't follow her to another device — acceptable
 * for a single-phone study tool, and the underlying mistakes still sync.
 */
export interface Reattempt {
  id?: number;
  question_id: string;
  correct: boolean;
  at: number;
}

class SatDatabase extends Dexie {
  domains!: Table<Domain, string>;
  skills!: Table<Skill, string>;
  tests!: Table<Test, string>;
  parts!: Table<TestPart, string>;
  questions!: Table<Question, string>;
  conversions!: Table<ScoreConversion, [string, number]>;

  attempts!: Table<LocalAttempt, string>;
  answers!: Table<LocalAnswer, string>;
  notes!: Table<LocalNote, string>;

  runner!: Table<RunnerState, string>;
  meta!: Table<MetaRow, string>;
  reattempts!: Table<Reattempt, number>;

  constructor() {
    super("sat-practice");
    this.version(1).stores({
      domains: "id, section, sort_order",
      skills: "id, domain_id",
      tests: "id, slug, test_type, section_scope, focus_domain_id, sort_order",
      parts: "id, test_id, part_index",
      questions: "id, part_id, domain_id, skill_id, difficulty",
      conversions: "[section+raw_score], section",

      attempts: "id, test_id, status, started_at, _dirty",
      answers: "id, attempt_id, question_id, is_correct, error_category, _dirty, _answeredAt",
      notes: "id, attempt_id, question_id, updated_at, _dirty",

      runner: "attempt_id",
      meta: "key",
      reattempts: "++id, question_id, at",
    });
  }
}

export const db = new SatDatabase();

/* ------------------------------------------------------------------ meta */

export async function getMeta<T>(key: string, fallback: T): Promise<T> {
  const row = await db.meta.get(key);
  return row ? (row.value as T) : fallback;
}

export async function setMeta(key: string, value: unknown): Promise<void> {
  await db.meta.put({ key, value });
}

export const META_KEYS = {
  contentSyncedAt: "content.syncedAt",
  lastSyncAt: "sync.lastAt",
  visitCount: "app.visitCount",
  installPromptDismissed: "app.installPromptDismissed",
} as const;
