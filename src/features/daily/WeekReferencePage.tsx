import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CardBlocks, Inline } from "./CardBlocks";
import { PSDA_CARD, RULES_SHEET } from "./cards";

/** The two sheets she keeps beside her all week: punctuation rules and PSDA. */
export function WeekReferencePage() {
  return (
    <div className="space-y-6">
      <Link
        to="/practice"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Practice
      </Link>

      <header className="space-y-1.5">
        <h2 className="text-2xl font-semibold tracking-tight">Rules sheets</h2>
        <p className="text-sm text-muted-foreground">
          Keep these open beside you. Every Conventions question you miss this month should
          map to one line here.
        </p>
      </header>

      <section className="rounded-xl border border-border bg-surface p-4">
        <h3 className="mb-3 text-base font-semibold">Punctuation and grammar</h3>
        <CardBlocks blocks={RULES_SHEET} />
      </section>

      <section className="rounded-xl border border-border bg-surface p-4">
        <h3 className="mb-3 text-base font-semibold">Problem-Solving and Data — memorize</h3>
        <ol className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          {PSDA_CARD.map((line, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="w-5 shrink-0 text-right font-semibold text-brand tnum">{i + 1}.</span>
              <span className="min-w-0">
                <Inline text={line} />
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
