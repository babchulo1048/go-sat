import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle2, ChevronRight, CircleSlash, HelpCircle, XCircle } from "lucide-react";
import { db, type LocalAnswer, type LocalAttempt } from "@/lib/db";
import { getAnswers, getAttempt, getTest } from "@/lib/repo";
import { scoreAttempt, type AttemptScore } from "@/lib/scoring";
import { getDomainMap } from "@/lib/stats";
import { formatDuration, formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";
import { DomainAccuracyBars, SectionHeading } from "@/components/common";
import { NoteEditor } from "@/features/notes/NoteEditor";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BENCHMARK_SECONDS, SECTION_LABEL, type Domain, type Question, type Section, type Test } from "@/types/db";

interface Loaded {
  attempt: LocalAttempt;
  test: Test | undefined;
  score: AttemptScore;
  answers: LocalAnswer[];
  questions: Map<string, Question>;
  domains: Map<string, Domain>;
  sectionByPart: Map<string, Section>;
}

export function ResultsPage() {
  const { attemptId = "" } = useParams();
  const [data, setData] = useState<Loaded | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const attempt = await getAttempt(attemptId);
      if (!attempt) return;
      const [test, score, answers, domains, parts] = await Promise.all([
        getTest(attempt.test_id),
        scoreAttempt(attemptId),
        getAnswers(attemptId),
        getDomainMap(),
        db.parts.toArray(),
      ]);
      const questionRows = await db.questions.bulkGet(answers.map((a) => a.question_id));
      const questions = new Map<string, Question>();
      questionRows.forEach((q) => q && questions.set(q.id, q));
      const sectionByPart = new Map(parts.map((p) => [p.id, p.section]));

      if (!cancelled) {
        setData({ attempt, test, score, answers, questions, domains, sectionByPart });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [attemptId]);

  if (!data) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-36 w-full rounded-xl" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  const { attempt, test, score, answers, questions, domains } = data;
  const isFullMock = test?.test_type === "full_mock";
  const wrongCount = answers.filter((a) => !a.is_correct).length;

  const domainBars = score.byDomain.map((d) => ({
    id: d.domain_id,
    name: domains.get(d.domain_id)?.name ?? d.domain_id,
    correct: d.correct,
    total: d.total,
    accuracy: d.accuracy,
  }));

  return (
    <div className="space-y-7">
      <header>
        <p className="text-sm text-muted-foreground">{test?.title ?? "Practice"}</p>
        <h2 className="mt-0.5 text-2xl font-semibold tracking-tight">Results</h2>
      </header>

      {/* ------------------------------------------------- headline score */}
      {isFullMock && score.scaledTotal !== null ? (
        <section className="rounded-xl border border-border bg-surface p-5 text-center">
          <div className="flex items-center justify-center gap-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
              Estimated score
            </p>
            <EstimateExplainer />
          </div>
          <p className="mt-1 text-5xl font-semibold tnum text-brand">
            {score.scaledTotal}
          </p>
          <p className="mt-1 text-xs text-muted-foreground tnum">out of 1600</p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {(["rw", "math"] as Section[]).map((s) => (
              <div key={s} className="rounded-lg bg-surface-2 p-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.05em] text-muted-foreground">
                  {SECTION_LABEL[s]}
                </p>
                <p className="mt-0.5 text-2xl font-semibold tnum">
                  {score.scaledBySection[s] ?? "—"}
                </p>
                <p className="text-xs text-muted-foreground tnum">
                  {score.rawBySection[s]?.correct ?? 0} / {score.rawBySection[s]?.total ?? 0}{" "}
                  correct
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="rounded-xl border border-border bg-surface p-5 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
            Accuracy
          </p>
          <p className="mt-1 text-5xl font-semibold tnum text-brand">
            {formatPercent(score.accuracy)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground tnum">
            {score.correct} of {score.total} correct
          </p>
        </section>
      )}

      {/* ------------------------------------------------------- pacing */}
      <section>
        <SectionHeading>Pacing</SectionHeading>
        <div className="space-y-2.5">
          {(Object.keys(score.avgSecondsBySection) as Section[]).map((s) => {
            const avg = score.avgSecondsBySection[s]!;
            const benchmark = BENCHMARK_SECONDS[s];
            const delta = avg - benchmark;
            return (
              <div
                key={s}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface p-3.5"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium">{SECTION_LABEL[s]}</p>
                  <p className="text-xs text-muted-foreground tnum">
                    target {benchmark}s per question
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-lg font-semibold tnum">{avg}s</p>
                  <p
                    className={cn(
                      "text-xs tnum",
                      delta > 10
                        ? "text-warning"
                        : delta < -10
                          ? "text-muted-foreground"
                          : "text-success",
                    )}
                  >
                    {delta > 0 ? `${delta}s over` : delta < 0 ? `${-delta}s under` : "on pace"}
                  </p>
                </div>
              </div>
            );
          })}
          <p className="px-1 text-xs text-muted-foreground">
            Total time {formatDuration(score.totalSeconds)}.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------- domain chart */}
      <section>
        <SectionHeading>Accuracy by topic</SectionHeading>
        <div className="rounded-xl border border-border bg-surface p-4">
          <DomainAccuracyBars data={domainBars} />
          <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
            Weakest first. The top row is where the next study session should go.
          </p>
        </div>
      </section>

      {/* --------------------------------------------------------- review */}
      {wrongCount > 0 && (
        <Button asChild size="lg" className="h-12 w-full text-base">
          <Link to={`/review/${attemptId}`}>
            Review your {wrongCount} mistake{wrongCount === 1 ? "" : "s"}
          </Link>
        </Button>
      )}

      {/* ---------------------------------------------------------- notes */}
      <section>
        <SectionHeading>Notes on this test</SectionHeading>
        <NoteEditor
          attemptId={attemptId}
          placeholder="What did you find difficult? What will you do differently next time?"
          quickChips={domainBars.slice(0, 3).map((d) => d.name)}
        />
      </section>

      {/* -------------------------------------------------- question list */}
      <section>
        <SectionHeading>Every question</SectionHeading>
        <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
          {answers.map((a, i) => {
            const q = questions.get(a.question_id);
            const blank = a.selected === null || a.selected === "";
            return (
              <li key={a.id} className="flex items-center gap-3 px-4 py-3">
                <span className="w-6 shrink-0 text-sm text-muted-foreground tnum">
                  {i + 1}
                </span>
                {blank ? (
                  <CircleSlash className="size-4 shrink-0 text-muted-foreground" aria-label="Blank" />
                ) : a.is_correct ? (
                  <CheckCircle2 className="size-4 shrink-0 text-success" aria-label="Correct" />
                ) : (
                  <XCircle className="size-4 shrink-0 text-danger" aria-label="Incorrect" />
                )}
                <span className="min-w-0 flex-1 truncate text-sm">
                  {q ? (domains.get(q.domain_id)?.name ?? q.domain_id) : "—"}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground tnum">
                  {a.seconds_spent}s
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <Button asChild variant="outline" className="h-11 w-full">
        <Link to="/practice">
          Back to practice
          <ChevronRight className="ml-1 size-4" aria-hidden />
        </Link>
      </Button>

      <p className="pb-2 text-center text-xs text-muted-foreground">
        Completed {attempt.completed_at ? new Date(attempt.completed_at).toLocaleString() : "—"}
      </p>
    </div>
  );
}

function EstimateExplainer() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          aria-label="What does estimated mean?"
          className="grid size-5 place-items-center rounded-full text-muted-foreground hover:text-foreground"
        >
          <HelpCircle className="size-4" aria-hidden />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Why "estimated"?</DialogTitle>
          <DialogDescription className="space-y-3 pt-2 text-left">
            <span className="block">
              The real SAT is adaptive: how you do on the first module decides how hard
              the second one is, and your score depends on which questions you got
              right — not just how many.
            </span>
            <span className="block">
              This test is a fixed set, so its score is a reasonable approximation, not a
              prediction. Treat it as a direction of travel.
            </span>
            <span className="block font-medium text-foreground">
              For a score you can trust, take a full-length test in College Board's
              Bluebook app.
            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
