import { useLiveQuery } from "dexie-react-hooks";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Circle, Lightbulb, PlayCircle } from "lucide-react";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CardBlocks, Inline } from "@/features/daily/CardBlocks";
import { ExamChip } from "./ExamChip";
import type { ChapterSection } from "./types";

/**
 * One chapter, read top to bottom: the big picture, then each section with its
 * one-line idea, an optional short video, the explanation, and self-checks.
 * "Mark as understood" is local and drives the progress on the Study tab.
 */
export function ChapterPage() {
  const { chapterId = "" } = useParams();

  const data = useLiveQuery(async () => {
    const chapter = await db.chapters.get(chapterId);
    if (!chapter) return null;
    const [subject, sections, read] = await Promise.all([
      db.subjects.get(chapter.subject_id),
      db.sections.where("chapter_id").equals(chapterId).sortBy("sort_order"),
      db.studyRead.toArray(),
    ]);
    return { chapter, subject, sections, read: new Set(read.map((r) => r.section_id)) };
  }, [chapterId]);

  if (data === undefined) return <Skeleton className="h-96 w-full rounded-xl" />;
  if (data === null) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">That chapter could not be found.</p>
        <Button asChild variant="outline">
          <Link to="/study">Back to Study</Link>
        </Button>
      </div>
    );
  }

  const { chapter, subject, sections, read } = data;
  const done = sections.filter((s) => read.has(s.id)).length;

  return (
    <div className="space-y-6">
      <Link to="/study" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" aria-hidden />
        Study
      </Link>

      <header className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">
          {[subject?.name, chapter.unit].filter(Boolean).join(" · ")}
        </p>
        <h2 className="text-2xl font-semibold leading-tight tracking-tight">{chapter.title}</h2>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <ExamChip date={chapter.exam_date} />
          <span className="text-xs text-muted-foreground tnum">
            {done} of {sections.length} understood
          </span>
        </div>
        {chapter.source && <p className="text-xs text-muted-foreground">Summarizes: {chapter.source}</p>}
      </header>

      {chapter.intro && (
        <section className="rounded-xl border border-brand/30 bg-brand-soft p-4">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-brand">The big picture</p>
          <p className="text-[15px] leading-relaxed">
            <Inline text={chapter.intro} />
          </p>
        </section>
      )}

      <nav aria-label="Sections" className="rounded-xl border border-border bg-surface p-3">
        <p className="mb-1.5 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">In this chapter</p>
        <ol>
          {sections.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="flex items-center gap-2.5 rounded-md px-1 py-1.5 text-sm hover:bg-surface-2"
              >
                {read.has(s.id) ? (
                  <CheckCircle2 className="size-4 shrink-0 text-success" aria-label="Understood" />
                ) : (
                  <Circle className="size-4 shrink-0 text-subtle" aria-hidden />
                )}
                <span className="w-5 shrink-0 text-muted-foreground tnum">{i + 1}.</span>
                <span className="min-w-0">{s.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {sections.map((s, i) => (
        <SectionCard key={s.id} section={s} index={i + 1} understood={read.has(s.id)} />
      ))}
    </div>
  );
}

function SectionCard({
  section: s,
  index,
  understood,
}: {
  section: ChapterSection;
  index: number;
  understood: boolean;
}) {
  const toggle = () =>
    understood ? db.studyRead.delete(s.id) : db.studyRead.put({ section_id: s.id, at: Date.now() });

  return (
    <article id={s.id} className="scroll-mt-20 space-y-4 rounded-xl border border-border bg-surface p-4">
      <header className="space-y-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-brand tnum">Section {index}</span>
          {s.book_ref && (
            <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-muted-foreground">
              Book {s.book_ref}
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold leading-snug">{s.title}</h3>
      </header>

      {s.big_idea && (
        <p className="flex gap-2 rounded-lg bg-brand-soft p-3 text-[15px] font-medium leading-relaxed">
          <Lightbulb className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
          <span>
            <Inline text={s.big_idea} />
          </span>
        </p>
      )}

      {s.videos.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground">Optional — watch first if the idea is new:</p>
          {s.videos.map((v) => (
            <a
              key={v.url}
              href={v.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2 text-sm hover:border-border-strong"
            >
              <PlayCircle className="size-5 shrink-0 text-danger" aria-hidden />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium">{v.title}</span>
                <span className="block text-xs text-muted-foreground">
                  {v.channel}
                  {v.minutes ? ` · ${v.minutes} min` : ""}
                </span>
              </span>
            </a>
          ))}
        </div>
      )}

      <CardBlocks blocks={s.body} variant="reading" />

      {s.checks.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold">Check yourself</p>
          {s.checks.map((c, j) => (
            <details key={j} className="group rounded-lg border border-border bg-background">
              <summary className="cursor-pointer list-none px-3 py-2.5 text-[15px] [&::-webkit-details-marker]:hidden">
                <Inline text={c.q} />
                <span className="ml-1.5 text-xs font-medium text-brand group-open:hidden">Show answer</span>
              </summary>
              <p className="border-t border-border px-3 py-2.5 text-[15px] leading-relaxed text-success">
                <Inline text={c.a} />
              </p>
            </details>
          ))}
        </div>
      )}

      <Button
        variant={understood ? "outline" : "default"}
        className={cn("h-11 w-full", understood && "text-success")}
        onClick={() => void toggle()}
      >
        {understood ? (
          <>
            <CheckCircle2 className="mr-2 size-4" aria-hidden />
            Understood
          </>
        ) : (
          "I understand this"
        )}
      </Button>
    </article>
  );
}
