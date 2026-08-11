import { Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import type { Question } from "@/types/db";

/**
 * The screen she spends ~80% of her time on. Deliberately sparse: passage,
 * prompt, choices. Nothing decorative competes with the text.
 */
export function QuestionCard({
  question,
  index,
  selected,
  flagged,
  onSelect,
  onToggleFlag,
}: {
  question: Question;
  index: number;
  selected: string | null;
  flagged: boolean;
  onSelect: (value: string) => void;
  onToggleFlag: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <span className="mt-0.5 inline-flex h-7 items-center rounded-md bg-surface-2 px-2 text-[13px] font-semibold tnum">
          {index + 1}
        </span>
        <button
          onClick={onToggleFlag}
          aria-pressed={flagged}
          className={cn(
            "inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border px-2.5 text-[13px] font-medium transition-colors",
            flagged
              ? "border-warning bg-warning-soft text-warning"
              : "border-border text-muted-foreground hover:text-foreground",
          )}
        >
          <Flag className={cn("size-3.5", flagged && "fill-current")} aria-hidden />
          {flagged ? "Flagged" : "Flag"}
        </button>
      </div>

      {question.passage && (
        <div className="prose-passage rounded-xl border border-border bg-surface p-4 text-foreground">
          {question.passage.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      <p className="prose-passage font-medium text-foreground">{question.prompt}</p>

      {question.question_type === "mc" ? (
        <fieldset>
          <legend className="sr-only">Answer choices</legend>
          <div className="space-y-2.5">
            {(question.choices ?? []).map((choice) => {
              const isSelected = selected === choice.key;
              return (
                <button
                  key={choice.key}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => onSelect(choice.key)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-colors",
                    "min-h-[52px]",
                    isSelected
                      ? "border-brand bg-brand-soft"
                      : "border-border bg-surface hover:border-border-strong",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-7 shrink-0 place-items-center rounded-full border text-[13px] font-semibold",
                      isSelected
                        ? "border-brand bg-brand text-[color:var(--brand-fg)]"
                        : "border-border-strong text-muted-foreground",
                    )}
                    aria-hidden
                  >
                    {choice.key}
                  </span>
                  <span className="pt-0.5 text-[15px] leading-relaxed">{choice.text}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : (
        <div className="space-y-2">
          <label
            htmlFor={`spr-${question.id}`}
            className="block text-sm font-medium"
          >
            Enter your answer
          </label>
          <Input
            id={`spr-${question.id}`}
            value={selected ?? ""}
            onChange={(e) => onSelect(e.target.value)}
            inputMode="text"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder="e.g. 17, 2.6 or 13/5"
            className="h-14 text-lg tnum"
          />
          <p className="text-xs text-muted-foreground">
            Fractions and decimals are both accepted — 13/5 and 2.6 count as the same
            answer. Don't enter units or symbols.
          </p>
        </div>
      )}
    </div>
  );
}
