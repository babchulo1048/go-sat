import { Fragment, type ReactNode } from "react";
import type { Block } from "./cards";

/** Renders **bold**, *italic* and `code` inside card text. No nesting. */
export function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**"))
          return (
            <strong key={i} className="font-semibold text-foreground">
              {p.slice(2, -2)}
            </strong>
          );
        if (p.startsWith("`") && p.endsWith("`"))
          return (
            <code key={i} className="rounded bg-surface-2 px-1 py-px font-mono text-[0.95em] text-foreground">
              {p.slice(1, -1)}
            </code>
          );
        if (p.length > 2 && p.startsWith("*") && p.endsWith("*"))
          return <em key={i}>{p.slice(1, -1)}</em>;
        return <Fragment key={i}>{withSubscripts(p)}</Fragment>;
      })}
    </>
  );
}

/**
 * "card" is the compact teaching-card look; "reading" is for study notes:
 * larger, full-contrast text she reads for several minutes at a time.
 */
/**
 * Chemistry notation: "E_final", "Z_eff", "d_{x²−y²}" → real subscripts.
 * Only an underscore directly after a letter/symbol counts, so ordinary text
 * (which never contains "_") is untouched.
 */
function withSubscripts(text: string) {
  if (!text.includes("_")) return text;
  const parts = text.split(/_\{([^}]+)\}|_([A-Za-z0-9]+)/g);
  const out: ReactNode[] = [];
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) out.push(parts[i]);
    const sub = parts[i + 1] ?? parts[i + 2];
    if (sub) out.push(<sub key={i}>{sub}</sub>);
  }
  return out;
}

export function CardBlocks({ blocks, variant = "card" }: { blocks: Block[]; variant?: "card" | "reading" }) {
  return (
    <div
      className={
        variant === "reading"
          ? "space-y-4 text-[15px] leading-relaxed text-foreground/90"
          : "space-y-3 text-sm leading-relaxed text-muted-foreground"
      }
    >
      {blocks.map((b, i) => {
        let node: ReactNode;
        switch (b.kind) {
          case "heading":
            node = <h4 className="pt-1 text-sm font-semibold text-foreground">{b.text}</h4>;
            break;
          case "p":
            node = (
              <p>
                <Inline text={b.text} />
              </p>
            );
            break;
          case "steps":
            node = (
              <ol className="space-y-2">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-2.5">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-soft text-[11px] font-semibold text-brand tnum">
                      {j + 1}
                    </span>
                    <span className="min-w-0">
                      <Inline text={item} />
                    </span>
                  </li>
                ))}
              </ol>
            );
            break;
          case "bullets":
            node = (
              <ul className="space-y-1.5">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-2">
                    <span aria-hidden className="text-brand">
                      •
                    </span>
                    <span className="min-w-0">
                      <Inline text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
            break;
          case "rows":
            /* Stacked rows rather than a table: four columns do not fit a phone. */
            node = (
              <div className="space-y-2">
                {b.rows.map((r, j) => (
                  <div key={j} className="rounded-lg border border-border bg-background p-3 text-[13px]">
                    <p className="text-foreground">
                      <span className="text-muted-foreground">Left: </span>
                      <Inline text={r.left} />
                      <span className="text-muted-foreground"> · Right: </span>
                      <Inline text={r.right} />
                    </p>
                    <p className="mt-1.5">
                      <span className="font-medium text-success">Use </span>
                      <Inline text={r.use} />
                    </p>
                    <p className="mt-0.5">
                      <span className="font-medium text-danger">Never </span>
                      <Inline text={r.never} />
                    </p>
                  </div>
                ))}
              </div>
            );
            break;
          case "formula":
            node = (
              <div className="rounded-lg border border-border bg-surface-2 px-4 py-3 text-center">
                <p className="font-serif text-[17px] font-medium text-foreground">
                  <Inline text={b.text} />
                </p>
                {b.note && <p className="mt-1 text-xs text-muted-foreground">{b.note}</p>}
              </div>
            );
            break;
          case "table":
            /* Wraps to fit a phone; overflow-x is only a last resort for very wide tables. */
            node = (
              <div className="-mx-1 overflow-x-auto px-1">
                <table className="w-full border-collapse text-[13px] leading-snug">
                  <thead>
                    <tr>
                      {b.head.map((h, j) => (
                        <th key={j} className="border-b border-border-strong bg-surface-2 px-2 py-2 text-left font-semibold text-foreground">
                          <Inline text={h} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className="border-b border-border">
                        {r.map((c, k) => (
                          <td key={k} className={k === 0 ? "px-2 py-2 font-medium text-foreground" : "px-2 py-2"}>
                            <Inline text={c} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
            break;
          case "callout": {
            const tone = {
              idea: { box: "border-brand/30 bg-brand-soft", label: "text-brand", fallback: "Key idea" },
              warn: { box: "border-warning/40 bg-warning-soft", label: "text-warning", fallback: "Careful" },
              book: { box: "border-border bg-surface-2", label: "text-muted-foreground", fallback: "About your notes" },
            }[b.tone];
            node = (
              <div className={`rounded-lg border p-3.5 ${tone.box}`}>
                <p className={`mb-1 text-xs font-semibold uppercase tracking-wide ${tone.label}`}>{b.title ?? tone.fallback}</p>
                <p className="text-foreground/90">
                  <Inline text={b.text} />
                </p>
              </div>
            );
            break;
          }
          case "example":
            node = (
              <div className="rounded-lg border border-border bg-background p-3.5">
                <p className="mb-2 font-semibold text-foreground">
                  <Inline text={b.title} />
                </p>
                <ol className="space-y-1.5">
                  {b.steps.map((s, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="w-4 shrink-0 text-right text-muted-foreground tnum">{j + 1}.</span>
                      <span className="min-w-0">
                        <Inline text={s} />
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="mt-2.5 rounded-md bg-success-soft px-2.5 py-1.5 font-medium text-success">
                  <Inline text={b.answer} />
                </p>
              </div>
            );
            break;
        }
        return <Fragment key={i}>{node}</Fragment>;
      })}
    </div>
  );
}
