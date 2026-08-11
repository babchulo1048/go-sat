import { useMemo, useState } from "react";
import { Check, X } from "lucide-react";
import { db } from "@/lib/db";
import { checkAnswer } from "@/lib/scoring";
import { cn } from "@/lib/utils";
import type { EnrichedAnswer } from "@/lib/stats";
import { QuestionCard } from "@/features/runner/QuestionCard";
import { Button } from "@/components/ui/button";
import { formatPercent } from "@/lib/format";

/**
 * Spaced re-attempt of previously-missed questions, oldest miss first.
 *
 * This is the app's highest-value practice: it is drawn entirely from her own
 * demonstrated gaps, and answering correctly here is the evidence that a fix
 * actually stuck. Results are recorded locally (see `Reattempt` in db.ts).
 */
export function ReattemptSession({
  items,
  onClose,
}: {
  items: EnrichedAnswer[];
  onClose: () => void;
}) {
  // Oldest mistakes first — those are the ones most at risk of being forgotten.
  const queue = useMemo(
    () => [...items].sort((a, b) => a.answeredAt - b.answeredAt),
    [items],
  );

  const [index, setIndex] = useState(0);
  const [value, setValue] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);

  const item = queue[index];
  const done = index >= queue.length;

  const submit = async () => {
    if (!item || value === null || value === "") return;
    const correct = checkAnswer(item.question, value);
    setChecked(true);
    setResults((r) => [...r, correct]);
    await db.reattempts.add({
      question_id: item.question.id,
      correct,
      at: Date.now(),
    });
  };

  const next = () => {
    setChecked(false);
    setValue(null);
    setIndex((i) => i + 1);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  if (done) {
    const correct = results.filter(Boolean).length;
    return (
      <Overlay>
        <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Re-attempt done</h2>
            <p className="text-4xl font-semibold tnum text-brand">
              {formatPercent(results.length ? correct / results.length : 0)}
            </p>
            <p className="text-sm text-muted-foreground tnum">
              {correct} of {results.length} now correct
            </p>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Anything still wrong is a live gap, not a slip — those are the skills worth
            a proper lesson rather than more practice.
          </p>
          <Button size="lg" className="h-12 w-full max-w-xs" onClick={onClose}>
            Back to mistakes
          </Button>
        </div>
      </Overlay>
    );
  }

  if (!item) return null;

  const correct = checked ? checkAnswer(item.question, value) : false;

  return (
    <Overlay>
      <header className="pt-safe sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 w-full max-w-3xl items-center gap-2 px-3">
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid size-10 place-items-center rounded-lg text-muted-foreground hover:text-foreground"
          >
            <X className="size-5" aria-hidden />
          </button>
          <div className="flex-1 text-center">
            <p className="text-[13px] font-semibold">Re-attempt</p>
            <p className="text-xs text-muted-foreground tnum">
              {index + 1} of {queue.length}
            </p>
          </div>
          <span className="w-10" />
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 pt-5 pb-32">
        <QuestionCard
          question={item.question}
          index={index}
          selected={value}
          flagged={false}
          onSelect={(v) => !checked && setValue(v)}
          onToggleFlag={() => undefined}
        />

        {checked && (
          <div
            className={cn(
              "mt-5 rounded-xl border p-4",
              correct
                ? "border-success/40 bg-success-soft"
                : "border-danger/40 bg-danger-soft",
            )}
          >
            <p
              className={cn(
                "flex items-center gap-2 text-sm font-semibold",
                correct ? "text-success" : "text-danger",
              )}
            >
              {correct ? <Check className="size-4" aria-hidden /> : <X className="size-4" aria-hidden />}
              {correct ? "Correct this time" : `Still wrong — answer is ${item.question.correct_answer}`}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.question.explanation}
            </p>
          </div>
        )}
      </main>

      <div className="pb-safe fixed inset-x-0 bottom-0 border-t border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-3xl px-3 py-2.5">
          {checked ? (
            <Button className="h-11 w-full" onClick={next}>
              {index === queue.length - 1 ? "Finish" : "Next question"}
            </Button>
          ) : (
            <Button
              className="h-11 w-full"
              disabled={value === null || value === ""}
              onClick={() => void submit()}
            >
              Check answer
            </Button>
          )}
        </div>
      </div>
    </Overlay>
  );
}

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-background">{children}</div>
  );
}
