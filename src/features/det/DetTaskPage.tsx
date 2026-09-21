import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Check, ChevronDown, Lightbulb, Mic, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";
import { SectionHeading } from "@/components/common";
import { Button } from "@/components/ui/button";
import { getGuide } from "./guides";
import { promptsFor } from "./content";
import { averageSelfScore, criterionAverages, listDetResponses } from "./repo";
import { rubricFor } from "./rubric";
import { StructurePanel } from "./StructurePanel";
import type { DetMode, TaskGuide } from "./types";

const MODES: { value: DetMode; label: string; body: string }[] = [
  { value: "learn", label: "Learn", body: "Structure on screen. The timer is a guide, not a limit." },
  { value: "practice", label: "Practice", body: "Structure hidden — one peek allowed. Real timer." },
  { value: "test", label: "Test", body: "No help. Real timer, auto-submit, exactly like test day." },
];

function formatLimit(seconds: number) {
  if (seconds < 60) return `${seconds} s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s ? `${m} min ${s} s` : `${m} min`;
}

export function DetTaskPage() {
  const { taskId = "" } = useParams();
  const guide = getGuide(taskId);
  const navigate = useNavigate();
  const [mode, setMode] = useState<DetMode>("learn");

  const history = useLiveQuery(
    () => (guide ? listDetResponses(guide.id) : Promise.resolve([])),
    [guide?.id],
  );

  if (!guide) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">That task could not be found.</p>
        <Button asChild variant="outline">
          <Link to="/det">Back</Link>
        </Button>
      </div>
    );
  }

  const prompts = promptsFor(guide.id);
  const done = new Set((history ?? []).map((h) => h.prompt_id));
  const canPractice = guide.modality === "writing";
  const averages = criterionAverages(history ?? []);

  return (
    <div className="space-y-7">
      <Link
        to="/det"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Duolingo
      </Link>

      <header className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">{guide.name}</h2>
        <p className="text-sm text-muted-foreground">{guide.summary}</p>
        {guide.sentToColleges && (
          <p className="inline-flex items-center gap-1.5 rounded-full bg-warning-soft px-2.5 py-1 text-xs font-medium text-warning">
            <Send className="size-3.5" aria-hidden />
            Colleges receive this response
          </p>
        )}
      </header>

      <FormatFacts guide={guide} />

      <section>
        <SectionHeading>What the grader rewards here</SectionHeading>
        <p className="rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed">{guide.focus}</p>
      </section>

      <section>
        <SectionHeading>Your structure</SectionHeading>
        <StructurePanel name={guide.structureName} steps={guide.steps} />
        {guide.part2Steps && (
          <StructurePanel
            className="mt-2.5"
            name="Part 2 — Link · New point · Example · Close"
            steps={guide.part2Steps}
          />
        )}
      </section>

      <section>
        <SectionHeading>Strategies</SectionHeading>
        <ul className="space-y-2 rounded-xl border border-border bg-surface p-4">
          {guide.strategies.map((s) => (
            <li key={s} className="flex gap-2.5 text-sm leading-relaxed">
              <Lightbulb className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionHeading>Mistakes that cost points</SectionHeading>
        <ul className="space-y-2 rounded-xl border border-border bg-surface p-4">
          {guide.mistakes.map((s) => (
            <li key={s} className="flex gap-2.5 text-sm leading-relaxed">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionHeading>Model answers</SectionHeading>
        <div className="space-y-2.5">
          {guide.models.map((m) => (
            <ModelCard key={m.title} model={m} />
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- practice */}
      <section>
        <SectionHeading>Practice</SectionHeading>

        {!canPractice ? (
          <div className="rounded-xl border border-dashed border-border-strong p-5 text-center">
            <Mic className="mx-auto size-6 text-muted-foreground" aria-hidden />
            <p className="mt-2 font-semibold">Speaking practice opens next</p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
              First run the microphone test on the tablet — it tells us whether recording works
              there. Until then, practise this structure aloud using the prompts below.
            </p>
            <Button asChild className="mt-4">
              <Link to="/det/mic">Run the microphone test</Link>
            </Button>
          </div>
        ) : (
          <div className="mb-4 space-y-2">
            <div role="radiogroup" aria-label="Mode" className="grid grid-cols-3 gap-1 rounded-lg bg-surface-2 p-1">
              {MODES.map((m) => (
                <button
                  key={m.value}
                  role="radio"
                  aria-checked={mode === m.value}
                  onClick={() => setMode(m.value)}
                  className={cn(
                    "min-h-[40px] rounded-md text-[13px] font-medium transition-colors",
                    mode === m.value ? "bg-background shadow-[0_1px_2px_rgb(0_0_0/0.06)]" : "text-muted-foreground",
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <p className="px-1 text-xs text-muted-foreground">{MODES.find((m) => m.value === mode)!.body}</p>
          </div>
        )}

        <ul className="space-y-2">
          {prompts.map((p, i) => (
            <li key={p.id}>
              <button
                disabled={!canPractice}
                onClick={() => navigate(`/det/run/${p.id}?mode=${mode}`)}
                className="flex w-full items-start gap-3 rounded-xl border border-border bg-surface p-3.5 text-left transition-colors enabled:hover:border-border-strong disabled:cursor-default"
              >
                <span className="mt-0.5 w-5 shrink-0 text-sm text-muted-foreground tnum">{i + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="line-clamp-2 text-sm">
                    {p.photo_description ? `Photo: ${p.photo_description}` : p.prompt}
                  </span>
                  <span className="mt-1 block text-xs capitalize text-muted-foreground">{p.difficulty}</span>
                </span>
                {done.has(p.id) && <Check className="mt-0.5 size-4 shrink-0 text-success" aria-label="Done" />}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* --------------------------------------------------------- history */}
      {history && history.length > 0 && (
        <section>
          <SectionHeading>Your attempts</SectionHeading>

          {Object.keys(averages).length > 0 && (
            <div className="mb-3 rounded-xl border border-border bg-surface p-4">
              <p className="mb-2 text-xs font-medium text-muted-foreground">Average self-score</p>
              <ul className="space-y-1.5">
                {rubricFor(guide.modality).map((c) => {
                  const v = averages[c.key];
                  if (v == null) return null;
                  return (
                    <li key={c.key} className="flex items-center gap-3 text-sm">
                      <span className="min-w-0 flex-1 truncate">{c.label}</span>
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-surface-2">
                        <div
                          className={cn("h-full rounded-full", v < 2.5 ? "bg-warning" : "bg-success")}
                          style={{ width: `${(v / 4) * 100}%` }}
                        />
                      </div>
                      <span className="w-8 text-right tnum">{v.toFixed(1)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <ul className="space-y-2">
            {history.map((h) => (
              <HistoryRow key={h.id} row={h} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function FormatFacts({ guide }: { guide: TaskGuide }) {
  const unit = guide.modality === "writing" ? "words" : "seconds of speech";
  const facts = [
    ["Appears", guide.appears],
    ["Prep", guide.prepSeconds ? formatLimit(guide.prepSeconds) : "none"],
    [
      "Response",
      guide.part2Seconds
        ? `${formatLimit(guide.responseSeconds)} + ${formatLimit(guide.part2Seconds)}`
        : formatLimit(guide.responseSeconds),
    ],
    ["Aim for", `${guide.targetMin}–${guide.targetMax} ${unit}`],
  ];
  return (
    <dl className="grid grid-cols-2 gap-2.5">
      {facts.map(([k, v]) => (
        <div key={k} className="rounded-xl border border-border bg-surface p-3">
          <dt className="text-[11px] font-medium uppercase tracking-[0.05em] text-muted-foreground">{k}</dt>
          <dd className="mt-0.5 text-sm font-semibold">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function ModelCard({ model }: { model: TaskGuide["models"][number] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border bg-surface">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold">{model.title}</span>
          <span className="mt-0.5 block text-xs text-muted-foreground">{model.prompt}</span>
        </span>
        <ChevronDown className={cn("size-4 shrink-0 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      {open && (
        <div className="space-y-3 border-t border-border p-4">
          <div className="prose-passage whitespace-pre-line text-[15px]">{model.text}</div>
          <ul className="space-y-1.5 rounded-lg bg-surface-2 p-3">
            {model.notes.map((n) => (
              <li key={n.criterion} className="text-xs leading-relaxed">
                <span className="font-semibold">{n.criterion}:</span>{" "}
                <span className="text-muted-foreground">{n.where}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function HistoryRow({ row }: { row: Awaited<ReturnType<typeof listDetResponses>>[number] }) {
  const [open, setOpen] = useState(false);
  const avg = averageSelfScore(row.self_scores);
  return (
    <li className="rounded-xl border border-border bg-surface">
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center gap-3 p-3.5 text-left">
        <span className="min-w-0 flex-1 text-sm">
          {formatDate(row.created_at)} · <span className="capitalize">{row.mode}</span>
          <span className="block text-xs text-muted-foreground tnum">
            {row.metrics?.word_count ?? 0} words
            {row.metrics?.part2_word_count != null ? ` + ${row.metrics.part2_word_count}` : ""}
            {avg != null ? ` · self-score ${avg.toFixed(1)}/4` : ""}
          </span>
        </span>
        <ChevronDown className={cn("size-4 shrink-0 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      {open && (
        <div className="space-y-2 border-t border-border p-3.5 text-sm">
          <p className="whitespace-pre-line leading-relaxed">{row.response_text}</p>
          {row.part2_text && (
            <p className="whitespace-pre-line border-t border-border pt-2 leading-relaxed">{row.part2_text}</p>
          )}
          {row.reflection && <p className="rounded-lg bg-surface-2 p-2.5 text-xs italic">{row.reflection}</p>}
        </div>
      )}
    </li>
  );
}
