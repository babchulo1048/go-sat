import { db, getMeta, META_KEYS, setMeta } from "@/lib/db";
import { supabase } from "@/lib/supabase";
import type {
  Domain,
  Question,
  ScoreConversion,
  Skill,
  Test,
  TestPart,
} from "@/types/db";

/**
 * Read-through cache for all question content.
 *
 * First run downloads everything into IndexedDB. After that the app NEVER
 * reads content over the network on the critical path — every screen reads
 * locally, so the whole app works in airplane mode.
 *
 * On each online launch we refresh in the background, which is what makes
 * "insert a row in Supabase and a new test appears" work with no redeploy.
 */

export interface ContentProgress {
  label: string;
  loaded: number;
  total: number;
}

/** Supabase caps a single response; page through so large tables come down whole. */
const PAGE = 1000;

async function fetchAll<T>(table: string): Promise<T[]> {
  if (!supabase) throw new Error("Supabase not configured");
  const out: T[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .range(from, from + PAGE - 1);
    if (error) throw error;
    const rows = (data ?? []) as T[];
    out.push(...rows);
    if (rows.length < PAGE) break;
  }
  return out;
}

const STEPS = [
  { table: "domains", label: "Domains" },
  { table: "skills", label: "Skills" },
  { table: "tests", label: "Tests" },
  { table: "test_parts", label: "Test parts" },
  { table: "questions", label: "Questions" },
  { table: "score_conversions", label: "Score tables" },
] as const;

/**
 * Pull all content into IndexedDB. Content tables are REPLACED wholesale, so
 * questions edited or removed upstream don't linger locally.
 */
export async function syncContent(
  onProgress?: (p: ContentProgress) => void,
): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured");

  const total = STEPS.length;
  const report = (i: number, label: string) =>
    onProgress?.({ label, loaded: i, total });

  report(0, STEPS[0].label);

  const domains = await fetchAll<Domain>("domains");
  report(1, STEPS[1].label);
  const skills = await fetchAll<Skill>("skills");
  report(2, STEPS[2].label);
  const tests = await fetchAll<Test>("tests");
  report(3, STEPS[3].label);
  const parts = await fetchAll<TestPart>("test_parts");
  report(4, STEPS[4].label);
  const questions = await fetchAll<Question>("questions");
  report(5, STEPS[5].label);
  const conversions = await fetchAll<ScoreConversion>("score_conversions");

  /*
   * Never let a thin or empty server response destroy a working local cache.
   *
   * The refresh replaces content wholesale, so if the server returns nothing —
   * because the schema was recreated empty, a seed has not been run yet, or a
   * request half-failed — the naive path clears IndexedDB and writes nothing,
   * leaving her locked out of an app that was working offline a moment before.
   *
   * This actually happened: the hosted database was wiped in September 2026,
   * and the only surviving copy of her work was the one on her phone.
   */
  const cachedQuestions = await db.questions.count();
  if (questions.length === 0 && cachedQuestions > 0) {
    throw new Error(
      "Server returned no questions; keeping the existing offline copy.",
    );
  }
  if (cachedQuestions > 0 && questions.length < cachedQuestions / 2) {
    throw new Error(
      `Server returned only ${questions.length} questions but ${cachedQuestions} are cached; ` +
        "refusing to replace the offline copy.",
    );
  }

  await db.transaction(
    "rw",
    [db.domains, db.skills, db.tests, db.parts, db.questions, db.conversions],
    async () => {
      await Promise.all([
        db.domains.clear(),
        db.skills.clear(),
        db.tests.clear(),
        db.parts.clear(),
        db.questions.clear(),
        db.conversions.clear(),
      ]);
      await Promise.all([
        db.domains.bulkPut(domains),
        db.skills.bulkPut(skills),
        db.tests.bulkPut(tests),
        db.parts.bulkPut(parts),
        db.questions.bulkPut(questions),
        db.conversions.bulkPut(conversions),
      ]);
    },
  );

  await setMeta(META_KEYS.contentSyncedAt, Date.now());
  report(total, "Done");
}

export async function hasContent(): Promise<boolean> {
  return (await db.questions.count()) > 0;
}

export async function contentSyncedAt(): Promise<number | null> {
  return getMeta<number | null>(META_KEYS.contentSyncedAt, null);
}

/**
 * Refresh content in the background. Never throws — a failed refresh must not
 * disturb a working offline app.
 */
export async function refreshContentQuietly(): Promise<void> {
  if (!supabase || !navigator.onLine) return;
  try {
    await syncContent();
  } catch (err) {
    console.warn("[content] background refresh failed", err);
  }
}
