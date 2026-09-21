import { useMemo, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Link } from "react-router-dom";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DRILL_PATTERN_LABEL, DRILL_PATTERN_TIP, DRILLS } from "./content";
import { drillStats, recordDrill } from "./repo";

/**
 * Sentence variety: rewrite a plain sentence into an advanced pattern, then
 * compare with a model. Raises "grammatical complexity" — but the rule that
 * protects her score is one planned pattern per paragraph, not more.
 */
export function DrillsPage() {
  const [pattern, setPattern] = useState<string>("all");
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);

  const stats = useLiveQuery(() => drillStats(), []);
  const list = useMemo(() => (pattern === "all" ? DRILLS : DRILLS.filter((d) => d.pattern === pattern)), [pattern]);
  const drill = list[index % list.length]!;

  const next = async (correct: boolean) => {
    await recordDrill(drill.pattern, drill.plain, answer.trim(), correct);
    setAnswer("");
    setRevealed(false);
    setIndex((i) => i + 1);
  };

  return (
    <div className="space-y-6">
      <Link to="/det" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" aria-hidden />
        Duolingo
      </Link>

      <header>
        <h2 className="text-2xl font-semibold tracking-tight">Sentence variety</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Rewrite the plain sentence into the pattern. One planned pattern per paragraph earns
          grammar points; an ambitious one with an error loses them.
        </p>
      </header>

      <div className="-mx-4 overflow-x-auto px-4">
        <div className="flex w-max gap-2 pb-1">
          <Chip active={pattern === "all"} onClick={() => { setPattern("all"); setIndex(0); setRevealed(false); }}>
            All
          </Chip>
          {Object.entries(DRILL_PATTERN_LABEL).map(([k, label]) => {
            const s = stats?.get(k);
            return (
              <Chip key={k} active={pattern === k} onClick={() => { setPattern(k); setIndex(0); setRevealed(false); setAnswer(""); }}>
                {label}
                {s ? <span className="ml-1 opacity-70 tnum">{s.correct}/{s.done}</span> : null}
              </Chip>
            );
          })}
        </div>
      </div>

      <section className="space-y-4 rounded-xl border border-border bg-surface p-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-brand">
            {DRILL_PATTERN_LABEL[drill.pattern]}
          </p>
          <p className="text-xs text-muted-foreground tnum">
            {(index % list.length) + 1} / {list.length}
          </p>
        </div>

        <p className="flex gap-2 text-xs text-muted-foreground">
          <Lightbulb className="size-3.5 shrink-0 text-brand" aria-hidden />
          Best used in: {DRILL_PATTERN_TIP[drill.pattern]}
        </p>

        <div>
          <p className="text-xs font-medium text-muted-foreground">Plain sentence</p>
          <p className="prose-passage mt-1 text-[16px]">{drill.plain}</p>
        </div>

        <Textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={3}
          placeholder="Your rewrite"
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          className="prose-passage text-[16px]"
          disabled={revealed}
        />

        {!revealed ? (
          <Button className="h-11 w-full" onClick={() => setRevealed(true)} disabled={!answer.trim()}>
            Check against the model
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="rounded-lg bg-success-soft p-3">
              <p className="text-xs font-medium text-success">Model</p>
              <p className="prose-passage mt-1 text-[16px]">{drill.model}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Yours doesn't need to match word for word — is it the same pattern, and correct?
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-11" onClick={() => void next(false)}>
                Not yet
              </Button>
              <Button className="h-11" onClick={() => void next(true)}>
                Got it
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "min-h-[36px] whitespace-nowrap rounded-full border px-3 text-[13px] font-medium transition-colors",
        active ? "border-brand bg-brand-soft text-brand" : "border-border bg-surface text-muted-foreground",
      )}
    >
      {children}
    </button>
  );
}
