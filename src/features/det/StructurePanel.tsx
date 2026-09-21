import type { StructureStep } from "./types";
import { cn } from "@/lib/utils";

/**
 * The memorisable skeleton for a task. Shown beside the writing box in Learn
 * mode, behind a one-time "peek" in Practice mode, never in Test mode — so the
 * scaffolding comes away as she stops needing it.
 */
export function StructurePanel({
  name,
  steps,
  compact = false,
  className,
}: {
  name: string;
  steps: StructureStep[];
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border border-border bg-surface p-4", className)}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
        Structure · {name}
      </p>
      <ol className="mt-3 space-y-3">
        {steps.map((step, i) => (
          <li key={step.label} className="flex gap-3">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-soft text-xs font-semibold text-brand tnum">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-tight">{step.label}</p>
              {!compact && <p className="mt-0.5 text-xs text-muted-foreground">{step.job}</p>}
              <ul className="mt-1 space-y-0.5">
                {step.starters.map((s) => (
                  <li key={s} className="text-[13px] italic text-foreground/80">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
