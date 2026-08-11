import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { db } from "@/lib/db";
import { listAttempts } from "@/lib/repo";
import {
  activityByDay,
  avgSecondsBySection,
  domainStats,
  errorCategoryTrend,
  getDomainMap,
  loadEnrichedAnswers,
  scoreHistory,
} from "@/lib/stats";
import { formatDate } from "@/lib/format";
import { formatBand, totalBand } from "@/lib/scoring";
import { cn } from "@/lib/utils";
import { DomainAccuracyBars, EmptyState, SectionHeading } from "@/components/common";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BENCHMARK_SECONDS,
  ERROR_CATEGORIES,
  SECTION_LABEL,
  type Section,
} from "@/types/db";

const CATEGORY_COLORS: Record<number, string> = {
  1: "#dc2626",
  2: "#ea580c",
  3: "#d97706",
  4: "#0891b2",
  5: "#4f46e5",
  6: "#7c3aed",
  7: "#64748b",
};

export function ProgressPage() {
  const [range, setRange] = useState<"7" | "all">("all");

  const data = useLiveQuery(async () => {
    const [rows, domains, attempts, tests] = await Promise.all([
      loadEnrichedAnswers(),
      getDomainMap(),
      listAttempts(),
      db.tests.toArray(),
    ]);
    const titleById = new Map(tests.map((t) => [t.id, t.title]));
    return {
      rows,
      domains,
      attempts,
      scores: scoreHistory(attempts, titleById),
      activity: activityByDay(rows, 84),
    };
  }, []);

  if (!data) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-48 w-full rounded-xl" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  if (!data.rows.length) {
    return (
      <EmptyState
        title="No data yet"
        body="Finish a practice set and this page fills with your accuracy by topic, your pacing, and the mix of mistakes you're making."
        actionLabel="Start practice"
        actionTo="/practice"
      />
    );
  }

  const sinceDays = range === "7" ? 7 : undefined;
  const domains = domainStats(data.rows, data.domains, sinceDays);
  const pacing = avgSecondsBySection(data.rows, sinceDays);
  const trend = errorCategoryTrend(data.rows, 6);
  const hasCategories = trend.some((p) => p.total > 0);

  const trendData = trend.map((p) => {
    const row: Record<string, string | number> = { label: p.label };
    ERROR_CATEGORIES.forEach((c) => {
      row[`c${c.id}`] = p.counts[c.id];
    });
    return row;
  });

  return (
    <div className="space-y-8">
      {/* --------------------------------------------------- score history */}
      <section>
        <SectionHeading>Practice estimate over time</SectionHeading>
        {data.scores.length < 2 ? (
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="text-sm text-muted-foreground">
              {data.scores.length === 1 && data.scores[0]!.total != null
                ? `One mock so far: ${formatBand(totalBand(data.scores[0]!.total!))}. A single result carries a lot of noise — the trend only becomes readable across three or more.`
                : "Take a full mock to start the trend line."}
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-surface p-3">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={data.scores} margin={{ top: 8, right: 8, bottom: 4, left: -18 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(v: string) => formatDate(v).replace(/ \d{4}$/, "")}
                  tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                  stroke="var(--border)"
                />
                <YAxis
                  domain={[200, 800]}
                  tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                  stroke="var(--border)"
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelFormatter={(v: string) => formatDate(v)}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="rw"
                  name="Reading & Writing"
                  stroke="var(--brand)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="math"
                  name="Math"
                  stroke="var(--success)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>

            <p className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
              Practice estimates, accurate to roughly ±30 points per section — read the
              direction, not the individual points. Your real score comes from a
              full-length test in Bluebook.
            </p>
          </div>
        )}
      </section>

      {/* ------------------------------------------------ accuracy by topic */}
      <section>
        <SectionHeading
          action={
            <div className="flex gap-1 rounded-lg bg-surface-2 p-0.5">
              {(
                [
                  ["7", "7 days"],
                  ["all", "All time"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setRange(value)}
                  aria-pressed={range === value}
                  className={cn(
                    "min-h-[30px] rounded-md px-2.5 text-xs font-medium transition-colors",
                    range === value
                      ? "bg-background text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          }
        >
          Accuracy by topic
        </SectionHeading>
        <div className="rounded-xl border border-border bg-surface p-4">
          <DomainAccuracyBars
            data={domains}
            emptyLabel="No questions answered in this range."
          />
        </div>
      </section>

      {/* ---------------------------------------------- error category mix */}
      <section>
        <SectionHeading>Why you're missing questions</SectionHeading>
        {!hasCategories ? (
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="text-sm text-muted-foreground">
              Label the cause of your mistakes in Review and this chart becomes the most
              useful one on the page.
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-surface p-3">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={trendData} margin={{ top: 8, right: 8, bottom: 4, left: -22 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                  stroke="var(--border)"
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                  stroke="var(--border)"
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                {ERROR_CATEGORIES.map((c) => (
                  <Bar
                    key={c.id}
                    dataKey={`c${c.id}`}
                    name={c.label}
                    stackId="a"
                    fill={CATEGORY_COLORS[c.id]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>

            <p className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Read this one carefully. </span>
              Knowledge errors (didn't know, misunderstood) shrinking while execution
              errors (careless, time pressure) grow is real progress — even when the
              score hasn't moved yet. It means the remaining problem is an easier one.
            </p>
          </div>
        )}
      </section>

      {/* ----------------------------------------------------------- pacing */}
      <section>
        <SectionHeading>Pace per question</SectionHeading>
        <div className="space-y-2.5">
          {(["rw", "math"] as Section[]).map((s) => {
            const avg = pacing[s];
            const benchmark = BENCHMARK_SECONDS[s];
            if (avg === undefined) return null;
            const pct = Math.min((avg / (benchmark * 1.6)) * 100, 100);
            const over = avg > benchmark;
            return (
              <div key={s} className="rounded-xl border border-border bg-surface p-4">
                <div className="mb-2 flex items-baseline justify-between gap-3">
                  <span className="text-sm font-medium">{SECTION_LABEL[s]}</span>
                  <span className="text-sm tnum">
                    <span className={cn("font-semibold", over ? "text-warning" : "text-success")}>
                      {avg}s
                    </span>
                    <span className="text-muted-foreground"> / {benchmark}s target</span>
                  </span>
                </div>
                <div className="relative h-2 overflow-hidden rounded-full bg-surface-2">
                  <div
                    className={cn("h-full rounded-full", over ? "bg-warning" : "bg-success")}
                    style={{ width: `${pct}%` }}
                  />
                  <div
                    className="absolute top-0 h-full w-0.5 bg-foreground/40"
                    style={{ left: `${(benchmark / (benchmark * 1.6)) * 100}%` }}
                    aria-hidden
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------- calendar */}
      <section>
        <SectionHeading>Consistency</SectionHeading>
        <div className="rounded-xl border border-border bg-surface p-4">
          <ActivityHeatmap data={data.activity} />
          <p className="mt-3 text-xs text-muted-foreground">
            Last 12 weeks. Five days a week beats seven days for two weeks and then
            nothing.
          </p>
        </div>
      </section>
    </div>
  );
}

function ActivityHeatmap({ data }: { data: { day: string; count: number }[] }) {
  const weeks: { day: string; count: number }[][] = [];
  for (let i = 0; i < data.length; i += 7) weeks.push(data.slice(i, i + 7));

  const level = (n: number) =>
    n === 0 ? 0 : n < 10 ? 1 : n < 20 ? 2 : n < 40 ? 3 : 4;

  const tones = [
    "bg-surface-2",
    "bg-brand/25",
    "bg-brand/50",
    "bg-brand/75",
    "bg-brand",
  ];

  return (
    <div className="flex gap-1 overflow-x-auto">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-1">
          {week.map((d) => (
            <div
              key={d.day}
              title={`${d.day}: ${d.count} questions`}
              className={cn("size-3 rounded-[3px]", tones[level(d.count)])}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
