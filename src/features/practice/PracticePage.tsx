import { useMemo, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Link } from "react-router-dom";
import { ChevronRight, Clock, ListChecks } from "lucide-react";
import { db } from "@/lib/db";
import { getTests } from "@/lib/repo";
import { formatDuration, formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";
import { EmptyState, SectionHeading } from "@/components/common";
import { Skeleton } from "@/components/ui/skeleton";
import type { Domain, Section, Test } from "@/types/db";

type SectionFilter = "all" | Section;

interface TestCardData {
  test: Test;
  questionCount: number;
  durationSeconds: number;
  best: number | null; // scaled total for mocks
  lastAccuracy: number | null; // for drills
  attemptCount: number;
}

export function PracticePage() {
  const [sectionFilter, setSectionFilter] = useState<SectionFilter>("all");
  const [domainFilter, setDomainFilter] = useState<string>("all");

  const data = useLiveQuery(async () => {
    const [tests, parts, domains, attempts, answers] = await Promise.all([
      getTests(),
      db.parts.toArray(),
      db.domains.toArray(),
      db.attempts.toArray(),
      db.answers.toArray(),
    ]);

    const questionCounts = new Map<string, number>();
    for (const q of await db.questions.toArray()) {
      questionCounts.set(q.part_id, (questionCounts.get(q.part_id) ?? 0) + 1);
    }

    const answersByAttempt = new Map<string, { correct: number; total: number }>();
    for (const a of answers) {
      const cur = answersByAttempt.get(a.attempt_id) ?? { correct: 0, total: 0 };
      cur.total += 1;
      if (a.is_correct) cur.correct += 1;
      answersByAttempt.set(a.attempt_id, cur);
    }

    const cards: TestCardData[] = tests.map((test) => {
      const testParts = parts.filter((p) => p.test_id === test.id);
      const questionCount = testParts.reduce(
        (n, p) => n + (questionCounts.get(p.id) ?? 0),
        0,
      );
      const durationSeconds = testParts.reduce((n, p) => n + p.duration_seconds, 0);

      const done = attempts.filter(
        (a) => a.test_id === test.id && a.status === "completed",
      );
      const best = done.reduce<number | null>(
        (acc, a) =>
          a.scaled_total !== null && (acc === null || a.scaled_total > acc)
            ? a.scaled_total
            : acc,
        null,
      );

      const latest = done.sort((a, b) =>
        (b.completed_at ?? "").localeCompare(a.completed_at ?? ""),
      )[0];
      const latestCounts = latest ? answersByAttempt.get(latest.id) : undefined;

      return {
        test,
        questionCount,
        durationSeconds,
        best,
        lastAccuracy:
          latestCounts && latestCounts.total
            ? latestCounts.correct / latestCounts.total
            : null,
        attemptCount: done.length,
      };
    });

    return { cards, domains };
  }, []);

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.cards.filter(({ test }) => {
      if (sectionFilter !== "all") {
        const matches =
          test.section_scope === sectionFilter || test.section_scope === "both";
        if (!matches) return false;
      }
      if (domainFilter !== "all" && test.focus_domain_id !== domainFilter) return false;
      return true;
    });
  }, [data, sectionFilter, domainFilter]);

  if (!data) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-9 w-full rounded-lg" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
    );
  }

  const mocks = filtered.filter((c) => c.test.test_type === "full_mock");
  const focused = filtered.filter((c) => c.test.test_type !== "full_mock");
  const rwFocused = focused.filter((c) => c.test.section_scope === "rw");
  const mathFocused = focused.filter((c) => c.test.section_scope === "math");
  const otherFocused = focused.filter(
    (c) => c.test.section_scope !== "rw" && c.test.section_scope !== "math",
  );

  return (
    <div className="space-y-7">
      <Filters
        domains={data.domains}
        section={sectionFilter}
        onSection={setSectionFilter}
        domain={domainFilter}
        onDomain={setDomainFilter}
      />

      {!filtered.length && (
        <EmptyState
          title="Nothing matches those filters"
          body="Try widening the section or domain filter."
        />
      )}

      {mocks.length > 0 && (
        <section>
          <SectionHeading>Full mock tests</SectionHeading>
          <div className="space-y-2.5">
            {mocks.map((c) => (
              <TestCard key={c.test.id} data={c} />
            ))}
          </div>
        </section>
      )}

      {focused.length > 0 && (
        <section>
          <SectionHeading>Focused practice</SectionHeading>
          <div className="space-y-5">
            <SubGroup title="Reading and Writing" cards={rwFocused} />
            <SubGroup title="Math" cards={mathFocused} />
            <SubGroup title="Mixed" cards={otherFocused} />
          </div>
        </section>
      )}
    </div>
  );
}

function SubGroup({ title, cards }: { title: string; cards: TestCardData[] }) {
  if (!cards.length) return null;
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">{title}</h3>
      <div className="space-y-2.5">
        {cards.map((c) => (
          <TestCard key={c.test.id} data={c} />
        ))}
      </div>
    </div>
  );
}

function TestCard({ data }: { data: TestCardData }) {
  const { test, questionCount, durationSeconds, best, lastAccuracy, attemptCount } = data;

  return (
    <Link
      to={`/practice/${test.id}`}
      className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong"
    >
      <div className="min-w-0 flex-1">
        <p className="font-semibold leading-snug">{test.title}</p>
        {test.subtitle && (
          <p className="mt-0.5 truncate text-sm text-muted-foreground">{test.subtitle}</p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 tnum">
            <ListChecks className="size-3.5" aria-hidden />
            {questionCount} questions
          </span>
          <span className="inline-flex items-center gap-1 tnum">
            <Clock className="size-3.5" aria-hidden />
            {formatDuration(durationSeconds)}
          </span>
          {attemptCount > 0 && (
            <span className="tnum">
              {best !== null
                ? `Best: ${best}`
                : lastAccuracy !== null
                  ? `Last: ${formatPercent(lastAccuracy)}`
                  : null}
            </span>
          )}
        </div>
      </div>
      <ChevronRight className="size-5 shrink-0 text-muted-foreground" aria-hidden />
    </Link>
  );
}

function Filters({
  domains,
  section,
  onSection,
  domain,
  onDomain,
}: {
  domains: Domain[];
  section: SectionFilter;
  onSection: (s: SectionFilter) => void;
  domain: string;
  onDomain: (d: string) => void;
}) {
  const visibleDomains = domains
    .filter((d) => section === "all" || d.section === section)
    .sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="space-y-3">
      <div
        role="tablist"
        aria-label="Filter by section"
        className="flex gap-1 rounded-lg bg-surface-2 p-1"
      >
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
            aria-selected={section === value}
            onClick={() => {
              onSection(value);
              onDomain("all");
            }}
            className={cn(
              "min-h-[38px] flex-1 rounded-md px-2 text-[13px] font-medium transition-colors",
              section === value
                ? "bg-background text-foreground shadow-[0_1px_2px_rgb(0_0_0/0.06)]"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="-mx-4 overflow-x-auto px-4">
        <div className="flex w-max gap-2 pb-1">
          <FilterChip active={domain === "all"} onClick={() => onDomain("all")}>
            All topics
          </FilterChip>
          {visibleDomains.map((d) => (
            <FilterChip
              key={d.id}
              active={domain === d.id}
              onClick={() => onDomain(d.id)}
            >
              {d.name}
            </FilterChip>
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterChip({
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
          : "border-border bg-surface text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
