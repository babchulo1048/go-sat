import { useMemo, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Link } from "react-router-dom";
import { BookOpen, RotateCcw, StickyNote } from "lucide-react";
import { db } from "@/lib/db";
import { loadEnrichedAnswers, type EnrichedAnswer } from "@/lib/stats";
import { formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";
import { EmptyState, SectionHeading } from "@/components/common";
import { ReattemptSession } from "@/features/review/ReattemptSession";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ERROR_CATEGORIES,
  ERROR_CATEGORY_BY_ID,
  type Domain,
  type ErrorCategoryId,
  type Section,
  type Skill,
} from "@/types/db";

type SectionFilter = "all" | Section;
type CategoryFilter = "all" | "unlabelled" | ErrorCategoryId;

export function MistakeLog() {
  const [sectionFilter, setSectionFilter] = useState<SectionFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [reattemptOpen, setReattemptOpen] = useState(false);

  const data = useLiveQuery(async () => {
    const rows = await loadEnrichedAnswers();
    const [domains, skills, reattempts] = await Promise.all([
      db.domains.toArray(),
      db.skills.toArray(),
      db.reattempts.toArray(),
    ]);

    const lastReattempt = new Map<string, { correct: boolean; at: number }>();
    for (const r of reattempts) {
      const cur = lastReattempt.get(r.question_id);
      if (!cur || r.at > cur.at) lastReattempt.set(r.question_id, { correct: r.correct, at: r.at });
    }

    return {
      wrong: rows.filter((r) => !r.answer.is_correct),
      domains: new Map<string, Domain>(domains.map((d) => [d.id, d])),
      skills: new Map<string, Skill>(skills.map((s) => [s.id, s])),
      lastReattempt,
    };
  }, []);

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.wrong.filter((r) => {
      if (sectionFilter !== "all" && r.section !== sectionFilter) return false;
      if (categoryFilter === "unlabelled") return r.answer.error_category === null;
      if (categoryFilter !== "all") return r.answer.error_category === categoryFilter;
      return true;
    });
  }, [data, sectionFilter, categoryFilter]);

  /** Skills that keep reappearing — the actual study list. */
  const recurring = useMemo(() => {
    if (!data) return [];
    const agg = new Map<string, number>();
    for (const r of filtered) {
      const key = r.question.skill_id ?? r.domainId;
      agg.set(key, (agg.get(key) ?? 0) + 1);
    }
    return [...agg.entries()]
      .map(([id, count]) => ({
        id,
        count,
        name: data.skills.get(id)?.name ?? data.domains.get(id)?.name ?? id,
      }))
      .filter((x) => x.count > 1)
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [filtered, data]);

  if (!data) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
    );
  }

  if (!data.wrong.length) {
    return (
      <EmptyState
        icon={<BookOpen className="size-7" aria-hidden />}
        title="No mistakes logged yet"
        body="Once you finish a practice set, every question you miss lands here — with its explanation and the reason you missed it."
        actionLabel="Start practice"
        actionTo="/practice"
      />
    );
  }

  const unlabelled = data.wrong.filter((r) => r.answer.error_category === null).length;
  const categoryCounts = ERROR_CATEGORIES.map((c) => ({
    ...c,
    count: data.wrong.filter((r) => r.answer.error_category === c.id).length,
  })).filter((c) => c.count > 0);

  return (
    <div className="space-y-7">
      <div className="flex items-center gap-2">
        <Button
          className="h-11 flex-1"
          onClick={() => setReattemptOpen(true)}
          disabled={!filtered.length}
        >
          <RotateCcw className="mr-2 size-4" aria-hidden />
          Re-attempt {filtered.length}
        </Button>
        <Button asChild variant="outline" className="h-11">
          <Link to="/notes">
            <StickyNote className="mr-2 size-4" aria-hidden />
            Notes
          </Link>
        </Button>
      </div>

      {unlabelled > 0 && (
        <button
          onClick={() => setCategoryFilter("unlabelled")}
          className="w-full rounded-xl border border-warning/40 bg-warning-soft p-4 text-left"
        >
          <p className="text-sm font-medium tnum">{unlabelled} without a cause</p>
          <p className="mt-1 text-xs text-muted-foreground">
            An uncategorised mistake teaches you nothing later. Tap to filter them.
          </p>
        </button>
      )}

      {/* -------------------------------------------------------- filters */}
      <div className="space-y-3">
        <div role="tablist" className="flex gap-1 rounded-lg bg-surface-2 p-1">
          {(
            [
              ["all", "All"],
              ["rw", "Reading & Writing"],
              ["math", "Math"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              role="tab"
              aria-selected={sectionFilter === value}
              onClick={() => setSectionFilter(value)}
              className={cn(
                "min-h-[38px] flex-1 rounded-md px-2 text-[13px] font-medium transition-colors",
                sectionFilter === value
                  ? "bg-background shadow-[0_1px_2px_rgb(0_0_0/0.06)]"
                  : "text-muted-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="-mx-4 overflow-x-auto px-4">
          <div className="flex w-max gap-2 pb-1">
            <Chip active={categoryFilter === "all"} onClick={() => setCategoryFilter("all")}>
              All causes
            </Chip>
            {unlabelled > 0 && (
              <Chip
                active={categoryFilter === "unlabelled"}
                onClick={() => setCategoryFilter("unlabelled")}
              >
                Unlabelled ({unlabelled})
              </Chip>
            )}
            {categoryCounts.map((c) => (
              <Chip
                key={c.id}
                active={categoryFilter === c.id}
                onClick={() => setCategoryFilter(c.id)}
              >
                {c.label} ({c.count})
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------ recurring */}
      {recurring.length > 0 && (
        <section>
          <SectionHeading>Keeps coming back</SectionHeading>
          <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
            {recurring.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <span className="min-w-0 truncate text-sm font-medium">{r.name}</span>
                <span className="shrink-0 text-sm text-muted-foreground tnum">
                  {r.count} mistakes
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 px-1 text-xs text-muted-foreground">
            A skill that survives three separate fixes usually means the prerequisite
            underneath it is missing. Go one level lower.
          </p>
        </section>
      )}

      {/* ----------------------------------------------------- the list */}
      <section>
        <SectionHeading>
          {filtered.length} mistake{filtered.length === 1 ? "" : "s"}
        </SectionHeading>
        <ul className="space-y-2.5">
          {filtered.slice(0, 100).map((r) => (
            <MistakeRow
              key={r.answer.id}
              row={r}
              domainName={data.domains.get(r.domainId)?.name ?? r.domainId}
              skillName={r.question.skill_id ? data.skills.get(r.question.skill_id)?.name : undefined}
              reattempt={data.lastReattempt.get(r.question.id)}
            />
          ))}
        </ul>
        {filtered.length > 100 && (
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Showing the first 100. Narrow the filters to see the rest.
          </p>
        )}
      </section>

      {reattemptOpen && (
        <ReattemptSession
          items={filtered}
          onClose={() => setReattemptOpen(false)}
        />
      )}
    </div>
  );
}

function MistakeRow({
  row,
  domainName,
  skillName,
  reattempt,
}: {
  row: EnrichedAnswer;
  domainName: string;
  skillName?: string | undefined;
  reattempt?: { correct: boolean; at: number } | undefined;
}) {
  const cat = row.answer.error_category
    ? ERROR_CATEGORY_BY_ID.get(row.answer.error_category)
    : null;

  return (
    <li className="rounded-xl border border-border bg-surface p-3.5">
      <p className="line-clamp-2 text-sm font-medium leading-snug">{row.question.prompt}</p>

      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
        <span className="rounded-full bg-surface-2 px-2 py-0.5 text-muted-foreground">
          {skillName ?? domainName}
        </span>
        {cat ? (
          <span className="rounded-full bg-brand-soft px-2 py-0.5 font-medium text-brand">
            {cat.label}
          </span>
        ) : (
          <span className="rounded-full bg-warning-soft px-2 py-0.5 font-medium text-warning">
            No cause set
          </span>
        )}
        {reattempt && (
          <span
            className={cn(
              "rounded-full px-2 py-0.5 font-medium",
              reattempt.correct
                ? "bg-success-soft text-success"
                : "bg-danger-soft text-danger",
            )}
          >
            Re-attempt {reattempt.correct ? "correct" : "missed"}
          </span>
        )}
        <span className="text-muted-foreground tnum">{row.answer.seconds_spent}s</span>
      </div>
    </li>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "min-h-[36px] whitespace-nowrap rounded-full border px-3 text-[13px] font-medium transition-colors",
        active
          ? "border-brand bg-brand-soft text-brand"
          : "border-border bg-surface text-muted-foreground",
      )}
    >
      {children}
    </button>
  );
}

/** Kept for the summary line under the chart on Progress. */
export function accuracyLabel(correct: number, total: number): string {
  return total ? formatPercent(correct / total) : "—";
}
