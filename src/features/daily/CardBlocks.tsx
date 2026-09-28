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
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

export function CardBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
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
        }
        return <Fragment key={i}>{node}</Fragment>;
      })}
    </div>
  );
}
