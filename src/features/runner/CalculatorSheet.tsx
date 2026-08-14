import { useMemo, useState } from "react";
import { Delete, ExternalLink } from "lucide-react";
import { formatResult, tryEvaluate, type AngleMode } from "@/lib/calc";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

/**
 * In-test calculator for Math parts.
 *
 * The real SAT provides a Desmos graphing calculator on every Math question,
 * so practising without one understates a student's Math score and trains the
 * wrong habits. This is a scientific calculator rather than a grapher: it
 * works fully offline, which a bundled Desmos could not. A link out to Desmos
 * is offered for graphing practice when there is a connection.
 *
 * Trigonometry defaults to DEGREES, which is what SAT questions use.
 */

interface Key {
  label: string;
  insert?: string;
  action?: "clear" | "back" | "equals";
  wide?: boolean;
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

export function CalculatorSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [expr, setExpr] = useState("");
  const [mode, setMode] = useState<AngleMode>("deg");
  const [history, setHistory] = useState<{ expr: string; value: string }[]>([]);

  const live = useMemo(() => tryEvaluate(expr, mode), [expr, mode]);

  const press = (k: Key) => {
    if (k.action === "clear") {
      setExpr("");
      return;
    }
    if (k.action === "back") {
      setExpr((e) => e.slice(0, -1));
      return;
    }
    if (k.action === "equals") {
      if (live.ok) {
        const value = formatResult(live.value);
        setHistory((h) => [{ expr, value }, ...h].slice(0, 8));
        setExpr(value); // chain from the result, like a real calculator
      }
      return;
    }
    if (k.insert) setExpr((e) => e + k.insert);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[92dvh] overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center justify-between gap-3">
            <span>Calculator</span>
            <button
              onClick={() => setMode((m) => (m === "deg" ? "rad" : "deg"))}
              className="rounded-md border border-border px-2 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground"
              aria-label={`Angle mode: ${mode === "deg" ? "degrees" : "radians"}. Tap to switch.`}
            >
              {mode}
            </button>
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-3 px-4 pb-6">
          {/* ------------------------------------------------- display */}
          <div className="rounded-xl border border-border bg-surface p-3">
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
              className={cn(
                "mt-1 min-h-6 text-right text-lg tnum",
                live.ok ? "font-semibold text-brand" : "text-danger",
              )}
              aria-live="polite"
            >
              {expr.trim() === ""
                ? ""
                : live.ok
                  ? `= ${formatResult(live.value)}`
                  : live.error}
            </p>
          </div>

          {/* ------------------------------------------------ functions */}
          <div className="grid grid-cols-5 gap-1.5">
            {FN_KEYS.map((k) => (
              <CalcKey key={k.label} k={k} onPress={press} />
            ))}
          </div>

          {/* ---------------------------------------------------- keypad */}
          <div className="grid grid-cols-4 gap-1.5">
            {PAD_KEYS.map((k) => (
              <CalcKey key={k.label} k={k} onPress={press} />
            ))}
          </div>

          {/* --------------------------------------------------- history */}
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

          <a
            href="https://www.desmos.com/calculator"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-muted-foreground"
          >
            Open Desmos for graphing
            <ExternalLink className="size-3.5" aria-hidden />
          </a>
          <p className="text-center text-xs text-muted-foreground">
            The real SAT has Desmos built in. Graphing instead of solving is often the
            faster route — worth practising deliberately.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function CalcKey({ k, onPress }: { k: Key; onPress: (k: Key) => void }) {
  return (
    <button
      onClick={() => onPress(k)}
      className={cn(
        "flex h-12 items-center justify-center rounded-lg border text-[15px] font-medium transition-colors active:scale-[0.97]",
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
