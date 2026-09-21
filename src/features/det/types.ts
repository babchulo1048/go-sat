/**
 * Duolingo English Test practice — shared types.
 *
 * Content (tasks, prompts, vocabulary, drills) is bundled with the app rather
 * than stored in Supabase: it is static, and bundling makes it work offline on
 * the first load with no seeding. Only her responses are persisted and synced.
 */

export type DetTaskId =
  | "write_about_photo"
  | "interactive_writing"
  | "writing_sample"
  | "summarize_conversation"
  | "speak_about_photo"
  | "read_then_speak"
  | "interactive_speaking"
  | "speaking_sample";

export type Modality = "writing" | "speaking";

/**
 * learn    — structure visible, timer advisory, never auto-submits
 * practice — structure hidden with one peek, real timer, auto-submits
 * test     — no structure, real timer, auto-submits, minimum time enforced
 */
export type DetMode = "learn" | "practice" | "test";

export interface StructureStep {
  label: string;
  job: string;
  starters: string[];
}

export interface CriterionNote {
  criterion: string;
  where: string;
}

export interface ModelAnswer {
  title: string;
  prompt: string;
  text: string;
  notes: CriterionNote[];
}

export interface TaskGuide {
  id: DetTaskId;
  name: string;
  modality: Modality;
  appears: string;
  /** Seconds before the response starts. For Summarize, this is reading time. */
  prepSeconds: number;
  responseSeconds: number;
  /** Interactive Writing's follow-up part. */
  part2Seconds?: number;
  /** Earliest submit in Test mode. */
  minSubmitSeconds: number;
  /** Words for writing tasks, seconds of speech for speaking tasks. */
  targetMin: number;
  targetMax: number;
  part2TargetMin?: number;
  part2TargetMax?: number;
  sentToColleges: boolean;
  summary: string;
  focus: string;
  structureName: string;
  steps: StructureStep[];
  part2Steps?: StructureStep[];
  strategies: string[];
  mistakes: string[];
  models: ModelAnswer[];
}

export interface ConversationLine {
  speaker: string;
  text: string;
}

export interface DetPrompt {
  /** Stable id: `${task}-${n}` — never renumber, responses reference it. */
  id: string;
  task: DetTaskId;
  prompt: string;
  photo_description: string | null;
  difficulty: "easy" | "medium" | "hard";
  follow_up?: string;
  bullets?: string[];
  turns?: string[];
  conversation?: ConversationLine[];
}

export interface VocabEntry {
  term: string;
  function: string;
  meaning: string;
  example: string;
  register: "speaking" | "writing" | "both";
  note: string | null;
}

export interface Drill {
  pattern: string;
  plain: string;
  model: string;
}

export interface DetMetrics {
  word_count: number;
  part2_word_count?: number;
  seconds_used: number;
  wpm: number;
  sentences: number;
  avg_sentence_length: number;
  distinct_word_ratio: number;
  connectors: string[];
  bank_terms_used: string[];
}

export type RubricKey =
  | "answered"
  | "developed"
  | "structure"
  | "vocabulary"
  | "variety"
  | "accuracy";

export type SelfScores = Partial<Record<RubricKey, 1 | 2 | 3 | 4>>;
