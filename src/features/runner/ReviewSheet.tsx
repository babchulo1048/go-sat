import { Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Question } from "@/types/db";

/**
 * The "where am I?" view for the current part. Answered / unanswered / flagged
 * at a glance, tap to jump. This is what makes "bank the easy points first,
 * come back to the hard ones" a workable strategy rather than a slogan.
 */
export function ReviewSheet({
  open,
  onOpenChange,
  partTitle,
  questions,
  answers,
  flags,
  currentIndex,
  onJump,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partTitle: string;
  questions: Question[];
  answers: Record<string, string | null>;
  flags: Record<string, boolean>;
  currentIndex: number;
  onJump: (index: number) => void;
}) {
  const unanswered = questions.filter((q) => {
    const v = answers[q.id];
    return v === undefined || v === null || v === "";
  }).length;
  const flaggedCount = questions.filter((q) => flags[q.id]).length;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[80dvh] overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle>{partTitle}</SheetTitle>
        </SheetHeader>

        <div className="flex gap-4 px-4 pb-3 text-xs text-muted-foreground">
          <span className="tnum">{unanswered} unanswered</span>
          <span className="tnum">{flaggedCount} flagged</span>
        </div>

        <div className="grid grid-cols-6 gap-2 px-4 pb-6 sm:grid-cols-8">
          {questions.map((q, i) => {
            const value = answers[q.id];
            const answered = value !== undefined && value !== null && value !== "";
            const isCurrent = i === currentIndex;

            return (
              <button
                key={q.id}
                onClick={() => {
                  onJump(i);
                  onOpenChange(false);
                }}
                aria-label={`Question ${i + 1}${answered ? ", answered" : ", not answered"}${
                  flags[q.id] ? ", flagged" : ""
                }`}
                aria-current={isCurrent ? "true" : undefined}
                className={cn(
                  "relative grid h-11 place-items-center rounded-lg border text-sm font-medium tnum transition-colors",
                  isCurrent && "ring-2 ring-brand ring-offset-2 ring-offset-background",
                  answered
                    ? "border-brand bg-brand-soft text-brand"
                    : "border-border bg-surface text-muted-foreground",
                )}
              >
                {i + 1}
                {flags[q.id] && (
                  <Flag
                    className="absolute -right-0.5 -top-0.5 size-3 fill-warning text-warning"
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
