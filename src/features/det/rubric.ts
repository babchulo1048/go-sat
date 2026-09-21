import type { Modality, RubricKey } from "./types";

/**
 * Self-assessment criteria, written in the words of the official DET scoring
 * criteria (content, coherence, lexis, grammar, fluency, pronunciation).
 */
export interface Criterion {
  key: RubricKey;
  label: string;
  question: string;
}

export const WRITING_RUBRIC: Criterion[] = [
  { key: "answered", label: "Answered the question", question: "Did every sentence serve this exact prompt?" },
  { key: "developed", label: "Developed with examples", question: "Did each point have a reason and a concrete example?" },
  { key: "structure", label: "Clear structure", question: "Paragraphs, a clear order, and varied connectors?" },
  { key: "vocabulary", label: "Vocabulary range", question: "Precise words, no repeats of good / bad / important?" },
  { key: "variety", label: "Sentence variety", question: "At least one planned complex sentence, written correctly?" },
  { key: "accuracy", label: "Accuracy", question: "Verb endings, articles, spelling, punctuation?" },
];

export const SPEAKING_RUBRIC: Criterion[] = [
  { key: "answered", label: "Answered the question", question: "Did you stay on this exact prompt?" },
  { key: "developed", label: "Developed with examples", question: "A reason and a real example for each point?" },
  { key: "vocabulary", label: "Vocabulary range", question: "Precise words, little repetition?" },
  { key: "structure", label: "Fluency", question: "Steady pace, few fillers, no restarting sentences?" },
  { key: "accuracy", label: "Clear pronunciation", question: "Would a stranger understand every word?" },
  { key: "variety", label: "Used the time", question: "Were you still speaking near the target length?" },
];

export function rubricFor(modality: Modality): Criterion[] {
  return modality === "writing" ? WRITING_RUBRIC : SPEAKING_RUBRIC;
}

export const SCALE: { value: 1 | 2 | 3 | 4; label: string }[] = [
  { value: 1, label: "Not yet" },
  { value: 2, label: "Partly" },
  { value: 3, label: "Mostly" },
  { value: 4, label: "Fully" },
];
