import { useEffect, useState, type ReactNode } from "react";
import { CloudOff, Loader2 } from "lucide-react";
import {
  hasContent,
  refreshContentQuietly,
  syncContent,
  type ContentProgress,
} from "@/lib/content";
import { isSupabaseConfigured } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

type State = "checking" | "downloading" | "ready" | "empty-offline" | "error";

/**
 * Guards the app until question content exists locally.
 *
 * After the first successful download this resolves instantly and forever,
 * including with no network — which is what makes the app usable offline.
 * A background refresh then runs so newly-seeded tests appear without a
 * redeploy, but nothing waits on it.
 */
export function ContentGate({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>("checking");
  const [progress, setProgress] = useState<ContentProgress | null>(null);
  const [error, setError] = useState<string | null>(null);

  const download = async () => {
    setState("downloading");
    setError(null);
    try {
      await syncContent(setProgress);
      setState("ready");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setState("error");
    }
  };

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const cached = await hasContent();
      if (cancelled) return;

      if (cached) {
        setState("ready");
        void refreshContentQuietly(); // never blocks
        return;
      }
      if (!isSupabaseConfigured || !navigator.onLine) {
        setState("empty-offline");
        return;
      }
      await download();
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (state === "ready") return <>{children}</>;

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      {state === "checking" || state === "downloading" ? (
        <>
          <Loader2 className="size-8 animate-spin text-brand" aria-hidden />
          <div className="space-y-2">
            <h1 className="text-xl font-semibold">Preparing your question bank</h1>
            <p className="text-sm text-muted-foreground">
              This happens once. Afterwards the app works completely offline.
            </p>
          </div>
          {progress && (
            <div className="w-full max-w-xs space-y-2">
              <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full bg-brand transition-all duration-300"
                  style={{ width: `${(progress.loaded / progress.total) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground tnum">
                {progress.label} · {progress.loaded} of {progress.total}
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          <CloudOff className="size-8 text-muted-foreground" aria-hidden />
          <div className="space-y-2">
            <h1 className="text-xl font-semibold">
              {state === "empty-offline" ? "Connection needed once" : "Download failed"}
            </h1>
            <p className="max-w-sm text-sm text-muted-foreground">
              {state === "empty-offline"
                ? "The question bank hasn't been downloaded yet. Connect to the internet once to set it up — after that you can practise anywhere."
                : (error ?? "Something went wrong fetching the questions.")}
            </p>
          </div>
          <Button onClick={() => void download()}>Try again</Button>
        </>
      )}
    </div>
  );
}
