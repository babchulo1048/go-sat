import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, LayoutGrid, X } from "lucide-react";
import {
  abandonAttempt,
  completeAttempt,
  getAnswers,
  getParts,
  getQuestions,
  getRunnerState,
  getTest,
  saveAnswer,
  saveRunnerState,
} from "@/lib/repo";
import type { RunnerState } from "@/lib/db";
import { formatClock } from "@/lib/format";
import { loadSettings } from "@/lib/settings";
import { cn } from "@/lib/utils";
import { QuestionCard } from "@/features/runner/QuestionCard";
import { ReviewSheet } from "@/features/runner/ReviewSheet";
import { BreakScreen } from "@/features/runner/BreakScreen";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Question, Test, TestPart } from "@/types/db";

export function TestRunner() {
  const { attemptId = "" } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState<Test | null>(null);
  const [parts, setParts] = useState<TestPart[]>([]);
  const [runner, setRunner] = useState<RunnerState | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selections, setSelections] = useState<Record<string, string | null>>({});
  const [flags, setFlags] = useState<Record<string, boolean>>({});

  const [now, setNow] = useState(() => Date.now());
  const [timerVisible, setTimerVisible] = useState(
    () => loadSettings().timerVisibleByDefault,
  );
  const [sheetOpen, setSheetOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  /** Wall-clock at which the current question was first shown. */
  const questionEnteredAt = useRef<number>(Date.now());
  /** Parts whose 5-minute warning has already fired. */
  const warned = useRef<Set<number>>(new Set());
  /** Guards against the expiry effect firing twice for one deadline. */
  const advancing = useRef(false);

  /* ------------------------------------------------------------- load */

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const state = await getRunnerState(attemptId);
      if (!state) {
        navigate("/", { replace: true });
        return;
      }
      const [t, p, existing] = await Promise.all([
        getTest(state.test_id),
        getParts(state.test_id),
        getAnswers(attemptId),
      ]);
      if (cancelled) return;

      const sel: Record<string, string | null> = {};
      const flg: Record<string, boolean> = {};
      existing.forEach((a) => {
        sel[a.question_id] = a.selected;
        flg[a.question_id] = a.was_flagged;
      });

      setTest(t ?? null);
      setParts(p);
      setRunner(state);
      setSelections(sel);
      setFlags(flg);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [attemptId, navigate]);

  /* Load the questions for whichever part we're on. */
  useEffect(() => {
    if (!runner || !parts.length) return;
    const part = parts[runner.part_index];
    if (!part) return;

    let cancelled = false;
    void getQuestions(part.id).then((qs) => {
      if (!cancelled) setQuestions(qs);
    });
    return () => {
      cancelled = true;
    };
  }, [runner?.part_index, parts, runner]);

  /* Tick only while a timed part is actually running. */
  useEffect(() => {
    if (!runner || runner.mode !== "timed" || runner.part_deadline === null) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [runner?.mode, runner?.part_deadline, runner]);

  const part = runner ? parts[runner.part_index] : undefined;
  const currentQuestion = runner ? questions[runner.question_index] : undefined;

  const remainingSeconds = useMemo(() => {
    if (!runner || runner.mode !== "timed" || runner.part_deadline === null) return null;
    return Math.max(0, Math.round((runner.part_deadline - now) / 1000));
  }, [runner, now]);

  /* ------------------------------------------------- persistence helpers */

  /** Persist the time spent on the question we're leaving, plus its answer. */
  const flushCurrentQuestion = useCallback(
    async (overrideValue?: string | null) => {
      if (!currentQuestion) return;
      const elapsed = (Date.now() - questionEnteredAt.current) / 1000;
      questionEnteredAt.current = Date.now();
      await saveAnswer({
        attemptId,
        question: currentQuestion,
        selected:
          overrideValue !== undefined
            ? overrideValue
            : (selections[currentQuestion.id] ?? null),
        addSeconds: elapsed,
        flagged: flags[currentQuestion.id] ?? false,
      });
    },
    [attemptId, currentQuestion, selections, flags],
  );

  const goToQuestion = useCallback(
    async (index: number) => {
      if (!runner) return;
      await flushCurrentQuestion();
      const next: RunnerState = { ...runner, question_index: index, updated_at: Date.now() };
      setRunner(next);
      await saveRunnerState(next);
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    },
    [runner, flushCurrentQuestion],
  );

  /* ------------------------------------------------------- part advance */

  const advanceToPart = useCallback(
    async (nextIndex: number) => {
      if (!runner || advancing.current) return;
      advancing.current = true;

      try {
        await flushCurrentQuestion();

        if (nextIndex >= parts.length) {
          await completeAttempt(attemptId);
          navigate(`/results/${attemptId}`, { replace: true });
          return;
        }

        const prev = parts[runner.part_index];
        const next = parts[nextIndex]!;

        // A full mock gets one optional 10-minute break, at the RW → Math seam.
        const needsBreak =
          test?.test_type === "full_mock" &&
          !runner.break_taken &&
          prev?.section === "rw" &&
          next.section === "math";

        const state: RunnerState = {
          ...runner,
          part_index: nextIndex,
          question_index: 0,
          // On a break the clock stays unset until she chooses to continue.
          part_deadline: needsBreak
            ? null
            : runner.mode === "timed"
              ? Date.now() + next.duration_seconds * 1000
              : null,
          break_taken: needsBreak ? false : true,
          updated_at: Date.now(),
        };

        setRunner(state);
        await saveRunnerState(state);
        questionEnteredAt.current = Date.now();
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      } finally {
        advancing.current = false;
      }
    },
    [runner, parts, attemptId, test, flushCurrentQuestion, navigate],
  );

  /* Expiry: auto-advance the moment the clock reaches zero. Answers are
     already persisted, so nothing is lost. */
  useEffect(() => {
    if (remainingSeconds === null || !runner) return;
    if (remainingSeconds > 0) return;
    void advanceToPart(runner.part_index + 1);
  }, [remainingSeconds, runner, advanceToPart]);

  /* Five-minute warning, once per part, non-modal. */
  useEffect(() => {
    if (remainingSeconds === null || !runner) return;
    if (remainingSeconds > 300 || remainingSeconds <= 0) return;
    if (warned.current.has(runner.part_index)) return;
    warned.current.add(runner.part_index);
    toast("5 minutes remaining", {
      description: "Answer anything still blank — a guess beats a blank.",
    });
  }, [remainingSeconds, runner]);

  /* Persist on tab hide, so a killed app never loses the last question. */
  useEffect(() => {
    const handler = () => {
      if (document.visibilityState === "hidden") void flushCurrentQuestion();
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [flushCurrentQuestion]);

  /* Reset the per-question stopwatch whenever the question changes. */
  useEffect(() => {
    questionEnteredAt.current = Date.now();
  }, [runner?.question_index, runner?.part_index]);

  /* ------------------------------------------------------------ actions */

  const select = (value: string) => {
    if (!currentQuestion) return;
    setSelections((s) => ({ ...s, [currentQuestion.id]: value }));
    // Persist immediately with zero added time; the elapsed time is flushed
    // on navigation. Two writes, but never a lost answer.
    void saveAnswer({
      attemptId,
      question: currentQuestion,
      selected: value,
      addSeconds: 0,
      flagged: flags[currentQuestion.id] ?? false,
    });
  };

  const toggleFlag = () => {
    if (!currentQuestion) return;
    const next = !flags[currentQuestion.id];
    setFlags((f) => ({ ...f, [currentQuestion.id]: next }));
    void saveAnswer({
      attemptId,
      question: currentQuestion,
      selected: selections[currentQuestion.id] ?? null,
      addSeconds: 0,
      flagged: next,
    });
  };

  /* ------------------------------------------------------------- render */

  if (loading || !runner || !part) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 p-4">
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-56 w-full rounded-xl" />
      </div>
    );
  }

  // Mid-break: the clock is deliberately not running.
  if (
    test?.test_type === "full_mock" &&
    !runner.break_taken &&
    runner.mode === "timed" &&
    runner.part_deadline === null &&
    runner.part_index > 0
  ) {
    return (
      <BreakScreen
        nextPartTitle={part.title}
        onContinue={async () => {
          const state: RunnerState = {
            ...runner,
            part_deadline: Date.now() + part.duration_seconds * 1000,
            break_taken: true,
            updated_at: Date.now(),
          };
          setRunner(state);
          await saveRunnerState(state);
          questionEnteredAt.current = Date.now();
        }}
      />
    );
  }

  const isLastQuestion = runner.question_index >= questions.length - 1;
  const isLastPart = runner.part_index >= parts.length - 1;

  return (
    <div className="min-h-dvh bg-background">
      {/* ---------------------------------------------------- top bar */}
      <header className="pt-safe sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 w-full max-w-3xl items-center gap-2 px-3">
          <button
            onClick={() => setExitOpen(true)}
            aria-label="Exit test"
            className="grid size-10 shrink-0 place-items-center rounded-lg text-muted-foreground hover:text-foreground"
          >
            <X className="size-5" aria-hidden />
          </button>

          <div className="min-w-0 flex-1 text-center">
            <p className="truncate text-[13px] font-semibold leading-tight">
              {part.title}
            </p>
            <p className="text-xs text-muted-foreground tnum">
              Question {runner.question_index + 1} of {questions.length}
            </p>
          </div>

          {remainingSeconds !== null ? (
            <button
              onClick={() => setTimerVisible((v) => !v)}
              aria-label={timerVisible ? "Hide timer" : "Show timer"}
              className={cn(
                "inline-flex h-10 min-w-[76px] shrink-0 items-center justify-center gap-1.5 rounded-lg px-2 text-sm font-semibold tnum transition-colors",
                remainingSeconds <= 300
                  ? "bg-warning-soft text-warning"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {timerVisible ? (
                <>
                  <Eye className="size-3.5" aria-hidden />
                  {formatClock(remainingSeconds)}
                </>
              ) : (
                <EyeOff className="size-4" aria-hidden />
              )}
            </button>
          ) : (
            <span className="min-w-[76px] shrink-0 text-right text-xs text-muted-foreground">
              Untimed
            </span>
          )}
        </div>

        <div className="h-0.5 w-full bg-surface-2">
          <div
            className="h-full bg-brand transition-all duration-300"
            style={{
              width: `${((runner.question_index + 1) / Math.max(questions.length, 1)) * 100}%`,
            }}
          />
        </div>
      </header>

      {/* ---------------------------------------------------- question */}
      <main className="mx-auto w-full max-w-3xl px-4 pt-5 pb-32">
        {currentQuestion ? (
          <QuestionCard
            question={currentQuestion}
            index={runner.question_index}
            selected={selections[currentQuestion.id] ?? null}
            flagged={flags[currentQuestion.id] ?? false}
            onSelect={select}
            onToggleFlag={toggleFlag}
          />
        ) : (
          <Skeleton className="h-64 w-full rounded-xl" />
        )}
      </main>

      {/* ---------------------------------------------------- bottom bar */}
      <div className="pb-safe fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-2 px-3 py-2.5">
          <Button
            variant="outline"
            className="h-11 px-3"
            onClick={() => setSheetOpen(true)}
            aria-label="Review all questions in this part"
          >
            <LayoutGrid className="size-4" aria-hidden />
          </Button>

          <Button
            variant="outline"
            className="h-11 flex-1"
            disabled={runner.question_index === 0}
            onClick={() => void goToQuestion(runner.question_index - 1)}
          >
            Back
          </Button>

          <Button
            className="h-11 flex-[1.4]"
            onClick={() => {
              if (!isLastQuestion) void goToQuestion(runner.question_index + 1);
              else void advanceToPart(runner.part_index + 1);
            }}
          >
            {!isLastQuestion ? "Next" : isLastPart ? "Finish" : "Next part"}
          </Button>
        </div>
      </div>

      <ReviewSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        partTitle={part.title}
        questions={questions}
        answers={selections}
        flags={flags}
        currentIndex={runner.question_index}
        onJump={(i) => void goToQuestion(i)}
      />

      <AlertDialog open={exitOpen} onOpenChange={setExitOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave this test?</AlertDialogTitle>
            <AlertDialogDescription>
              Your answers are saved. You can pick it up from the same question on the
              home screen — though the clock keeps running on a timed test.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel>Keep going</AlertDialogCancel>
            <Button
              variant="outline"
              onClick={async () => {
                await flushCurrentQuestion();
                navigate("/");
              }}
            >
              Save and exit
            </Button>
            <AlertDialogAction
              onClick={async () => {
                await abandonAttempt(attemptId);
                navigate("/");
              }}
            >
              Discard attempt
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
