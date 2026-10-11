import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Link } from "react-router-dom";
import { ChevronRight, GraduationCap } from "lucide-react";
import { db } from "@/lib/db";
import { syncStudyQuietly } from "@/lib/content";
import { EmptyState } from "@/components/common";
import { Skeleton } from "@/components/ui/skeleton";
import { ExamChip } from "./ExamChip";

/** Subjects → chapters, each with how many sections she has marked understood. */
export function StudyHome() {
  const [checked, setChecked] = useState(false);

  // First visit after an update: notes may not be cached yet, so pull them now.
  useEffect(() => {
    void (async () => {
      if ((await db.sections.count()) === 0) await syncStudyQuietly();
      setChecked(true);
    })();
  }, []);

  const data = useLiveQuery(async () => {
    const [subjects, chapters, sections, read] = await Promise.all([
      db.subjects.orderBy("sort_order").toArray(),
      db.chapters.orderBy("sort_order").toArray(),
      db.sections.toArray(),
      db.studyRead.toArray(),
    ]);
    const readIds = new Set(read.map((r) => r.section_id));
    return subjects.map((s) => ({
      subject: s,
      chapters: chapters
        .filter((c) => c.subject_id === s.id)
        .map((c) => {
          const own = sections.filter((x) => x.chapter_id === c.id);
          return { chapter: c, total: own.length, done: own.filter((x) => readIds.has(x.id)).length };
        }),
    }));
  }, []);

  if (!data) return <Skeleton className="h-64 w-full rounded-xl" />;

  return (
    <div className="space-y-6">
      <p className="text-sm leading-relaxed text-muted-foreground">
        Concept notes for your school subjects. Read a chapter here <strong className="text-foreground">first</strong>,
        then read your own book notes — these explain the <em>why</em>, so the book makes sense instead of needing to be
        memorized.
      </p>

      {data.length === 0 &&
        (checked ? (
          <EmptyState
            title="No notes yet"
            body="Notes appear here once they're added. Open the app with internet on to download them."
          />
        ) : (
          <Skeleton className="h-32 w-full rounded-xl" />
        ))}

      {data.map(({ subject, chapters }) => (
        <section key={subject.id} className="space-y-2.5">
          <h2 className="flex items-center gap-2 text-base font-semibold">
            <GraduationCap className="size-4 text-brand" aria-hidden />
            {subject.name}
            {subject.grade && <span className="text-sm font-normal text-muted-foreground">· {subject.grade}</span>}
          </h2>

          {chapters.map(({ chapter, total, done }) => (
            <Link
              key={chapter.id}
              to={`/study/${chapter.id}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong"
            >
              <div className="min-w-0 flex-1 space-y-1.5">
                {chapter.unit && <p className="text-xs font-medium text-muted-foreground">{chapter.unit}</p>}
                <p className="font-semibold leading-snug">{chapter.title}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <ExamChip date={chapter.exam_date} />
                  <span className="text-xs text-muted-foreground tnum">
                    {done} of {total} understood
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                  <div
                    className="h-full rounded-full bg-success transition-all"
                    style={{ width: `${total ? (done / total) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <ChevronRight className="size-5 shrink-0 text-muted-foreground" aria-hidden />
            </Link>
          ))}
        </section>
      ))}
    </div>
  );
}
