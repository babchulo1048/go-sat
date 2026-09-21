import { useMemo, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Check, Search } from "lucide-react";
import { db, type VocabProgress } from "@/lib/db";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { VOCAB_FUNCTION_LABEL, VOCABULARY } from "./content";
import { saveVocabSentence, setVocabStatus } from "./repo";
import type { VocabEntry } from "./types";

const DAILY = 5;

export function VocabPage() {
  const [view, setView] = useState<"today" | "all">("today");
  const [fn, setFn] = useState<string>("all");
  const [query, setQuery] = useState("");

  const data = useLiveQuery(async () => {
    const progress = new Map((await db.vocabProgress.toArray()).map((r) => [r.term, r]));
    // How often each word has appeared in her own writing — the real test of learning it.
    const used = new Map<string, number>();
    for (const r of await db.detResponses.toArray()) {
      for (const t of r.metrics?.bank_terms_used ?? []) used.set(t, (used.get(t) ?? 0) + 1);
    }
    return { progress, used };
  }, []);

  const progress = data?.progress ?? new Map<string, VocabProgress>();
  const used = data?.used ?? new Map<string, number>();

  /* Today's five: words she is already learning come first, then new ones, in bank order. */
  const today = useMemo(() => {
    const learning = VOCABULARY.filter((v) => progress.get(v.term)?.status === "learning");
    const fresh = VOCABULARY.filter((v) => !progress.has(v.term) || progress.get(v.term)?.status === "new");
    return [...learning, ...fresh].slice(0, DAILY);
  }, [progress]);

  const knownCount = [...progress.values()].filter((p) => p.status === "known").length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return VOCABULARY.filter((v) => {
      if (fn !== "all" && v.function !== fn) return false;
      if (!q) return true;
      return v.term.toLowerCase().includes(q) || v.meaning.toLowerCase().includes(q);
    });
  }, [fn, query]);

  return (
    <div className="space-y-6">
      <Link to="/det" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" aria-hidden />
        Duolingo
      </Link>

      <header>
        <h2 className="text-2xl font-semibold tracking-tight">Vocabulary</h2>
        <p className="mt-1 text-sm text-muted-foreground tnum">
          {knownCount} of {VOCABULARY.length} known
        </p>
      </header>

      <div className="rounded-xl border border-border bg-surface-2 p-3.5 text-xs leading-relaxed">
        <span className="font-semibold text-foreground">How to learn a word: </span>
        write your own sentence with it, then use it in that day's writing practice. A word you
        have written three times is yours; a word you have read ten times is not. The app counts
        every time one appears in your writing.
      </div>

      <div role="tablist" className="grid grid-cols-2 gap-1 rounded-lg bg-surface-2 p-1">
        {(
          [
            ["today", `Today's ${DAILY}`],
            ["all", "All words"],
          ] as const
        ).map(([v, label]) => (
          <button
            key={v}
            role="tab"
            aria-selected={view === v}
            onClick={() => setView(v)}
            className={cn(
              "min-h-[40px] rounded-md text-[13px] font-medium",
              view === v ? "bg-background shadow-[0_1px_2px_rgb(0_0_0/0.06)]" : "text-muted-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {view === "today" ? (
        today.length ? (
          <ul className="space-y-3">
            {today.map((v) => (
              <li key={v.term}>
                <WordCard entry={v} progress={progress.get(v.term)} usedCount={used.get(v.term) ?? 0} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl border border-border bg-surface p-6 text-center text-sm">
            Every word is marked known. Review them under All words.
          </p>
        )
      ) : (
        <>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search words or meanings" className="h-11 pl-9" type="search" />
          </div>
          <div className="-mx-4 overflow-x-auto px-4">
            <div className="flex w-max gap-2 pb-1">
              <Chip active={fn === "all"} onClick={() => setFn("all")}>All</Chip>
              {Object.entries(VOCAB_FUNCTION_LABEL).map(([k, label]) => (
                <Chip key={k} active={fn === k} onClick={() => setFn(k)}>
                  {label}
                </Chip>
              ))}
            </div>
          </div>
          <SectionHeading>{filtered.length} words</SectionHeading>
          <ul className="space-y-2">
            {filtered.map((v) => (
              <li key={v.term}>
                <CompactWord entry={v} progress={progress.get(v.term)} usedCount={used.get(v.term) ?? 0} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function RegisterBadge({ register }: { register: VocabEntry["register"] }) {
  const map = {
    both: ["Speaking + writing", "bg-surface-2 text-muted-foreground"],
    writing: ["Writing only", "bg-brand-soft text-brand"],
    speaking: ["Speaking", "bg-success-soft text-success"],
  } as const;
  const [label, cls] = map[register];
  return <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium", cls)}>{label}</span>;
}

function WordCard({ entry, progress, usedCount }: { entry: VocabEntry; progress?: VocabProgress; usedCount: number }) {
  const [sentence, setSentence] = useState(progress?.sentence ?? "");
  const status = progress?.status ?? "new";
  return (
    <div className="space-y-3 rounded-xl border border-border bg-surface p-4">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-lg font-semibold">{entry.term}</p>
        <RegisterBadge register={entry.register} />
      </div>
      <p className="text-sm">{entry.meaning}</p>
      <p className="prose-passage text-[15px] italic text-foreground/80">“{entry.example}”</p>
      {entry.note && (
        <p className="flex gap-2 rounded-lg bg-warning-soft p-2.5 text-xs leading-relaxed">
          <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-warning" aria-hidden />
          {entry.note}
        </p>
      )}
      <div>
        <label className="text-xs font-medium text-muted-foreground" htmlFor={`s-${entry.term}`}>
          Your own sentence
        </label>
        <Textarea
          id={`s-${entry.term}`}
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          onBlur={() => sentence.trim() && void saveVocabSentence(entry.term, sentence.trim())}
          rows={2}
          placeholder={`Write a sentence using “${entry.term}”`}
          className="mt-1 text-[15px]"
          spellCheck={false}
        />
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground tnum">
          {usedCount > 0 ? `Used ${usedCount}× in your writing` : "Not yet used in your writing"}
        </span>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={status === "learning" ? "default" : "outline"}
            onClick={() => void setVocabStatus(entry.term, "learning", sentence.trim())}
          >
            Learning
          </Button>
          <Button
            size="sm"
            variant={status === "known" ? "default" : "outline"}
            onClick={() => void setVocabStatus(entry.term, "known", sentence.trim())}
          >
            <Check className="mr-1 size-3.5" aria-hidden />
            Known
          </Button>
        </div>
      </div>
    </div>
  );
}

function CompactWord({ entry, progress, usedCount }: { entry: VocabEntry; progress?: VocabProgress; usedCount: number }) {
  const [open, setOpen] = useState(false);
  const status = progress?.status ?? "new";
  if (open) {
    return (
      <div>
        <WordCard entry={entry} progress={progress} usedCount={usedCount} />
        <button onClick={() => setOpen(false)} className="mt-1 text-xs text-muted-foreground">
          Collapse
        </button>
      </div>
    );
  }
  return (
    <button onClick={() => setOpen(true)} className="flex w-full items-center gap-3 rounded-xl border border-border bg-surface p-3 text-left">
      <span
        className={cn(
          "size-2 shrink-0 rounded-full",
          status === "known" ? "bg-success" : status === "learning" ? "bg-warning" : "bg-border-strong",
        )}
        aria-label={status}
      />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">{entry.term}</span>
        <span className="block truncate text-xs text-muted-foreground">{entry.meaning}</span>
      </span>
      {usedCount > 0 && <span className="shrink-0 text-xs text-success tnum">{usedCount}×</span>}
    </button>
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
