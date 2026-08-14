import { useEffect, useState } from "react";
import { AlertTriangle, Check, CloudOff, RefreshCw } from "lucide-react";
import { useOnline, useSyncStatus } from "@/hooks/useOnline";
import { syncNow } from "@/lib/sync";

/**
 * Deliberately quiet. Offline is a normal state for this app, not an error, so
 * it states the reassuring fact ("your work is saved") rather than warning.
 * The "Synced" confirmation shows briefly and then gets out of the way.
 */
export function SyncIndicator({ className = "" }: { className?: string }) {
  const online = useOnline();
  const { status, pending } = useSyncStatus();
  const [justSynced, setJustSynced] = useState(false);

  useEffect(() => {
    if (status === "idle" && pending === 0 && online) {
      setJustSynced(true);
      const t = setTimeout(() => setJustSynced(false), 2200);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [status, pending, online]);

  if (!online) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-xs text-muted-foreground ${className}`}
      >
        <CloudOff className="size-3.5" aria-hidden />
        Offline — your work is saved
      </span>
    );
  }

  /*
   * A stuck sync must not look like a working one. Previously any pending
   * count rendered as "Saving 49…" with a spinner forever, so a permanently
   * failing upload was indistinguishable from a slow one — which is how a
   * whole mock's answers and notes went missing without anyone noticing.
   */
  if (status === "error") {
    return (
      <button
        onClick={() => void syncNow()}
        className={`inline-flex items-center gap-1.5 text-xs font-medium text-warning ${className}`}
      >
        <AlertTriangle className="size-3.5" aria-hidden />
        {pending > 0 ? `${pending} not saved` : "Not saved"} — retry
      </button>
    );
  }

  if (status === "syncing" || pending > 0) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-xs text-muted-foreground ${className}`}
      >
        <RefreshCw className="size-3.5 animate-spin" aria-hidden />
        Saving{pending > 0 ? ` ${pending}` : ""}…
      </span>
    );
  }

  if (justSynced) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-xs text-muted-foreground ${className}`}
      >
        <Check className="size-3.5 text-success" aria-hidden />
        Synced
      </span>
    );
  }

  return null;
}
