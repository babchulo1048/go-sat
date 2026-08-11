import { useLiveQuery } from "dexie-react-hooks";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Flame, PlayCircle } from "lucide-react";
import { db } from "@/lib/db";
import { getActiveAttempt, getAllWrongAnswers, getTest } from "@/lib/repo";
import {
  computeStreak,
  countInLastDays,
  countOnDay,
  loadEnrichedAnswers,
} from "@/lib/stats";
import { dayKey, formatDate } from "@/lib/format";
import { useSettings } from "@/hooks/useSettings";
import { GoalRing, SectionHeading, StatTile } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function HomePage() {
  const { settings } = useSettings();

  const data = useLiveQuery(async () => {
    const rows = await loadEnrichedAnswers();
    const active = await getActiveAttempt();
    const activeTest = active ? await getTest(active.test_id) : undefined;
    const completed = await db.attempts.where("status").equals("completed").toArray();
    const wrong = await getAllWrongAnswers();

    const latest = completed
      .filter((a) => a.scaled_total !== null)
      .sort((a, b) => (b.completed_at ?? "").localeCompare(a.completed_at ?? ""))[0];

    return {
      today: countOnDay(rows, dayKey(new Date())),
      week: countInLastDays(rows, 7),
      streak: computeStreak(rows),
      latest,
      active,
      activeTest,
      /* Only mistakes still awaiting a category need her attention. */
      uncategorised: wrong.filter((a) => a.error_category === null).length,
      totalWrong: wrong.length,
    };
  }, []);

  if (!data) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-20 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    );
  }

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{greeting}</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {new Date().toLocaleDateString(undefined, {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
      </div>

      {/* Resume takes priority over everything else on the screen. */}
      {data.active && (
        <Link
          to={`/run/${data.active.id}`}
          className="block rounded-xl border border-brand bg-brand-soft p-4 transition-colors hover:bg-brand-soft/70"
        >
          <div className="flex items-center gap-3">
            <PlayCircle className="size-9 shrink-0 text-brand" aria-hidden />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-brand">
                In progress
              </p>
              <p className="truncate font-semibold">
                {data.activeTest?.title ?? "Practice test"}
              </p>
              <p className="text-xs text-muted-foreground">
                Started {formatDate(data.active.started_at)} · tap to continue
              </p>
            </div>
            <ArrowRight className="size-5 shrink-0 text-brand" aria-hidden />
          </div>
        </Link>
      )}

      <div className="grid grid-cols-3 gap-3">
        <StatTile
          label="Latest score"
          value={data.latest?.scaled_total ?? "—"}
          hint={data.latest ? "estimated" : "no mock yet"}
          tone="brand"
        />
        <StatTile label="This week" value={data.week} hint="questions" />
        <StatTile
          label="Streak"
          value={
            <span className="inline-flex items-center gap-1">
              {data.streak}
              {data.streak >= 3 && (
                <Flame className="size-4 text-warning" aria-hidden />
              )}
            </span>
          }
          hint={data.streak === 1 ? "day" : "days"}
        />
      </div>

      <section className="rounded-xl border border-border bg-surface p-4">
        <div className="flex items-center gap-4">
          <GoalRing done={data.today} goal={settings.dailyGoal} />
          <div className="min-w-0 flex-1">
            <p className="font-semibold">Today's goal</p>
            <p className="text-sm text-muted-foreground">
              {data.today >= settings.dailyGoal
                ? `Done — ${data.today} questions. Anything more is a bonus.`
                : `${settings.dailyGoal - data.today} more to reach ${settings.dailyGoal}.`}
            </p>
          </div>
        </div>
      </section>

      <div className="space-y-3">
        <Button asChild size="lg" className="h-12 w-full text-base">
          <Link to="/practice">Start practice</Link>
        </Button>

        <Button asChild variant="outline" size="lg" className="h-12 w-full text-base">
          <Link to="/review">
            <BookOpen className="mr-2 size-4" aria-hidden />
            Review mistakes
            {data.totalWrong > 0 && (
              <span className="ml-1.5 text-muted-foreground tnum">
                ({data.totalWrong})
              </span>
            )}
          </Link>
        </Button>
      </div>

      {data.uncategorised > 0 && (
        <section>
          <SectionHeading>Needs your attention</SectionHeading>
          <Link
            to="/review"
            className="block rounded-xl border border-warning/40 bg-warning-soft p-4 transition-opacity hover:opacity-90"
          >
            <p className="text-sm font-medium">
              {data.uncategorised} mistake{data.uncategorised === 1 ? "" : "s"} without a
              cause
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Labelling why you missed a question is what turns a score into a study
              plan. It takes one tap each.
            </p>
          </Link>
        </section>
      )}
    </div>
  );
}
