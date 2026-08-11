import { db, META_KEYS, setMeta, type Dirty } from "@/lib/db";
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
 */

type SyncStatus = "idle" | "syncing" | "error";

let running = false;
let retryTimer: ReturnType<typeof setTimeout> | null = null;
let attempt = 0;

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

export async function syncNow(): Promise<boolean> {
  if (!supabase || !navigator.onLine || running) return false;

  running = true;
  await emit("syncing");

  try {
    const [attempts, answers, notes] = await Promise.all([
      db.attempts.where("_dirty").equals(1).toArray(),
      db.answers.where("_dirty").equals(1).toArray(),
      db.notes.where("_dirty").equals(1).toArray(),
    ]);

    // Order matters: answers reference attempts, so attempts must land first.
    if (attempts.length) {
      const { error } = await supabase
        .from("attempts")
        .upsert(attempts.map(clean), { onConflict: "id" });
      if (error) throw error;
      await db.attempts.bulkPut(attempts.map((r) => ({ ...r, _dirty: 0 as Dirty })));
    }

    if (answers.length) {
      const { error } = await supabase
        .from("answers")
        .upsert(answers.map(clean), { onConflict: "id" });
      if (error) throw error;
      await db.answers.bulkPut(answers.map((r) => ({ ...r, _dirty: 0 as Dirty })));
    }

    if (notes.length) {
      const deleted = notes.filter((n) => n._deleted === 1);
      const live = notes.filter((n) => n._deleted !== 1);

      if (live.length) {
        const { error } = await supabase
          .from("notes")
          .upsert(live.map(clean), { onConflict: "id" });
        if (error) throw error;
        await db.notes.bulkPut(live.map((r) => ({ ...r, _dirty: 0 as Dirty })));
      }
      if (deleted.length) {
        const { error } = await supabase
          .from("notes")
          .delete()
          .in(
            "id",
            deleted.map((n) => n.id),
          );
        if (error) throw error;
        await db.notes.bulkDelete(deleted.map((n) => n.id));
      }
    }

    await setMeta(META_KEYS.lastSyncAt, Date.now());
    attempt = 0;
    running = false;
    await emit("idle");
    return true;
  } catch (err) {
    console.warn("[sync] failed, will retry", err);
    running = false;
    await emit("error");
    scheduleRetry();
    return false;
  }
}

function scheduleRetry() {
  if (retryTimer) clearTimeout(retryTimer);
  attempt = Math.min(attempt + 1, 6);
  const delay = Math.min(1000 * 2 ** attempt, 60_000); // 2s → 60s ceiling
  retryTimer = setTimeout(() => void syncNow(), delay);
}

/** Fire-and-forget nudge after a local write. Safe to call constantly. */
export function requestSync() {
  if (!navigator.onLine || running) return;
  if (retryTimer) clearTimeout(retryTimer);
  retryTimer = setTimeout(() => void syncNow(), 800); // debounce bursts
}

export function startSyncEngine() {
  window.addEventListener("online", () => void syncNow());
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") void syncNow();
  });
  void syncNow();
}
