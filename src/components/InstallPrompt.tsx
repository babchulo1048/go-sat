import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { getMeta, META_KEYS, setMeta } from "@/lib/db";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * Offers "add to home screen" from the second visit onward, and never again
 * once dismissed. She practises on a phone, so the standalone install is the
 * difference between a bookmark and an app.
 */
export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let mounted = true;

    void (async () => {
      const dismissed = await getMeta(META_KEYS.installPromptDismissed, false);
      const visits = await getMeta<number>(META_KEYS.visitCount, 0);
      await setMeta(META_KEYS.visitCount, visits + 1);
      if (!mounted || dismissed || visits + 1 < 2) return;

      const handler = (e: Event) => {
        e.preventDefault();
        setDeferred(e as BeforeInstallPromptEvent);
        setShow(true);
      };
      window.addEventListener("beforeinstallprompt", handler);
      return () => window.removeEventListener("beforeinstallprompt", handler);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const dismiss = async () => {
    setShow(false);
    await setMeta(META_KEYS.installPromptDismissed, true);
  };

  if (!show || !deferred) return null;

  return (
    <div className="pb-safe fixed inset-x-0 bottom-[68px] z-40 px-4">
      <div className="mx-auto flex w-full max-w-3xl items-center gap-3 rounded-xl border border-border bg-surface p-3 shadow-[0_1px_3px_rgb(0_0_0/0.08)]">
        <Download className="size-5 shrink-0 text-brand" aria-hidden />
        <p className="flex-1 text-sm">
          Add to your home screen for offline practice.
        </p>
        <Button
          size="sm"
          onClick={async () => {
            await deferred.prompt();
            await deferred.userChoice;
            void dismiss();
          }}
        >
          Add
        </Button>
        <button
          onClick={() => void dismiss()}
          aria-label="Dismiss"
          className="grid size-9 shrink-0 place-items-center rounded-lg text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
