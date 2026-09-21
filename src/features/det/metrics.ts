import type { DetMetrics, VocabEntry } from "./types";

/**
 * Objective writing metrics. Everything here is computed on the device — no AI,
 * no network. They are proxies, not scores: the DET grader judges quality, and
 * these only measure the things quality tends to need (length, range, variety).
 */

const WORD_RE = /[A-Za-z]+(?:['’-][A-Za-z]+)*/g;

export function words(text: string): string[] {
  return text.match(WORD_RE) ?? [];
}

export function wordCount(text: string): number {
  return words(text).length;
}

/** Discourse markers counted for "connector variety". Distinct ones matter, not totals. */
const CONNECTORS = [
  "however", "moreover", "furthermore", "in addition", "therefore", "consequently",
  "as a result", "for instance", "for example", "admittedly", "although", "even though",
  "despite", "in spite of", "nevertheless", "nonetheless", "on the other hand", "in contrast",
  "whereas", "while", "in short", "in conclusion", "to sum up", "overall", "ultimately",
  "all things considered", "besides", "what is more", "that said", "in fact", "indeed",
  "thus", "hence", "similarly", "likewise", "meanwhile", "first", "finally", "above all",
  "on balance", "to illustrate", "a case in point", "granted", "on top of that",
];

function escape(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasPhrase(haystack: string, phrase: string): boolean {
  const re = new RegExp(`(^|[^a-z])${escape(phrase).replace(/\s+/g, "\\s+")}([^a-z]|$)`, "i");
  return re.test(haystack);
}

/**
 * Turn a vocabulary term into the phrase(s) that must all appear.
 * "not only ... but also" → ["not only", "but also"]
 * "agreed to / agreed that" → either alternative
 * Fragments of 3 letters or fewer ("to") are dropped — they match everything.
 */
function termAlternatives(term: string): string[][] {
  return term.split(" / ").map((alt) =>
    alt
      .split(/\.{3}|…/)
      .map((part) => part.replace(/[,]/g, " ").trim())
      .filter((part) => part.length > 3),
  );
}

export function bankTermsUsed(text: string, bank: VocabEntry[]): string[] {
  const found: string[] = [];
  for (const entry of bank) {
    const alts = termAlternatives(entry.term);
    if (alts.some((parts) => parts.length > 0 && parts.every((p) => hasPhrase(text, p)))) {
      found.push(entry.term);
    }
  }
  return found;
}

export function computeMetrics(params: {
  text: string;
  part2?: string | null;
  secondsUsed: number;
  bank: VocabEntry[];
}): DetMetrics {
  const { text, part2 = null, secondsUsed, bank } = params;
  const all = part2 ? `${text}\n${part2}` : text;

  const ws = words(all);
  const wc = words(text).length;
  const sentences = all
    .split(/[.!?]+(?:\s|$)/)
    .map((s) => s.trim())
    .filter((s) => words(s).length > 0);

  const distinct = new Set(ws.map((w) => w.toLowerCase()));

  return {
    word_count: wc,
    ...(part2 !== null ? { part2_word_count: words(part2).length } : {}),
    seconds_used: Math.round(secondsUsed),
    wpm: secondsUsed > 0 ? Math.round((ws.length / secondsUsed) * 60) : 0,
    sentences: sentences.length,
    avg_sentence_length: sentences.length ? Math.round((ws.length / sentences.length) * 10) / 10 : 0,
    distinct_word_ratio: ws.length ? Math.round((distinct.size / ws.length) * 100) / 100 : 0,
    connectors: CONNECTORS.filter((c) => hasPhrase(all, c)),
    bank_terms_used: bankTermsUsed(all, bank),
  };
}
