import type { Question } from "@/types/db";

/**
 * Pure answer checking — no database, no side effects, so it can be tested
 * directly. Kept separate from scoring.ts for exactly that reason.
 */

/** Parse "13/5", "2.6", ".5", "-3", "1,200" into a number. Null if not numeric. */
export function toNumber(raw: string): number | null {
  const s = raw.trim().replace(/\s+/g, "").replace(/,/g, "");
  if (!s) return null;

  const fraction = /^(-?\d+)\/(-?\d+)$/.exec(s);
  if (fraction) {
    const denom = Number(fraction[2]);
    if (denom === 0) return null;
    return Number(fraction[1]) / denom;
  }

  if (!/^-?(\d+\.?\d*|\.\d+)$/.test(s)) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function normaliseText(raw: string): string {
  return raw.trim().replace(/\s+/g, "").replace(/,/g, "").toLowerCase();
}

/**
 * Student-produced responses accept any equivalent form: 13/5, 2.6 and 2.60
 * are the same answer. Numeric comparison is the primary route, with a
 * relative tolerance so a correctly truncated or rounded entry (the real test
 * asks for the answer to fill the entry field) still counts.
 */
export function checkAnswer(question: Question, selected: string | null): boolean {
  if (selected === null || selected.trim() === "") return false;

  if (question.question_type === "mc") {
    return (
      selected.trim().toUpperCase() === question.correct_answer.trim().toUpperCase()
    );
  }

  const candidates = [question.correct_answer, ...(question.accepted_answers ?? [])];

  const given = normaliseText(selected);
  if (candidates.some((c) => normaliseText(c) === given)) return true;

  const givenNum = toNumber(selected);
  if (givenNum === null) return false;

  return candidates.some((c) => {
    const n = toNumber(c);
    if (n === null) return false;
    if (n === givenNum) return true;
    const tolerance = Math.max(Math.abs(n) * 1e-3, 1e-6);
    return Math.abs(n - givenNum) <= tolerance;
  });
}
