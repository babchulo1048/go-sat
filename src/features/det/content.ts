import promptsJson from "./data/prompts.json";
import vocabularyJson from "./data/vocabulary.json";
import drillsJson from "./data/drills.json";
import type { DetPrompt, DetTaskId, Drill, VocabEntry } from "./types";

type RawPrompt = Omit<DetPrompt, "id">;

/**
 * Prompts get a stable id of `${task}-${n}`, numbered in file order per task.
 *
 * Responses reference these ids, so NEVER reorder or delete prompts in
 * prompts.json — only append. Same principle as the content-addressed SAT
 * question ids that made the September database restore possible.
 */
export const PROMPTS: DetPrompt[] = (() => {
  const counters = new Map<string, number>();
  return (promptsJson as RawPrompt[]).map((p) => {
    const n = (counters.get(p.task) ?? 0) + 1;
    counters.set(p.task, n);
    return { ...p, id: `${p.task}-${n}` };
  });
})();

export const PROMPT_BY_ID = new Map(PROMPTS.map((p) => [p.id, p]));

export function promptsFor(task: DetTaskId): DetPrompt[] {
  return PROMPTS.filter((p) => p.task === task);
}

export const VOCABULARY = vocabularyJson as VocabEntry[];
export const DRILLS = drillsJson as Drill[];

export const VOCAB_FUNCTION_LABEL: Record<string, string> = {
  opinion: "Giving an opinion",
  contrast: "Contrast",
  concession: "Concession",
  cause_effect: "Cause and effect",
  example: "Examples",
  emphasis: "Emphasis",
  addition: "Adding a point",
  conclusion: "Concluding",
  hedging: "Careful guesses",
  describing_people: "Describing people",
  describing_scenes: "Describing scenes",
  trends: "Change over time",
  academic_verbs: "Academic verbs",
  evaluation: "Evaluating",
  abstract_nouns: "Abstract nouns",
  thinking_time: "Thinking time (speaking)",
  reporting: "Reporting verbs (summaries)",
};

export const DRILL_PATTERN_LABEL: Record<string, string> = {
  relative_clause: "Relative clause",
  participle_opener: "Participle opener",
  concession_clause: "Concession clause",
  second_conditional: "Second conditional",
  third_conditional: "Third conditional",
  negative_inversion: "Negative inversion",
  cleft_sentence: "Cleft sentence",
  not_only_but_also: "Not only … but also",
  passive_voice: "Passive voice",
  noun_clause_subject: "Noun clause as subject",
  appositive: "Appositive",
};

export const DRILL_PATTERN_TIP: Record<string, string> = {
  relative_clause: "The safest upgrade — usable anywhere.",
  participle_opener: "Stories and photo descriptions.",
  concession_clause: "Your Concession paragraph.",
  second_conditional: "Opinions; “If I were there…” in photo tasks.",
  third_conditional: "Personal stories.",
  negative_inversion: "Once per essay at most — used twice it reads as a template.",
  cleft_sentence: "Conclusions.",
  not_only_but_also: "Reasons. Keep both halves parallel.",
  passive_voice: "Processes, or when the doer is unknown.",
  noun_clause_subject: "Conclusions.",
  appositive: "Introducing a person or place.",
};
