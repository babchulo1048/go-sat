import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

/** "Exam Tue 13 Oct · in 2 days" — amber when close, hidden once it has passed. */
export function ExamChip({ date }: { date: string | null }) {
  if (!date) return null;
  const [y, m, d] = date.split("-").map(Number);
  const exam = new Date(y!, m! - 1, d!);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.round((exam.getTime() - today.getTime()) / 86_400_000);
  if (days < 0) return null;

  const label = exam.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
  const when = days === 0 ? "today" : days === 1 ? "tomorrow" : `in ${days} days`;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        days <= 3 ? "bg-warning-soft text-warning" : "bg-surface-2 text-muted-foreground",
      )}
    >
      <CalendarDays className="size-3.5" aria-hidden />
      Exam {label} · {when}
    </span>
  );
}
