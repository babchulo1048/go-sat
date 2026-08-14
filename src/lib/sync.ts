import { db, META_KEYS, setMeta, type Dirty, type LocalAnswer } from "@/lib/db";
import { supabase } from "@/lib/supabase";

/**
 * Pushes locally-changed attempts, answers and notes to Supabase.
 *
 * Design rules:
 *  - Local IndexedDB is the source of truth. This is a backup, never a gate.
 *  - Sync is idempotent: it upserts whatever is currently marked `_dirty`,
 *    so retrying can't double-apply, and a row edited five times offline
 *    still costs one write.
 *  - Failure is non-destructive: rows stay dirty and are retried later. We
 *    never clear a flag we didn't get a success for.
 *  - Each table syncs INDEPENDENTLY. A failure in one must never stop the
 *    others — that bug once cost a full set of notes, because answers threw
 *    first and notes were never attempted.
 */

type SyncStatus = "idle" | "syncing" | "error";

let running = false;
let runStartedAt = 0;
/** Set when a write lands mid-sync, so the new data isn't left behind. */
let dirtyAgain = false;
let retryTimer: ReturnType<typeof setTimeout> | null = null;
let attempt = 0;

/** A hung request must not deadlock sync forever. */
const STALE_RUN_MS = 60_000;
/** Batch size — keeps any single request small on a poor connection. */
const CHUNK = 200;

const listeners = new Set<(s: SyncStatus, pending: number) => void>();

export function onSyncChange(fn: (s: SyncStatus, pending: number) => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

async function emit(status: SyncStatus) {
  const pending = await pendingCount();
  listeners.forEach((fn) => fn(status, pending));
}

export async function pendingCount(): Promise<number> {
  const [a, b, c] = await Promise.all([
    db.attempts.where("_dirty").equals(1).count(),
    db.answers.where("_dirty").equals(1).count(),
    db.notes.where("_dirty").equals(1).count(),
  ]);
  return a + b + c;
}

/** Strip local-only bookkeeping fields before sending a row upstream. */
function clean<T extends object>(row: T): Record<string, unknown> {
  const { _dirty, _deleted, _answeredAt, ...rest } = row as T & {
    _dirty?: Dirty;
    _deleted?: Dirty;
    _answeredAt?: number;
  };
  return rest as Record<string, unknown>;
}

function chunk<T>(rows: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < rows.length; i += size) out.push(rows.slice(i, i + size));
  return out;
}

/**
 * Guarantee at most one row per (attempt_id, question_id) in the payload.
 *
 * Postgres rejects a batch that tries to upsert the same conflict target
 * twice ("cannot affect row a second time"), so this is required even though
 * repair.dedupeAnswers already cleans the local store.
 */
function dedupeAnswerPayload(rows: LocalAnswer[]): LocalAnswer[] {
  const seen = new Map<string, LocalAnswer>();
  for (const r of rows) {
    const key = `${r.attempt_id}::${r.question_id}`;
    const prev = seen.get(key);
    if (!prev || (r._answeredAt ?? 0) > (prev._answeredAt ?? 0)) seen.set(key, r);
  }
  return [...seen.values()];
}

export async function syncNow(): Promise<boolean> {
  if (!supabase || !navigator.onLine) return false;

  if (running) {
    // Unless the previous run is clearly wedged, just remember there's more.
    if (Date.now() - runStartedAt < STALE_RUN_MS) {
      dirtyAgain = true;
      return false;
    }
    console.warn("[sync] previous run looks stuck; starting a new one");
  }

  running = true;
  runStartedAt = Date.now();
  dirtyAgain = false;
  await emit("syncing");

  let failed = false;

  // ---------------------------------------------------------------- attempts
  // First, because answers reference attempts by foreign key.
  try {
    const rows = await db.attempts.where("_dirty").equals(1).toArray();
    for (const batch of chunk(rows, CHUNK)) {
      const { error } = await supabase
        .from("attempts")
        .upsert(batch.map(clean), { onConflict: "id" });
      if (error) throw error;
      await db.attempts.bulkPut(batch.map((r) => ({ ...r, _dirty: 0 as Dirty })));
    }
  } catch (err) {
    console.warn("[sync] attempts failed", err);
    failed = true;
  }

  // ----------------------------------------------------------------- answers
  try {
    const rows = dedupeAnswerPayload(await db.answers.where("_dirty").equals(1).toArray());
    for (const batch of chunk(rows, CHUNK)) {
      /*
       * Conflict on the NATURAL key, not the primary key. If a row for this
       * question already exists server-side under a different id, we want to
       * update it rather than 409. Nothing references answers.id, so letting
       * the id be rewritten is safe.
       */
      const { error } = await supabase
        .from("answers")
        .upsert(batch.map(clean), { onConflict: "attempt_id,question_id" });
      if (error) throw error;
      await db.answers.bulkPut(batch.map((r) => ({ ...r, _dirty: 0 as Dirty })));
    }
  } catch (err) {
    console.warn("[sync] answers failed", err);
    failed = true;
  }

  // ------------------------------------------------------------------- notes
  // Independent of answers on purpose — see the header note.
  try {
    const rows = await db.notes.where("_dirty").equals(1).toArray();
    const live = rows.filter((n) => n._deleted !== 1);
    const deleted = rows.filter((n) => n._deleted === 1);

    for (const batch of chunk(live, CHUNK)) {
      const { error } = await supabase
        .from("notes")
        .upsert(batch.map(clean), { onConflict: "id" });
      if (error) throw error;
      await db.notes.bulkPut(batch.map((r) => ({ ...r, _dirty: 0 as Dirty })));
    }

    if (deleted.length) {
      const { error } = await supabase
        .from("notes")
        .delete()
        .in("id", deleted.map((n) => n.id));
      if (error) throw error;
      await db.notes.bulkDelete(deleted.map((n) => n.id));
    }
  } catch (err) {
    console.warn("[sync] notes failed", err);
    failed = true;
  }

  running = false;

  if (failed) {
    await emit("error");
    scheduleRetry();
    return false;
  }

  await setMeta(META_KEYS.lastSyncAt, Date.now());
  attempt = 0;
  await emit("idle");

  // Writes that landed while we were uploading still need a trip.
  if (dirtyAgain) {
    dirtyAgain = false;
    if ((await pendingCount()) > 0) requestSync();
  }
  return true;
}

function scheduleRetry() {
  if (retryTimer) clearTimeout(retryTimer);
  attempt = Math.min(attempt + 1, 6);
  const delay = Math.min(1000 * 2 ** attempt, 60_000); // 2s → 60s ceiling
  retryTimer = setTimeout(() => void syncNow(), delay);
}

/** Fire-and-forget nudge after a local write. Safe to call constantly. */
export function requestSync() {
  if (!navigator.onLine) return;
  if (running) {
    dirtyAgain = true;
    return;
  }
  if (retryTimer) clearTimeout(retryTimer);
  retryTimer = setTimeout(() => void syncNow(), 800); // debounce bursts
}

export function startSyncEngine() {
  window.addEventListener("online", () => void syncNow());
  document.addEventListener("visibilitychange", () => {
    // Sync on the way out as well as the way in: a phone backgrounding an app
    // mid-test is the most common moment for pending work to be stranded.
    void syncNow();
  });
  window.addEventListener("pagehide", () => void syncNow());
  void syncNow();
}
