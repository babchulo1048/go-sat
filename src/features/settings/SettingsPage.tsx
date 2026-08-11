import { useState } from "react";
import { Download, Moon, Sun, SunMoon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { db } from "@/lib/db";
import { resetAllProgress } from "@/lib/repo";
import { loadEnrichedAnswers } from "@/lib/stats";
import { useSettings } from "@/hooks/useSettings";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ERROR_CATEGORY_BY_ID } from "@/types/db";
import type { ThemeMode } from "@/lib/settings";
import type { LucideIcon } from "lucide-react";

interface ThemeOption {
  value: ThemeMode;
  label: string;
  icon: LucideIcon;
}

function download(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const THEMES: ThemeOption[] = [
  { value: "system", label: "System", icon: SunMoon },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
];

export function SettingsPage() {
  const { settings, update } = useSettings();
  const [resetOpen, setResetOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const exportJson = async () => {
    const [attempts, answers, notes, reattempts] = await Promise.all([
      db.attempts.toArray(),
      db.answers.toArray(),
      db.notes.toArray(),
      db.reattempts.toArray(),
    ]);
    download(
      `sat-practice-export-${new Date().toISOString().slice(0, 10)}.json`,
      JSON.stringify({ exportedAt: new Date().toISOString(), attempts, answers, notes, reattempts }, null, 2),
      "application/json",
    );
    toast("Exported", { description: "Your data has been downloaded." });
  };

  const exportCsv = async () => {
    const rows = await loadEnrichedAnswers();
    const wrong = rows.filter((r) => !r.answer.is_correct);
    const domains = await db.domains.toArray();
    const domainName = new Map(domains.map((d) => [d.id, d.name]));

    const header = [
      "date",
      "section",
      "domain",
      "difficulty",
      "prompt",
      "your_answer",
      "correct_answer",
      "seconds",
      "error_category",
    ];
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;

    const lines = [
      header.join(","),
      ...wrong.map((r) =>
        [
          r.answeredAt ? new Date(r.answeredAt).toISOString() : "",
          r.section,
          domainName.get(r.domainId) ?? r.domainId,
          r.question.difficulty,
          r.question.prompt,
          r.answer.selected ?? "(blank)",
          r.question.correct_answer,
          r.answer.seconds_spent,
          r.answer.error_category
            ? ERROR_CATEGORY_BY_ID.get(r.answer.error_category)?.label
            : "",
        ]
          .map(esc)
          .join(","),
      ),
    ];

    download(
      `sat-mistakes-${new Date().toISOString().slice(0, 10)}.csv`,
      lines.join("\n"),
      "text/csv",
    );
    toast("Exported", { description: `${wrong.length} mistakes written to CSV.` });
  };

  return (
    <div className="space-y-8">
      {/* ------------------------------------------------------- appearance */}
      <section>
        <SectionHeading>Appearance</SectionHeading>
        <div className="flex gap-1 rounded-lg bg-surface-2 p-1">
          {THEMES.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => update({ theme: value })}
              aria-pressed={settings.theme === value}
              className={cn(
                "flex min-h-[42px] flex-1 items-center justify-center gap-1.5 rounded-md text-[13px] font-medium transition-colors",
                settings.theme === value
                  ? "bg-background shadow-[0_1px_2px_rgb(0_0_0/0.06)]"
                  : "text-muted-foreground",
              )}
            >
              <Icon className="size-4" aria-hidden />
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------- practice */}
      <section className="space-y-4">
        <SectionHeading>Practice</SectionHeading>

        <div className="rounded-xl border border-border bg-surface p-4">
          <Label htmlFor="goal" className="text-sm font-medium">
            Daily question goal
          </Label>
          <div className="mt-2 flex items-center gap-3">
            <Input
              id="goal"
              type="number"
              min={5}
              max={100}
              step={5}
              value={settings.dailyGoal}
              onChange={(e) =>
                update({ dailyGoal: Math.max(1, Number(e.target.value) || 20) })
              }
              className="h-11 w-24 tnum"
            />
            <p className="text-xs text-muted-foreground">
              20–30 with proper review beats 60 skimmed.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface p-4">
          <div className="min-w-0">
            <Label htmlFor="timer" className="text-sm font-medium">
              Show timer by default
            </Label>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Off is recommended — a visible countdown raises anxiety, and you still get
              the 5-minute warning.
            </p>
          </div>
          <Switch
            id="timer"
            checked={settings.timerVisibleByDefault}
            onCheckedChange={(v) => update({ timerVisibleByDefault: v })}
          />
        </div>
      </section>

      {/* ---------------------------------------------------------- data */}
      <section className="space-y-2.5">
        <SectionHeading>Your data</SectionHeading>
        <Button variant="outline" className="h-11 w-full justify-start" onClick={() => void exportJson()}>
          <Download className="mr-2 size-4" aria-hidden />
          Export everything as JSON
        </Button>
        <Button variant="outline" className="h-11 w-full justify-start" onClick={() => void exportCsv()}>
          <Download className="mr-2 size-4" aria-hidden />
          Export mistakes as CSV
        </Button>
        <p className="px-1 text-xs text-muted-foreground">
          Your data is never trapped in this app. The CSV opens directly in Google
          Sheets if you'd rather work with the mistake log there.
        </p>
      </section>

      {/* ------------------------------------------------------ danger zone */}
      <section>
        <SectionHeading>Danger zone</SectionHeading>
        <Button
          variant="outline"
          className="h-11 w-full justify-start border-danger/40 text-danger hover:bg-danger-soft hover:text-danger"
          onClick={() => {
            setConfirmText("");
            setResetOpen(true);
          }}
        >
          <Trash2 className="mr-2 size-4" aria-hidden />
          Reset all my progress
        </Button>
      </section>

      <p className="pb-2 text-center text-xs text-muted-foreground">
        Scores in this app are estimates. Only College Board's Bluebook gives a real one.
      </p>

      <AlertDialog open={resetOpen} onOpenChange={setResetOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset all progress?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes every attempt, answer, mistake and note on this
              device. Questions stay. This cannot be undone — export first if you're
              unsure.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-2">
            <Label htmlFor="confirm" className="text-sm">
              Type <span className="font-semibold">RESET</span> to confirm
            </Label>
            <Input
              id="confirm"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              autoComplete="off"
              className="h-11"
            />
          </div>

          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={confirmText !== "RESET"}
              onClick={async () => {
                await resetAllProgress();
                setResetOpen(false);
                toast("Progress reset", { description: "Everything has been cleared." });
              }}
            >
              Delete everything
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
