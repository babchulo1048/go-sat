import { db, type Dirty, type LocalAnswer } from "@/lib/db";

/**
 * One-time local repair for duplicate answer rows.
 *
 * Before the transaction fix in repo.saveAnswer, two concurrent writes for the
 * same question could each mint a fresh id, leaving two local rows for one
 * (attempt_id, question_id). The server enforces that pair as unique, so a
 * single duplicate made every subsequent batch upsert fail with 23505 — and
 * because notes sync after answers, notes stopped syncing too.
 *
 * This merges any such pairs so the backlog can finally upload. It is safe to
 * run on every launch: with no duplicates it does nothing.
 */
export async function dedupeAnswers(): Promise<number> {
  return db.transaction("rw", db.answers, async () => {
    const all = await db.answers.toArray();

    const groups = new Map<string, LocalAnswer[]>();
    for (const a of all) {
      const key = `${a.attempt_id}::${a.question_id}`;
      const list = groups.get(key);
      if (list) list.push(a);
      else groups.set(key, [a]);
    }

    let removed = 0;

    for (const rows of groups.values()) {
      if (rows.length < 2) continue;

      /*
       * Keep the most complete row and fold the others into it. Time is summed
       * because each duplicate holds a real slice of the time she spent; the
       * answer itself comes from the most recently written row, which is the
       * one she actually left on screen.
       */
      const byRecency = [...rows].sort(
        (a, b) => (b._answeredAt ?? 0) - (a._answeredAt ?? 0),
      );
      const newest = byRecency[0]!;

      const merged: LocalAnswer = {
        ...newest,
        seconds_spent: rows.reduce((n, r) => n + (r.seconds_spent ?? 0), 0),
        was_flagged: rows.some((r) => r.was_flagged),
        error_category:
          rows.find((r) => r.error_category !== null)?.error_category ?? null,
        _dirty: 1 as Dirty,
      };

      await db.answers.bulkDelete(rows.map((r) => r.id));
      await db.answers.put(merged);
      removed += rows.length - 1;
    }

    if (removed > 0) {
      console.warn(`[repair] merged ${removed} duplicate answer row(s)`);
    }
    return removed;
  });
}
