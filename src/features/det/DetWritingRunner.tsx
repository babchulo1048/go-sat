import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Check, ChevronDown, Eye, ImageIcon, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatClock } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PROMPT_BY_ID, promptsFor, VOCABULARY } from "./content";
import { getGuide } from "./guides";
import { computeMetrics, wordCount } from "./metrics";
import { saveDetResponse } from "./repo";
import { rubricFor, SCALE } from "./rubric";
import { StructurePanel } from "./StructurePanel";
import type { DetMetrics, DetMode, DetPrompt, SelfScores, TaskGuide } from "./types";

type Phase = "brief" | "prep" | "write" | "write2" | "review" | "saved";

interface Draft {
  phase: Phase;
  text: string;
  part2: string;
  deadline: number | null; // epoch ms, same approach as the SAT runner
  writeStartedAt: number | null;
  savedAt: number;
}

const DRAFT_TTL_MS = 30 * 60 * 1000;
const draftKey = (promptId: string, mode: DetMode) => `det.draft.${promptId}.${mode}`;

function loadDraft(key: string): Draft | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const d = JSON.parse(raw) as Draft;
    return Date.now() - d.savedAt < DRAFT_TTL_MS ? d : null;
  } catch {
    return null;
  }
}

export function DetWritingRunner() {
  const { promptId = "" } = useParams();
  const [search] = useSearchParams();
  const mode = (["learn", "practice", "test"].includes(search.get("mode") ?? "")
    ? search.get("mode")
    : "learn") as DetMode;

  const prompt = PROMPT_BY_ID.get(promptId);
  const guide = prompt ? getGuide(prompt.task) : undefined;

  if (!prompt || !guide || guide.modality !== "writing") {
    return (
      <div className="mx-auto max-w-3xl space-y-4 p-6">
        <p className="text-sm text-muted-foreground">That practice prompt could not be found.</p>
        <Button asChild variant="outline">
          <Link to="/det">Back to Duolingo</Link>
        </Button>
      </div>
    );
  }
  return <Runner key={`${promptId}-${mode}`} prompt={prompt} guide={guide} mode={mode} />;
}

