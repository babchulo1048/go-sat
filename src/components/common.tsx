import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { formatPercent } from "@/lib/format";
import { Button } from "@/components/ui/button";

export function SectionHeading({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-3">
      <h2 className="text-[13px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
        {children}
      </h2>
      {action}
    </div>
  );
}

export function StatTile({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: "default" | "brand";
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <p className="text-[11px] font-medium uppercase tracking-[0.05em] text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-2xl font-semibold tnum",
          tone === "brand" && "text-brand",
        )}
      >
        {value}
      </p>
      {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function EmptyState({
  title,
  body,
  actionLabel,
  actionTo,
  icon,
}: {
  title: string;
  body: string;
  actionLabel?: string;
  actionTo?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed border-border-strong px-6 py-10 text-center">
      {icon && <div className="mb-3 flex justify-center text-muted-foreground">{icon}</div>}
      <h3 className="font-semibold">{title}</h3>
      <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">{body}</p>
      {actionLabel && actionTo && (
        <Button asChild className="mt-4">
          <Link to={actionTo}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
}

export interface DomainBarDatum {
  id: string;
  name: string;
  correct: number;
  total: number;
  accuracy: number;
}

/**
 * Accuracy by domain, weakest first — the single view that should answer
 * "what do I study next?" without any thought. Colour encodes urgency rather
 * than decorating: red below 50%, amber below 75%, green above.
 */
export function DomainAccuracyBars({
  data,
  emptyLabel = "No data yet.",
}: {
  data: DomainBarDatum[];
  emptyLabel?: string;
}) {
  if (!data.length) {
    return <p className="text-sm text-muted-foreground">{emptyLabel}</p>;
  }

  return (
    <ul className="space-y-3">
      {data.map((d) => {
        const pct = Math.round(d.accuracy * 100);
        const tone =
          d.accuracy < 0.5 ? "bg-danger" : d.accuracy < 0.75 ? "bg-warning" : "bg-success";
        return (
          <li key={d.id}>
            <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
              <span className="truncate font-medium">{d.name}</span>
              <span className="shrink-0 text-muted-foreground tnum">
                {d.correct}/{d.total} · {formatPercent(d.accuracy)}
              </span>
            </div>
            <div
              className="h-2 overflow-hidden rounded-full bg-surface-2"
              role="img"
              aria-label={`${d.name}: ${pct} percent accuracy`}
            >
              <div
                className={cn("h-full rounded-full transition-all", tone)}
                style={{ width: `${Math.max(pct, 2)}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Circular daily-goal ring. Small, quiet, no gamification beyond this. */
export function GoalRing({
  done,
  goal,
  size = 56,
}: {
  done: number;
  goal: number;
  size?: number;
}) {
  const pct = goal > 0 ? Math.min(done / goal, 1) : 0;
  const stroke = 5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  return (
    <svg width={size} height={size} role="img" aria-label={`${done} of ${goal} questions today`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--surface-2)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--brand)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 400ms ease-out" }}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        className="fill-foreground text-[13px] font-semibold tnum"
      >
        {done}
      </text>
    </svg>
  );
}
