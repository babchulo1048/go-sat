import { useLiveQuery } from "dexie-react-hooks";
import { Link } from "react-router-dom";
import { BookA, ChevronRight, Mic, PenLine, Repeat, Send } from "lucide-react";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/common";
import { GUIDE_BY_ID, PRACTICE_ORDER } from "./guides";
import { VOCABULARY } from "./content";
import { averageSelfScore } from "./repo";

export function DetHome() {
  const stats = useLiveQuery(async () => {
    const rows = await db.detResponses.toArray();
    const byTask = new Map<string, { n: number; avg: number | null }>();
    for (const r of rows) {
      const cur = byTask.get(r.task_id) ?? { n: 0, avg: null };
      const a = averageSelfScore(r.self_scores);
      cur.avg = a === null ? cur.avg : cur.avg === null ? a : (cur.avg * cur.n + a) / (cur.n + 1);
      cur.n += 1;
      byTask.set(r.task_id, cur);
    }
    const known = await db.vocabProgress.where("status").equals("known").count();
    const drills = await db.drillAttempts.count();
    return { byTask, known, drills };
  }, []);

  return (
    <div className="space-y-7">
      <header>
        <h2 className="text-2xl font-semibold tracking-tight">Duolingo English Test</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Practice for the open-response questions — the ones graded on content, coherence,
          vocabulary, grammar, fluency and pronunciation.
        </p>
      </header>

      <section className="rounded-xl border border-brand/40 bg-brand-soft p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-brand">Target</p>
        <p className="mt-1 text-lg font-semibold">135–140 overall · no subscore below 130</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Writing is the subscore to lift first. Measure progress with Duolingo's free official
          practice test — retake the real test only after it shows 130+ on two separate days.
        </p>
      </section>

      <section>
        <SectionHeading>Tasks, in practice order</SectionHeading>
        <ul className="space-y-2.5">
          {PRACTICE_ORDER.map((id) => {
            const g = GUIDE_BY_ID.get(id)!;
            const s = stats?.byTask.get(id);
            const Icon = g.modality === "writing" ? PenLine : Mic;
            return (
              <li key={id}>
                <Link
                  to={`/det/task/${id}`}
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong"
                >
                  <Icon
                    className={cn(
                      "size-5 shrink-0",
                      g.modality === "writing" ? "text-brand" : "text-muted-foreground",
                    )}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold leading-snug">
                      {g.name}
                      {g.sentToColleges && (
                        <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-warning-soft px-2 py-0.5 align-middle text-[11px] font-medium text-warning">
                          <Send className="size-3" aria-hidden />
                          sent to colleges
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {g.modality === "writing" ? "Writing" : "Speaking — guide now, practice next"}
                      {s ? ` · ${s.n} attempt${s.n === 1 ? "" : "s"}` : ""}
                      {s?.avg != null ? ` · self-score ${s.avg.toFixed(1)}/4` : ""}
                    </p>
                  </div>
                  <ChevronRight className="size-5 shrink-0 text-muted-foreground" aria-hidden />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <SectionHeading>Every day, 10 minutes</SectionHeading>
        <div className="grid gap-2.5 sm:grid-cols-2">
          <ToolCard
            to="/det/vocab"
            icon={<BookA className="size-5 text-brand" aria-hidden />}
            title="Vocabulary"
            body={`${stats?.known ?? 0} of ${VOCABULARY.length} known · five new words a day`}
          />
          <ToolCard
            to="/det/drills"
            icon={<Repeat className="size-5 text-brand" aria-hidden />}
            title="Sentence variety"
            body={`${stats?.drills ?? 0} drills done · rewrite plain sentences into advanced patterns`}
          />
        </div>
      </section>

      <section>
        <SectionHeading>Before speaking practice</SectionHeading>
        <ToolCard
          to="/det/mic"
          icon={<Mic className="size-5 text-warning" aria-hidden />}
          title="Microphone test"
          body="Run this once on the school tablet. It tells us whether speaking practice can work there."
        />
      </section>
    </div>
  );
}

function ToolCard({
  to,
  icon,
  title,
  body,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong"
    >
      {icon}
      <div className="min-w-0 flex-1">
        <p className="font-semibold">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{body}</p>
      </div>
      <ChevronRight className="size-5 shrink-0 text-muted-foreground" aria-hidden />
    </Link>
  );
}
