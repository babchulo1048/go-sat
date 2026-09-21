import { useEffect, useMemo, useState } from "react";
import { Delete, Loader2, WifiOff, X } from "lucide-react";
import { formatResult, tryEvaluate, type AngleMode } from "@/lib/calc";
import { cn } from "@/lib/utils";
import { useOnline } from "@/hooks/useOnline";

/**
 * In-test calculator for Math parts — a PANEL, not a modal.
 *
 * The real SAT gives every Math question a built-in Desmos graphing
 * calculator, opened from the top bar and used side by side with the question.
 * This mirrors that:
 *
 *  - Desmos tab: the real Desmos calculator via its official iframe embed
 *    (`?embed`, the same form Desmos's own Share → Embed produces). Needs
 *    internet. This is the tool she will have on test day, so it is the default.
 *  - Scientific tab: our own offline calculator, for when there is no signal.
 *
 * It is non-modal on purpose: no overlay, no focus trap, so she can read and
 * answer the question while the calculator stays open. It stays MOUNTED when
 * closed, so graphs and expressions survive moving between questions, as in
 * Bluebook.
 */

const DESMOS_EMBED = "https://www.desmos.com/calculator?embed";

type Tab = "desmos" | "scientific";

export function CalculatorPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const online = useOnline();
  const [tab, setTab] = useState<Tab>(() =>
    typeof navigator !== "undefined" && navigator.onLine ? "desmos" : "scientific",
  );
  /* Mount the iframe only once Desmos is first shown, then keep it alive. */
  const [desmosMounted, setDesmosMounted] = useState(false);
  const [desmosLoaded, setDesmosLoaded] = useState(false);
  const [desmosSlow, setDesmosSlow] = useState(false);

  useEffect(() => {
    if (open && tab === "desmos" && online) setDesmosMounted(true);
  }, [open, tab, online]);

  useEffect(() => {
    if (!desmosMounted || desmosLoaded) return;
    const t = setTimeout(() => setDesmosSlow(true), 10_000);
    return () => clearTimeout(t);
  }, [desmosMounted, desmosLoaded]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <aside
      aria-label="Calculator"
      aria-hidden={!open}
      className={cn(
        "fixed z-20 flex flex-col border-border bg-background shadow-[0_-1px_3px_rgb(0_0_0/0.08)]",
        // Phone: bottom panel above the answer bar. Tablet+: right panel beside the question.
        "inset-x-0 bottom-[calc(66px_+_env(safe-area-inset-bottom))] h-[62dvh] rounded-t-xl border-t",
        "md:inset-x-auto md:right-0 md:top-[calc(58px_+_env(safe-area-inset-top))] md:h-auto md:w-[min(480px,48vw)] md:rounded-none md:border-l md:border-t-0 md:shadow-none",
        !open && "hidden",
      )}
    >
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <div role="tablist" aria-label="Calculator type" className="flex flex-1 gap-1 rounded-lg bg-surface-2 p-1">
          {(
            [
              ["desmos", "Desmos (graphing)"],
              ["scientific", "Scientific"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              role="tab"
              aria-selected={tab === value}
              onClick={() => setTab(value)}
              className={cn(
                "min-h-[36px] flex-1 rounded-md text-[13px] font-medium transition-colors",
                tab === value ? "bg-background shadow-[0_1px_2px_rgb(0_0_0/0.06)]" : "text-muted-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          aria-label="Close calculator"
          className="grid size-9 shrink-0 place-items-center rounded-lg text-muted-foreground hover:text-foreground"
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>

      <div className="relative min-h-0 flex-1">
        {/* ---------------------------------------------------------- Desmos */}
        <div className={cn("absolute inset-0 flex flex-col", tab !== "desmos" && "hidden")}>
          {!online && !desmosLoaded ? (
            <div className="m-auto max-w-xs space-y-2 p-6 text-center">
              <WifiOff className="mx-auto size-6 text-muted-foreground" aria-hidden />
              <p className="text-sm font-semibold">Desmos needs internet</p>
              <p className="text-xs text-muted-foreground">
                Use the Scientific tab for now — it works offline.
              </p>
              <button onClick={() => setTab("scientific")} className="text-sm font-medium text-brand">
                Switch to Scientific
              </button>
            </div>
          ) : (
            <>
              {desmosMounted && (
                <iframe
                  src={DESMOS_EMBED}
                  title="Desmos graphing calculator"
                  onLoad={() => setDesmosLoaded(true)}
                  className="h-full w-full flex-1 border-0"
                  allow="clipboard-write"
                />
              )}
              {!desmosLoaded && (
                <div className="pointer-events-none absolute inset-0 grid place-items-center">
                  <div className="space-y-2 text-center">
                    <Loader2 className="mx-auto size-6 animate-spin text-brand" aria-hidden />
                    <p className="text-xs text-muted-foreground">Loading Desmos…</p>
                    {desmosSlow && (
                      <p className="pointer-events-auto max-w-[240px] text-xs text-muted-foreground">
                        Taking a while. The school network may block Desmos —{" "}
                        <button onClick={() => setTab("scientific")} className="font-medium text-brand">
                          use Scientific
                        </button>
                        .
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* ------------------------------------------------------ Scientific */}
        <div className={cn("absolute inset-0 overflow-y-auto", tab !== "scientific" && "hidden")}>
          <ScientificCalculator />
        </div>
      </div>
    </aside>
  );
}

/* ============================================================ scientific */

interface Key {
  label: string;
  insert?: string;
  action?: "clear" | "back" | "equals";
  tone?: "fn" | "op" | "eq";
}

const FN_KEYS: Key[] = [
  { label: "sin", insert: "sin(", tone: "fn" },
  { label: "cos", insert: "cos(", tone: "fn" },
  { label: "tan", insert: "tan(", tone: "fn" },
  { label: "√", insert: "sqrt(", tone: "fn" },
  { label: "x²", insert: "^2", tone: "fn" },
  { label: "xʸ", insert: "^", tone: "fn" },
  { label: "log", insert: "log(", tone: "fn" },
  { label: "ln", insert: "ln(", tone: "fn" },
  { label: "π", insert: "pi", tone: "fn" },
  { label: "%", insert: "%", tone: "fn" },
];

const PAD_KEYS: Key[] = [
  { label: "C", action: "clear", tone: "op" },
  { label: "(", insert: "(", tone: "op" },
  { label: ")", insert: ")", tone: "op" },
  { label: "÷", insert: "/", tone: "op" },
  { label: "7", insert: "7" },
  { label: "8", insert: "8" },
  { label: "9", insert: "9" },
  { label: "×", insert: "*", tone: "op" },
  { label: "4", insert: "4" },
  { label: "5", insert: "5" },
  { label: "6", insert: "6" },
  { label: "−", insert: "-", tone: "op" },
  { label: "1", insert: "1" },
  { label: "2", insert: "2" },
  { label: "3", insert: "3" },
  { label: "+", insert: "+", tone: "op" },
  { label: "0", insert: "0" },
  { label: ".", insert: "." },
  { label: "⌫", action: "back", tone: "op" },
  { label: "=", action: "equals", tone: "eq" },
];

function ScientificCalculator() {
  const [expr, setExpr] = useState("");
  const [mode, setMode] = useState<AngleMode>("deg");
  const [history, setHistory] = useState<{ expr: string; value: string }[]>([]);
  const live = useMemo(() => tryEvaluate(expr, mode), [expr, mode]);

  const press = (k: Key) => {
    if (k.action === "clear") return setExpr("");
    if (k.action === "back") return setExpr((e) => e.slice(0, -1));
    if (k.action === "equals") {
      if (live.ok) {
        const value = formatResult(live.value);
        setHistory((h) => [{ expr, value }, ...h].slice(0, 8));
        setExpr(value);
      }
      return;
    }
    if (k.insert) setExpr((e) => e + k.insert);
  };

  return (
    <div className="space-y-3 p-3">
      <div className="rounded-xl border border-border bg-surface p-3">
        <div className="mb-1 flex justify-end">
          <button
            onClick={() => setMode((m) => (m === "deg" ? "rad" : "deg"))}
            className="rounded-md border border-border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground"
            aria-label={`Angle mode: ${mode === "deg" ? "degrees" : "radians"}. Tap to switch.`}
          >
            {mode}
          </button>
        </div>
        <input
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          placeholder="Type or tap below"
          inputMode="text"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Expression"
          className="w-full bg-transparent text-right text-2xl tnum outline-none placeholder:text-base placeholder:text-muted-foreground"
        />
        <p
          className={cn("mt-1 min-h-6 text-right text-lg tnum", live.ok ? "font-semibold text-brand" : "text-danger")}
          aria-live="polite"
        >
          {expr.trim() === "" ? "" : live.ok ? `= ${formatResult(live.value)}` : live.error}
        </p>
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {FN_KEYS.map((k) => (
          <CalcKey key={k.label} k={k} onPress={press} />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {PAD_KEYS.map((k) => (
          <CalcKey key={k.label} k={k} onPress={press} />
        ))}
      </div>

      {history.length > 0 && (
        <ul className="space-y-1 border-t border-border pt-2">
          {history.map((h, i) => (
            <li key={i}>
              <button
                onClick={() => setExpr(h.expr)}
                className="flex w-full items-baseline justify-between gap-3 rounded-md px-1 py-1 text-left text-xs text-muted-foreground hover:bg-surface-2"
              >
                <span className="truncate">{h.expr}</span>
                <span className="shrink-0 font-medium text-foreground tnum">{h.value}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CalcKey({ k, onPress }: { k: Key; onPress: (k: Key) => void }) {
  return (
    <button
      onClick={() => onPress(k)}
      className={cn(
        "flex h-11 items-center justify-center rounded-lg border text-[15px] font-medium transition-colors active:scale-[0.97]",
        k.tone === "eq"
          ? "border-brand bg-brand text-[color:var(--brand-fg)]"
          : k.tone === "op"
            ? "border-border bg-surface-2 text-foreground"
            : k.tone === "fn"
              ? "border-border bg-surface text-[13px] text-muted-foreground"
              : "border-border bg-surface text-foreground",
      )}
    >
      {k.label === "⌫" ? <Delete className="size-4" aria-hidden /> : k.label}
    </button>
  );
}
