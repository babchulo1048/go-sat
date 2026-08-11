import { useEffect, useState } from "react";
import { onSyncChange, pendingCount } from "@/lib/sync";

export function useOnline(): boolean {
  const [online, setOnline] = useState(() =>
    typeof navigator === "undefined" ? true : navigator.onLine,
  );

  useEffect(() => {
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
    };
  }, []);

  return online;
}

export function useSyncStatus() {
  const [status, setStatus] = useState<"idle" | "syncing" | "error">("idle");
  const [pending, setPending] = useState(0);

  useEffect(() => {
    void pendingCount().then(setPending);
    const unsubscribe = onSyncChange((s, p) => {
      setStatus(s);
      setPending(p);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return { status, pending };
}
