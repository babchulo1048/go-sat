import { useEffect, useState } from "react";
import { Coffee } from "lucide-react";
import { formatClock } from "@/lib/format";
import { Button } from "@/components/ui/button";

const BREAK_SECONDS = 10 * 60;

/**
 * The official 10-minute break between Reading and Writing and Math.
 *
 * The next part's clock does not start until she taps continue, so the break
 * can never eat into her test time — and skipping early is always allowed.
 */
export function BreakScreen({
  nextPartTitle,
  onContinue,
}: {
  nextPartTitle: string;
  onContinue: () => void | Promise<void>;
}) {
  const [remaining, setRemaining] = useState(BREAK_SECONDS);

  useEffect(() => {
    const id = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (remaining === 0) void onContinue();
  }, [remaining, onContinue]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-7 px-6 text-center">
      <Coffee className="size-9 text-brand" aria-hidden />

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Break</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Stand up, drink some water, look at something far away. Next up:{" "}
          {nextPartTitle}.
        </p>
      </div>

      <p className="text-5xl font-semibold tnum" aria-live="off">
        {formatClock(remaining)}
      </p>

      <div className="w-full max-w-xs space-y-3">
        <Button size="lg" className="h-12 w-full text-base" onClick={() => void onContinue()}>
          Continue now
        </Button>
        <p className="text-xs text-muted-foreground">
          The Math clock starts when you continue — this break costs you nothing.
        </p>
      </div>
    </div>
  );
}
