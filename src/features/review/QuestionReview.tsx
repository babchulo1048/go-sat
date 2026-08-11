import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { db, type LocalAnswer } from "@/lib/db";
import { getAnswers, setErrorCategory } from "@/lib/repo";
import { cn } from "@/lib/utils";
import { NoteEditor } from "@/features/notes/NoteEditor";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/common";
import {
  ERROR_CATEGORIES,
  type ErrorCategoryId,
  type Question,
} from "@/types/db";

interface Item {
  answer: LocalAnswer;
  question: Question;
}

export function QuestionReview() {
  const { attemptId = "" } = useParams();
  const [items, setItems] = useState<Item[] | null>(null);
  const [index, setIndex] = useState(0);
  const [categories, setCategories] = useState<Record<string, ErrorCategoryId | null>>({});

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const answers = await getAnswers(attemptId);
      const wrong = answers.filter((a) => !a.is_correct);
      const questions = await db.questions.bulkGet(wrong.map((a) => a.question_id));

      const list: Item[] = [];
      const cats: Record<string, ErrorCategoryId | null> = {};
      wrong.forEach((a, i) => {
        const q = questions[i];
        if (q) {
          list.push({ answer: a, question: q });
          cats[a.id] = a.error_category;
        }
      });

      if (!cancelled) {
        setItems(list);
        setCategories(cats);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [attemptId]);

  const remaining = useMemo(
    () => (items ?? []).filter((i) => categories[i.answer.id] == null).length,
    [items, categories],
  );

  if (!items) return <Skeleton className="h-96 w-full rounded-xl" />;

  if (!items.length) {
    return (
      <div className="space-y-5">
        <BackLink attemptId={attemptId} />
        <EmptyState
          title="Nothing to review"
          body="You didn't miss anything on this one. Take a harder set next."
          actionLabel="Back to practice"
          actionTo="/practice"
        />
      </div>
    );
  }

  const item = items[Math.min(index, items.length - 1)]!;
  const { answer, question } = item;
  const chosen = categories[answer.id] ?? null;
  const isLast = index >= items.length - 1;

  const pick = async (id: ErrorCategoryId) => {
    setCategories((c) => ({ ...c, [answer.id]: id }));
    await setErrorCategory(answer.id, id);
    // Auto-advance keeps the whole loop to a single tap per mistake.
    if (!isLast) setTimeout(() => setIndex((i) => i + 1), 180);
  };

  const selectedText =
    question.question_type === "mc"
      ? (question.choices?.find((c) => c.key === answer.selected)?.text ?? null)
      : answer.selected;
  const correctText =
    question.question_type === "mc"
      ? (question.choices?.find((c) => c.key === question.correct_answer)?.text ?? "")
      : question.correct_answer;

  return (
    <div className="space-y-6">
      <BackLink attemptId={attemptId} />

      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">
          Mistake {index + 1}{" "}
          <span className="font-normal text-muted-foreground tnum">of {items.length}</span>
        </h2>
        {remaining > 0 && (
          <span className="rounded-full bg-warning-soft px-2.5 py-1 text-xs font-medium text-warning tnum">
            {remaining} unlabelled
          </span>
        )}
      </div>

      {question.passage && (
        <div className="prose-passage rounded-xl border border-border bg-surface p-4">
          {question.passage.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}

      <p className="prose-passage font-medium">{question.prompt}</p>

      <div className="space-y-2.5">
        <AnswerRow
          tone="wrong"
          label="Your answer"
          value={
            answer.selected
              ? `${question.question_type === "mc" ? `${answer.selected}. ` : ""}${selectedText ?? ""}`
              : "Left blank"
          }
        />
        <AnswerRow
          tone="right"
          label="Correct answer"
          value={`${question.question_type === "mc" ? `${question.correct_answer}. ` : ""}${correctText}`}
        />
      </div>

      <section className="rounded-xl border border-border bg-surface p-4">
        <h3 className="mb-2 text-sm font-semibold">Why</h3>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          {question.explanation}
        </p>
      </section>

      {/* ------------------------------------------- the error categoriser */}
      <section>
        <h3 className="text-sm font-semibold">What went wrong?</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          One tap. This is what turns a wrong answer into a study plan.
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {ERROR_CATEGORIES.map((cat) => {
            const active = chosen === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => void pick(cat.id)}
                aria-pressed={active}
                className={cn(
                  "flex min-h-[72px] flex-col justify-center rounded-xl border p-3 text-left transition-colors",
                  active
                    ? "border-brand bg-brand-soft"
                    : "border-border bg-surface hover:border-border-strong",
                )}
              >
                <span
                  className={cn(
                    "text-[13px] font-semibold leading-tight",
                    active && "text-brand",
                  )}
                >
                  {cat.label}
                </span>
                <span className="mt-1 text-[11px] leading-tight text-muted-foreground">
                  {cat.hint}
                </span>
              </button>
            );
          })}
        </div>

        {chosen && (
          <p className="mt-3 rounded-lg bg-surface-2 p-3 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Fix: </span>
            {ERROR_CATEGORIES.find((c) => c.id === chosen)?.remedy}
          </p>
        )}
      </section>

      <section>
        <h3 className="mb-2 text-sm font-semibold">What will you do differently?</h3>
        <NoteEditor
          attemptId={attemptId}
          questionId={question.id}
          rows={3}
          placeholder="Write the rule, not the answer. e.g. 'A semicolon needs a full sentence on both sides.'"
        />
      </section>

      {/* ------------------------------------------------------ navigation */}
      <div className="flex items-center gap-2 pb-2">
        <Button
          variant="outline"
          className="h-11 flex-1"
          disabled={index === 0}
          onClick={() => setIndex((i) => i - 1)}
        >
          <ChevronLeft className="mr-1 size-4" aria-hidden />
          Previous
        </Button>

        {isLast ? (
          <Button asChild className="h-11 flex-1">
            <Link to="/review">Done</Link>
          </Button>
        ) : (
          <Button className="h-11 flex-1" onClick={() => setIndex((i) => i + 1)}>
            {chosen ? "Next" : "Skip"}
            <ChevronRight className="ml-1 size-4" aria-hidden />
          </Button>
        )}
      </div>
    </div>
  );
}

function BackLink({ attemptId }: { attemptId: string }) {
  return (
    <Link
      to={`/results/${attemptId}`}
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft className="size-4" aria-hidden />
      Results
    </Link>
  );
}

function AnswerRow({
  tone,
  label,
  value,
}: {
  tone: "wrong" | "right";
  label: string;
  value: string;
}) {
  const wrong = tone === "wrong";
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border p-3.5",
        wrong ? "border-danger/40 bg-danger-soft" : "border-success/40 bg-success-soft",
      )}
    >
      {wrong ? (
        <X className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden />
      ) : (
        <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
      )}
      <div className="min-w-0">
        <p
          className={cn(
            "text-[11px] font-semibold uppercase tracking-[0.05em]",
            wrong ? "text-danger" : "text-success",
          )}
        >
          {label}
        </p>
        <p className="mt-0.5 text-[15px] leading-relaxed">{value}</p>
      </div>
    </div>
  );
}
