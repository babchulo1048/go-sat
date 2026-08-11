import { useMemo, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Link } from "react-router-dom";
import { Search, StickyNote, Trash2 } from "lucide-react";
import { db, type LocalNote } from "@/lib/db";
import { deleteNote, listNotes } from "@/lib/repo";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/common";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { Domain, Question, Test } from "@/types/db";

interface Enriched {
  note: LocalNote;
  test?: Test | undefined;
  question?: Question | undefined;
  domain?: Domain | undefined;
}

export function NotesPage() {
  const [query, setQuery] = useState("");
  const [testFilter, setTestFilter] = useState<string>("all");

  const data = useLiveQuery(async () => {
    const notes = await listNotes();
    const [tests, questions, domains, attempts] = await Promise.all([
      db.tests.toArray(),
      db.questions.toArray(),
      db.domains.toArray(),
      db.attempts.toArray(),
    ]);

    const testById = new Map(tests.map((t) => [t.id, t]));
    const questionById = new Map(questions.map((q) => [q.id, q]));
    const domainById = new Map(domains.map((d) => [d.id, d]));
    const testIdByAttempt = new Map(attempts.map((a) => [a.id, a.test_id]));

    const enriched: Enriched[] = notes.map((note) => {
      const question = note.question_id ? questionById.get(note.question_id) : undefined;
      const testId = note.attempt_id ? testIdByAttempt.get(note.attempt_id) : undefined;
      return {
        note,
        test: testId ? testById.get(testId) : undefined,
        question,
        domain: question ? domainById.get(question.domain_id) : undefined,
      };
    });

    const usedTests = [...new Set(enriched.map((e) => e.test?.id).filter(Boolean))].map(
      (id) => testById.get(id as string)!,
    );

    return { enriched, usedTests };
  }, []);

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    return data.enriched.filter((e) => {
      if (testFilter !== "all" && e.test?.id !== testFilter) return false;
      if (!q) return true;
      return (
        e.note.body.toLowerCase().includes(q) ||
        (e.test?.title ?? "").toLowerCase().includes(q) ||
        (e.domain?.name ?? "").toLowerCase().includes(q) ||
        (e.question?.prompt ?? "").toLowerCase().includes(q)
      );
    });
  }, [data, query, testFilter]);

  if (!data) return <Skeleton className="h-64 w-full rounded-xl" />;

  if (!data.enriched.length) {
    return (
      <EmptyState
        icon={<StickyNote className="size-7" aria-hidden />}
        title="No notes yet"
        body="After each test there's a space to write what you found difficult. Those notes gather here, searchable, so patterns become visible over weeks."
        actionLabel="Start practice"
        actionTo="/practice"
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your notes"
          className="h-11 pl-9"
          type="search"
        />
      </div>

      {data.usedTests.length > 1 && (
        <div className="-mx-4 overflow-x-auto px-4">
          <div className="flex w-max gap-2 pb-1">
            <FilterChip active={testFilter === "all"} onClick={() => setTestFilter("all")}>
              All tests
            </FilterChip>
            {data.usedTests.map((t) => (
              <FilterChip
                key={t.id}
                active={testFilter === t.id}
                onClick={() => setTestFilter(t.id)}
              >
                {t.title}
              </FilterChip>
            ))}
          </div>
        </div>
      )}

      {!filtered.length ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No notes match that search.
        </p>
      ) : (
        <ul className="space-y-2.5">
          {filtered.map(({ note, test, question, domain }) => (
            <li key={note.id} className="rounded-xl border border-border bg-surface p-4">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {test?.title ?? "General note"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDateTime(note.updated_at)}
                    {domain ? ` · ${domain.name}` : ""}
                  </p>
                </div>
                <button
                  onClick={() => void deleteNote(note.id)}
                  aria-label="Delete note"
                  className="grid size-9 shrink-0 place-items-center rounded-lg text-muted-foreground hover:text-danger"
                >
                  <Trash2 className="size-4" aria-hidden />
                </button>
              </div>

              {question && (
                <p className="mb-2 line-clamp-2 rounded-lg bg-surface-2 p-2 text-xs text-muted-foreground">
                  {question.prompt}
                </p>
              )}

              <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{note.body}</p>

              {note.attempt_id && (
                <Link
                  to={`/results/${note.attempt_id}`}
                  className="mt-2 inline-block text-xs font-medium text-brand hover:underline"
                >
                  View results
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
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
          : "border-border bg-surface text-muted-foreground",
      )}
    >
      {children}
    </button>
  );
}
