import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Clock, Info } from "lucide-react";
import { db } from "@/lib/db";
import { createAttempt, getParts, getTest } from "@/lib/repo";
import { formatClock, formatDuration } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SECTION_LABEL } from "@/types/db";

export function PreTestBrief() {
  const { testId = "" } = useParams();
  const navigate = useNavigate();
  const [starting, setStarting] = useState(false);

  const data = useLiveQuery(async () => {
    const test = await getTest(testId);
    if (!test) return null;
    const parts = await getParts(testId);
    const counts = new Map<string, number>();
    for (const p of parts) {
      counts.set(p.id, await db.questions.where("part_id").equals(p.id).count());
    }
    return { test, parts, counts };
  }, [testId]);

  if (data === undefined) return <Skeleton className="h-64 w-full rounded-xl" />;
  if (data === null) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">That test could not be found.</p>
        <Button asChild variant="outline">
          <Link to="/practice">Back to practice</Link>
        </Button>
      </div>
    );
  }

  const { test, parts, counts } = data;
  const totalQuestions = parts.reduce((n, p) => n + (counts.get(p.id) ?? 0), 0);
  const totalSeconds = parts.reduce((n, p) => n + p.duration_seconds, 0);
  const isFullMock = test.test_type === "full_mock";

  const start = async (mode: "timed" | "untimed") => {
    setStarting(true);
    const attempt = await createAttempt(test.id, mode);
    navigate(`/run/${attempt.id}`, { replace: true });
  };

  return (
    <div className="space-y-6">
      <Link
        to="/practice"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Practice
      </Link>

      <header className="space-y-1.5">
        <h2 className="text-2xl font-semibold tracking-tight">{test.title}</h2>
        {test.description && (
          <p className="text-sm text-muted-foreground">{test.description}</p>
        )}
      </header>

      <section className="rounded-xl border border-border bg-surface">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="text-sm font-semibold">Structure</span>
          <span className="text-sm text-muted-foreground tnum">
            {totalQuestions} questions · {formatDuration(totalSeconds)}
          </span>
        </div>
        <ul className="divide-y divide-border">
          {parts.map((p) => (
            <li key={p.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{p.title}</p>
                <p className="text-xs text-muted-foreground">
                  {SECTION_LABEL[p.section]}
                </p>
              </div>
              <span className="shrink-0 text-sm text-muted-foreground tnum">
                {counts.get(p.id) ?? 0} q · {formatClock(p.duration_seconds)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3 rounded-xl border border-border bg-surface p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <Info className="size-4 text-brand" aria-hidden />
          How this works
        </h3>
        <ul className="space-y-2.5 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span aria-hidden className="text-brand">
              •
            </span>
            <span>
              You can move freely <strong className="text-foreground">within a part</strong> —
              skip ahead, go back, and flag anything to return to.
            </span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden className="text-brand">
              •
            </span>
            <span>
              Once you leave a part,{" "}
              <strong className="text-foreground">you cannot return to it.</strong> Time
              left over does not carry forward, so use it to re-check flagged questions.
            </span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden className="text-brand">
              •
            </span>
            <span>
              There is{" "}
              <strong className="text-foreground">no penalty for a wrong answer</strong>.
              Never leave one blank — guess and move on.
            </span>
          </li>
          {isFullMock && (
            <li className="flex gap-2">
              <span aria-hidden className="text-brand">
                •
              </span>
              <span>
                There's an optional 10-minute break between Reading and Writing and Math.
              </span>
            </li>
          )}
        </ul>
      </section>

      {isFullMock && (
        <div className="flex gap-2.5 rounded-xl border border-warning/40 bg-warning-soft p-4">
          <AlertTriangle className="size-4 shrink-0 text-warning" aria-hidden />
          <p className="text-sm">
            Take this in one sitting, in the morning, with your phone in another room.
            A mock taken casually gives a number you have to throw away.
          </p>
        </div>
      )}

      <div className="space-y-2.5">
        <Button
          size="lg"
          className="h-12 w-full text-base"
          disabled={starting}
          onClick={() => void start("timed")}
        >
          <Clock className="mr-2 size-4" aria-hidden />
          Start timed
        </Button>

        {!isFullMock && (
          <Button
            size="lg"
            variant="outline"
            className="h-12 w-full text-base"
            disabled={starting}
            onClick={() => void start("untimed")}
          >
            Start untimed
          </Button>
        )}

        {!isFullMock && (
          <p className="px-1 text-xs text-muted-foreground">
            Untimed first. Accuracy before speed — practising a shaky skill against the
            clock just builds fast wrong answers.
          </p>
        )}
      </div>
    </div>
  );
}