function Runner({ prompt, guide, mode }: { prompt: DetPrompt; guide: TaskGuide; mode: DetMode }) {
  const navigate = useNavigate();
  const key = draftKey(prompt.id, mode);
  const initial = useMemo(() => loadDraft(key), [key]);

  const [phase, setPhase] = useState<Phase>(initial?.phase ?? "brief");
  const [text, setText] = useState(initial?.text ?? "");
  const [part2, setPart2] = useState(initial?.part2 ?? "");
  const [deadline, setDeadline] = useState<number | null>(initial?.deadline ?? null);
  const [writeStartedAt, setWriteStartedAt] = useState<number | null>(initial?.writeStartedAt ?? null);
  const [phaseStartedAt, setPhaseStartedAt] = useState<number>(Date.now());
  const [now, setNow] = useState(Date.now());

  const [peekUsed, setPeekUsed] = useState(false);
  const [peekOpen, setPeekOpen] = useState(false);
  const [showConversation, setShowConversation] = useState(false);

  const [metrics, setMetrics] = useState<DetMetrics | null>(null);
  const [scores, setScores] = useState<SelfScores>({});
  const [reflection, setReflection] = useState("");
  const [saving, setSaving] = useState(false);

  const textRef = useRef<HTMLTextAreaElement>(null);
  const isInteractive = guide.id === "interactive_writing";
  const isSummary = guide.id === "summarize_conversation";
  const isPhoto = guide.id === "write_about_photo";

  /* ------------------------------------------------ persist the draft */
  useEffect(() => {
    if (phase === "saved") {
      localStorage.removeItem(key);
      return;
    }
    if (phase === "brief") return;
    const d: Draft = { phase, text, part2, deadline, writeStartedAt, savedAt: Date.now() };
    try {
      localStorage.setItem(key, JSON.stringify(d));
    } catch {
      /* storage full or blocked — the timer and text still work in memory */
    }
  }, [key, phase, text, part2, deadline, writeStartedAt]);

  /* --------------------------------------------------------- ticking */
  useEffect(() => {
    if (!["prep", "write", "write2"].includes(phase)) return;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [phase]);

  const remaining = deadline === null ? null : Math.max(0, Math.ceil((deadline - now) / 1000));
  const elapsedInPhase = Math.max(0, Math.floor((now - phaseStartedAt) / 1000));

  /* ------------------------------------------------------ transitions */
  const startWrite = useCallback(() => {
    const t = Date.now();
    setPhase("write");
    setPhaseStartedAt(t);
    setWriteStartedAt(t);
    setDeadline(t + guide.responseSeconds * 1000);
    setTimeout(() => textRef.current?.focus(), 50);
  }, [guide.responseSeconds]);

  const begin = () => {
    if (guide.prepSeconds > 0) {
      const t = Date.now();
      setPhase("prep");
      setPhaseStartedAt(t);
      setDeadline(t + guide.prepSeconds * 1000);
    } else {
      startWrite();
    }
  };

  const toReview = useCallback(
    (finalPart2: string | null) => {
      const secondsUsed = writeStartedAt ? (Date.now() - writeStartedAt) / 1000 : 0;
      setMetrics(computeMetrics({ text, part2: finalPart2, secondsUsed, bank: VOCABULARY }));
      setPhase("review");
      setDeadline(null);
      window.scrollTo({ top: 0 });
    },
    [text, writeStartedAt],
  );

  const finishPart1 = useCallback(() => {
    if (isInteractive) {
      const t = Date.now();
      setPhase("write2");
      setPhaseStartedAt(t);
      setDeadline(t + (guide.part2Seconds ?? 180) * 1000);
      setPeekUsed(false);
      setPeekOpen(false);
      window.scrollTo({ top: 0 });
    } else {
      toReview(null);
    }
  }, [isInteractive, guide.part2Seconds, toReview]);

  /* Timer expiry. Learn mode never auto-submits — the clock is advisory. */
  useEffect(() => {
    if (remaining !== 0) return;
    if (phase === "prep") startWrite();
    else if (mode !== "learn" && phase === "write") finishPart1();
    else if (mode !== "learn" && phase === "write2") toReview(part2);
  }, [remaining, phase, mode, startWrite, finishPart1, toReview, part2]);

  /* ----------------------------------------------------------- render */
  const exit = () => {
    if ((text || part2) && phase !== "saved" && !window.confirm("Leave this practice? Your draft is kept for 30 minutes.")) return;
    navigate(`/det/task/${guide.id}`);
  };

  const minLocked =
    mode === "test" && phase === "write" && elapsedInPhase < guide.minSubmitSeconds;

  return (
    <div className="min-h-dvh bg-background">
      <header className="pt-safe sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center gap-2 px-3">
          <button
            onClick={exit}
            aria-label="Exit"
            className="grid size-10 shrink-0 place-items-center rounded-lg text-muted-foreground hover:text-foreground"
          >
            <X className="size-5" aria-hidden />
          </button>
          <div className="min-w-0 flex-1 text-center">
            <p className="truncate text-[13px] font-semibold leading-tight">{guide.name}</p>
            <p className="text-xs capitalize text-muted-foreground">
              {mode} mode
              {phase === "prep" ? (isSummary ? " · reading" : " · preparing") : ""}
              {phase === "write2" ? " · part 2" : ""}
            </p>
          </div>
          <TimerBadge phase={phase} remaining={remaining} mode={mode} />
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 pt-5 pb-32">
        {phase === "brief" && <Brief guide={guide} mode={mode} onStart={begin} />}

        {phase === "prep" && (
          <div className="mx-auto max-w-2xl space-y-5">
            <PromptBlock prompt={prompt} guide={guide} showConversation />
            <Button className="h-11 w-full" onClick={startWrite}>
              {isSummary ? "I've read it — start writing" : "Start writing now"}
            </Button>
          </div>
        )}

        {(phase === "write" || phase === "write2") && (
          <div className={cn("grid gap-5", mode === "learn" && "md:grid-cols-[1fr_300px]")}>
            <div className="min-w-0 space-y-4">
              {phase === "write" ? (
                <PromptBlock
                  prompt={prompt}
                  guide={guide}
                  showConversation={isSummary && (mode === "learn" && showConversation)}
                />
              ) : (
                <div className="rounded-xl border border-brand/40 bg-brand-soft p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-brand">Follow-up</p>
                  <p className="prose-passage mt-1 font-medium">{prompt.follow_up}</p>
                </div>
              )}

              {isSummary && phase === "write" && mode === "learn" && (
                <button
                  onClick={() => setShowConversation((s) => !s)}
                  className="text-xs font-medium text-brand underline underline-offset-2"
                >
                  {showConversation ? "Hide the conversation" : "Show the conversation (Learn mode only)"}
                </button>
              )}

              {/* Practice mode: one peek at the structure. */}
              {mode === "practice" && (
                <div>
                  {!peekUsed || peekOpen ? (
                    <button
                      onClick={() => {
                        if (peekOpen) setPeekOpen(false);
                        else {
                          setPeekOpen(true);
                          setPeekUsed(true);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-brand"
                    >
                      <Eye className="size-3.5" aria-hidden />
                      {peekOpen ? "Hide structure (peek used)" : "Peek at the structure — once"}
                    </button>
                  ) : (
                    <p className="text-xs text-muted-foreground">Peek used.</p>
                  )}
                  {peekOpen && (
                    <StructurePanel
                      compact
                      className="mt-2"
                      name={guide.structureName}
                      steps={phase === "write2" && guide.part2Steps ? guide.part2Steps : guide.steps}
                    />
                  )}
                </div>
              )}

              <Textarea
                ref={textRef}
                value={phase === "write" ? text : part2}
                onChange={(e) => (phase === "write" ? setText(e.target.value) : setPart2(e.target.value))}
                // The real test has no spellcheck. Autocorrect would silently fix
                // exactly the errors she needs to see.
                spellCheck={false}
                autoCorrect="off"
                autoCapitalize="off"
                autoComplete="off"
                data-gramm="false"
                rows={isPhoto || isSummary ? 6 : 12}
                placeholder="Start writing…"
                className="prose-passage min-h-[180px] resize-y text-[16px] leading-relaxed"
                aria-label="Your response"
              />

              <WordMeter
                count={wordCount(phase === "write" ? text : part2)}
                min={phase === "write" ? guide.targetMin : guide.part2TargetMin ?? guide.targetMin}
                max={phase === "write" ? guide.targetMax : guide.part2TargetMax ?? guide.targetMax}
              />
            </div>

            {mode === "learn" && (
              <aside className="md:sticky md:top-20 md:self-start">
                <StructurePanel
                  name={guide.structureName}
                  steps={phase === "write2" && guide.part2Steps ? guide.part2Steps : guide.steps}
                />
              </aside>
            )}
          </div>
        )}

        {phase === "review" && metrics && (
          <Review
            guide={guide}
            text={text}
            part2={isInteractive ? part2 : null}
            metrics={metrics}
            scores={scores}
            setScores={setScores}
            reflection={reflection}
            setReflection={setReflection}
          />
        )}

        {phase === "saved" && <Saved prompt={prompt} guide={guide} mode={mode} />}
      </main>

      {/* ---------------------------------------------------- bottom bar */}
      {(phase === "write" || phase === "write2" || phase === "review") && (
        <div className="pb-safe fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur-sm">
          <div className="mx-auto flex w-full max-w-5xl items-center gap-2 px-3 py-2.5">
            {phase === "write" && (
              <Button className="h-11 flex-1" disabled={minLocked} onClick={finishPart1}>
                {minLocked
                  ? `Submit available in ${formatClock(guide.minSubmitSeconds - elapsedInPhase)}`
                  : isInteractive
                    ? "Submit part 1"
                    : "Submit"}
              </Button>
            )}
            {phase === "write2" && (
              <Button className="h-11 flex-1" onClick={() => toReview(part2)}>
                Submit part 2
              </Button>
            )}
            {phase === "review" && (
              <>
                <Button
                  variant="outline"
                  className="h-11"
                  disabled={saving}
                  onClick={async () => {
                    setSaving(true);
                    await saveDetResponse({ taskId: guide.id, promptId: prompt.id, mode, text, part2: isInteractive ? part2 : null, metrics: metrics!, selfScores: {}, reflection });
                    setPhase("saved");
                  }}
                >
                  Skip scoring
                </Button>
                <Button
                  className="h-11 flex-1"
                  disabled={saving || Object.keys(scores).length < rubricFor("writing").length}
                  onClick={async () => {
                    setSaving(true);
                    await saveDetResponse({ taskId: guide.id, promptId: prompt.id, mode, text, part2: isInteractive ? part2 : null, metrics: metrics!, selfScores: scores, reflection });
                    toast("Saved", { description: "Your response and scores are recorded." });
                    setPhase("saved");
                  }}
                >
                  {Object.keys(scores).length < rubricFor("writing").length
                    ? `Score all ${rubricFor("writing").length} to save`
                    : "Save"}
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================ parts */

function TimerBadge({ phase, remaining, mode }: { phase: Phase; remaining: number | null; mode: DetMode }) {
  if (remaining === null || !["prep", "write", "write2"].includes(phase)) return <span className="w-[76px]" />;
  const low = remaining <= 15;
  const over = mode === "learn" && remaining === 0 && phase !== "prep";
  return (
    <span
      className={cn(
        "inline-flex h-10 min-w-[76px] items-center justify-center rounded-lg px-2 text-sm font-semibold tnum",
        over ? "bg-surface-2 text-muted-foreground" : low ? "bg-warning-soft text-warning" : "text-foreground",
      )}
      aria-live="off"
    >
      {over ? "time up" : formatClock(remaining)}
    </span>
  );
}

function Brief({ guide, mode, onStart }: { guide: TaskGuide; mode: DetMode; onStart: () => void }) {
  const rule =
    mode === "learn"
      ? "The structure stays on screen. The timer shows the real limit but will not stop you."
      : mode === "practice"
        ? "The structure is hidden — you can peek once. When time runs out, your answer is submitted."
        : "No help. When time runs out, your answer is submitted — exactly like test day.";
  return (
    <div className="mx-auto max-w-xl space-y-5 text-center">
      <h2 className="text-2xl font-semibold tracking-tight">{guide.name}</h2>
      <p className="text-sm text-muted-foreground">{guide.summary}</p>
      <div className="rounded-xl border border-border bg-surface p-4 text-left text-sm leading-relaxed">
        <p>
          <span className="font-semibold capitalize">{mode} mode.</span> {rule}
        </p>
        <p className="mt-2 text-muted-foreground">
          Spellcheck is off, as on the real test. Aim for {guide.targetMin}–{guide.targetMax} words.
        </p>
      </div>
      <Button size="lg" className="h-12 w-full text-base" onClick={onStart}>
        {guide.prepSeconds > 0
          ? guide.id === "summarize_conversation"
            ? `Start — ${guide.prepSeconds} s to read`
            : `Start — ${guide.prepSeconds} s to prepare`
          : "Start — the timer begins immediately"}
      </Button>
    </div>
  );
}

function PromptBlock({
  prompt,
  guide,
  showConversation,
}: {
  prompt: DetPrompt;
  guide: TaskGuide;
  showConversation: boolean;
}) {
  if (guide.id === "write_about_photo") {
    return (
      <div className="rounded-xl border border-border bg-surface p-4">
        <div className="flex items-start gap-3">
          <ImageIcon className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
          <div>
            <p className="prose-passage">{prompt.photo_description}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Picture this scene and describe it. Real photos are being added — for now, don't
              reuse the words above; find your own.
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (guide.id === "summarize_conversation") {
    return (
      <div className="space-y-3">
        <p className="prose-passage font-medium">{prompt.prompt}</p>
        {showConversation && prompt.conversation && (
          <ol className="space-y-2 rounded-xl border border-border bg-surface p-4">
            {prompt.conversation.map((line, i) => (
              <li key={i} className="text-[15px] leading-relaxed">
                <span className="font-semibold">{line.speaker}:</span> {line.text}
              </li>
            ))}
          </ol>
        )}
      </div>
    );
  }
  return <p className="prose-passage rounded-xl border border-border bg-surface p-4 font-medium">{prompt.prompt}</p>;
}

function WordMeter({ count, min, max }: { count: number; min: number; max: number }) {
  const pct = Math.min(100, (count / max) * 100);
  const tone = count < min ? "bg-warning" : count <= max ? "bg-success" : "bg-brand";
  const label =
    count < min ? `${min - count} to go` : count <= max ? "In range" : "Above range — fine if it's accurate";
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between text-xs">
        <span className="font-semibold tnum">{count} words</span>
        <span className="text-muted-foreground">
          target {min}–{max} · {label}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
        <div className={cn("h-full rounded-full transition-all", tone)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Review({
  guide,
  text,
  part2,
  metrics,
  scores,
  setScores,
  reflection,
  setReflection,
}: {
  guide: TaskGuide;
  text: string;
  part2: string | null;
  metrics: DetMetrics;
  scores: SelfScores;
  setScores: (s: SelfScores) => void;
  reflection: string;
  setReflection: (s: string) => void;
}) {
  const [modelOpen, setModelOpen] = useState(false);
  const rubric = rubricFor("writing");
  const inRange = metrics.word_count >= guide.targetMin;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h2 className="text-xl font-semibold tracking-tight">Review your answer</h2>

      <div className="space-y-2 rounded-xl border border-border bg-surface p-4">
        <p className="prose-passage whitespace-pre-line text-[15px]">{text || <em>No text written.</em>}</p>
        {part2 !== null && (
          <p className="prose-passage whitespace-pre-line border-t border-border pt-2 text-[15px]">
            {part2 || <em>No part 2 written.</em>}
          </p>
        )}
      </div>

      <section>
        <h3 className="mb-2 text-sm font-semibold">Measured</h3>
        <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          <Stat label="Words" value={`${metrics.word_count}${metrics.part2_word_count != null ? ` + ${metrics.part2_word_count}` : ""}`} hint={`target ${guide.targetMin}–${guide.targetMax}`} warn={!inRange} />
          <Stat label="Words / minute" value={String(metrics.wpm)} />
          <Stat label="Sentences" value={String(metrics.sentences)} hint={`avg ${metrics.avg_sentence_length} words`} />
          <Stat label="Different words" value={`${Math.round(metrics.distinct_word_ratio * 100)}%`} hint="of all words" />
          <Stat label="Connectors" value={String(metrics.connectors.length)} hint="distinct" warn={metrics.connectors.length < 2 && !["write_about_photo", "summarize_conversation"].includes(guide.id)} />
          <Stat label="Bank words" value={String(metrics.bank_terms_used.length)} hint="from your vocabulary" />
        </dl>
        {(metrics.connectors.length > 0 || metrics.bank_terms_used.length > 0) && (
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {metrics.connectors.length > 0 && <>Connectors: {metrics.connectors.join(", ")}. </>}
            {metrics.bank_terms_used.length > 0 && <>Vocabulary used: {metrics.bank_terms_used.join(", ")}.</>}
          </p>
        )}
        <p className="mt-2 text-xs text-muted-foreground">
          These measure length and range only. Quality is judged in the scoring below.
        </p>
      </section>

      <section className="rounded-xl border border-border bg-surface">
        <button onClick={() => setModelOpen((o) => !o)} aria-expanded={modelOpen} className="flex w-full items-center gap-3 p-4 text-left">
          <span className="flex-1 text-sm font-semibold">Compare with the model answer</span>
          <ChevronDown className={cn("size-4 transition-transform", modelOpen && "rotate-180")} aria-hidden />
        </button>
        {modelOpen && guide.models[0] && (
          <div className="space-y-2 border-t border-border p-4">
            <p className="text-xs text-muted-foreground">{guide.models[0].prompt}</p>
            <p className="prose-passage whitespace-pre-line text-[15px]">{guide.models[0].text}</p>
          </div>
        )}
      </section>

      <section>
        <h3 className="text-sm font-semibold">Score yourself honestly</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Same criteria the Duolingo grader uses. The trend matters, not any single score.
        </p>
        <ul className="mt-3 space-y-3">
          {rubric.map((c) => (
            <li key={c.key} className="rounded-xl border border-border bg-surface p-3.5">
              <p className="text-sm font-semibold">{c.label}</p>
              <p className="text-xs text-muted-foreground">{c.question}</p>
              <div role="radiogroup" aria-label={c.label} className="mt-2.5 grid grid-cols-4 gap-1.5">
                {SCALE.map((s) => {
                  const active = scores[c.key] === s.value;
                  return (
                    <button
                      key={s.value}
                      role="radio"
                      aria-checked={active}
                      onClick={() => setScores({ ...scores, [c.key]: s.value })}
                      className={cn(
                        "flex min-h-[48px] flex-col items-center justify-center rounded-lg border text-xs transition-colors",
                        active ? "border-brand bg-brand-soft text-brand" : "border-border bg-background text-muted-foreground",
                      )}
                    >
                      <span className="text-sm font-semibold tnum">{s.value}</span>
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <label htmlFor="reflection" className="text-sm font-semibold">
          What will you do differently next time?
        </label>
        <Textarea
          id="reflection"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          rows={3}
          placeholder="One specific thing. e.g. “Plan the concession before I start.”"
          className="mt-2 text-[15px]"
        />
      </section>
    </div>
  );
}

function Stat({ label, value, hint, warn }: { label: string; value: string; hint?: string; warn?: boolean }) {
  return (
    <div className={cn("rounded-xl border p-3", warn ? "border-warning/40 bg-warning-soft" : "border-border bg-surface")}>
      <dt className="text-[11px] font-medium uppercase tracking-[0.05em] text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-lg font-semibold tnum">{value}</dd>
      {hint && <dd className="text-[11px] text-muted-foreground">{hint}</dd>}
    </div>
  );
}

function Saved({ prompt, guide, mode }: { prompt: DetPrompt; guide: TaskGuide; mode: DetMode }) {
  const list = promptsFor(guide.id);
  const next = list[(list.findIndex((p) => p.id === prompt.id) + 1) % list.length];
  return (
    <div className="mx-auto max-w-md space-y-5 py-10 text-center">
      <Check className="mx-auto size-10 text-success" aria-hidden />
      <h2 className="text-2xl font-semibold tracking-tight">Saved</h2>
      <p className="text-sm text-muted-foreground">
        One practice done. Attempts and self-scores build up on the task page.
      </p>
      <div className="space-y-2.5">
        {next && (
          <Button asChild size="lg" className="h-12 w-full">
            <Link to={`/det/run/${next.id}?mode=${mode}`} replace>
              Next prompt
            </Link>
          </Button>
        )}
        <Button asChild variant="outline" className="h-11 w-full">
          <Link to={`/det/task/${guide.id}`}>Back to {guide.name}</Link>
        </Button>
      </div>
    </div>
  );
}
