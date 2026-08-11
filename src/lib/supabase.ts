import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * There is no auth in this app by design (single-user personal study tool), so
 * the client is created without session persistence. `device_id` separates
 * devices; it is not a security boundary. Never store anything sensitive here.
 */

const url = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;

// Lovable writes VITE_SUPABASE_PUBLISHABLE_KEY; the Supabase docs call it the
// anon key. Accept either so the same code runs whichever way it was set up.
const key = (import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ??
  import.meta.env["VITE_SUPABASE_ANON_KEY"]) as string | undefined;

export const isSupabaseConfigured = Boolean(url && key);

/**
 * Null when env vars are absent. The app must still work in that case —
 * everything reads from IndexedDB, so a missing backend degrades to
 * "no sync", not "no app".
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, key as string, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;

if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.warn(
    "[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY missing — " +
      "running offline-only against the local cache.",
  );
}
