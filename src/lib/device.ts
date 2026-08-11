const DEVICE_KEY = "sat.device_id";

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Fallback for older WebViews.
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * A stable per-device identifier, created on first run. Used to scope her
 * attempts and notes. NOT a security boundary — see supabase.ts.
 */
export function getDeviceId(): string {
  if (typeof localStorage === "undefined") return "server";
  let id = localStorage.getItem(DEVICE_KEY);
  if (!id) {
    id = makeId();
    localStorage.setItem(DEVICE_KEY, id);
  }
  return id;
}

export const newId = makeId;
