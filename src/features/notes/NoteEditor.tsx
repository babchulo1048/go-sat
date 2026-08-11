import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { getNoteFor, upsertNote } from "@/lib/repo";
import { Textarea } from "@/components/ui/textarea";

/**
 * Autosaving note field. Debounced so it never fights her typing, and it saves
 * on blur and on unmount too — a half-written reflection that vanishes is
 * worse than no field at all.
 */
export function NoteEditor({
  attemptId = null,
  questionId = null,
  placeholder,
  quickChips = [],
  rows = 5,
}: {
  attemptId?: string | null;
  questionId?: string | null;
  placeholder: string;
  quickChips?: string[];
  rows?: number;
}) {
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState(false);
  const [ready, setReady] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latest = useRef("");

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const note = await getNoteFor({ attemptId, questionId });
      if (cancelled) return;
      const body = note?.body ?? "";
      setValue(body);
      latest.current = body;
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [attemptId, questionId]);

  const persist = async (body: string) => {
    await upsertNote({ attemptId, questionId, body });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const onChange = (body: string) => {
    setValue(body);
    latest.current = body;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => void persist(body), 700);
  };

  // Flush whatever is pending when the component goes away.
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      if (ready && latest.current !== undefined) void upsertNote({
        attemptId,
        questionId,
        body: latest.current,
      });
    },
    [attemptId, questionId, ready],
  );

  const addChip = (chip: string) => {
    const prefix = value.trim() ? `${value.replace(/\s+$/, "")}\n` : "";
    onChange(`${prefix}${chip}: `);
  };

  return (
    <div className="space-y-2">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => void persist(latest.current)}
        placeholder={placeholder}
        rows={rows}
        className="resize-y text-[15px] leading-relaxed"
      />

      {quickChips.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {quickChips.map((chip) => (
            <button
              key={chip}
              onClick={() => addChip(chip)}
              className="min-h-[34px] rounded-full border border-border bg-surface px-3 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              + {chip}
            </button>
          ))}
        </div>
      )}

      <p className="h-4 text-xs text-muted-foreground">
        {saved && (
          <span className="inline-flex items-center gap-1">
            <Check className="size-3 text-success" aria-hidden />
            Saved
          </span>
        )}
      </p>
    </div>
  );
}
