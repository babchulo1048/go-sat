/**
 * Entity types mirroring the Supabase schema in
 * supabase/migrations/*.sql. These are the shapes stored in IndexedDB too —
 * the local cache is a faithful mirror, not a different model.
 */

export type Section = "rw" | "math";
export type TestType = "full_mock" | "section_mock" | "drill";
export type SectionScope = "both" | "rw" | "math";
export type Difficulty = "easy" | "medium" | "hard";
export type TestDifficulty = Difficulty | "mixed";
export type QuestionType = "mc" | "spr";
export type AttemptStatus = "in_progress" | "completed" | "abandoned";

export interface Domain {
  id: string;
  section: Section;
  name: string;
  weight_pct: number;
  sort_order: number;
}

export interface Skill {
  id: string;
  domain_id: string;
  name: string;
  sort_order: number;
}

export interface Test {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  test_type: TestType;
  section_scope: SectionScope;
  focus_domain_id: string | null;
  difficulty: TestDifficulty | null;
  description: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

export interface TestPart {
  id: string;
  test_id: string;
  part_index: number;
  title: string;
  section: Section;
  duration_seconds: number;
}

export interface Choice {
  key: string;
  text: string;
}

export interface Question {
  id: string;
  part_id: string;
  order_index: number;
  domain_id: string;
  skill_id: string | null;
  difficulty: Difficulty;
  question_type: QuestionType;
  passage: string | null;
  prompt: string;
  choices: Choice[] | null;
  correct_answer: string;
  accepted_answers: string[] | null;
  explanation: string;
}

export interface ScoreConversion {
  section: Section;
  raw_score: number;
  scaled: number;
}

export interface Attempt {
  id: string;
  device_id: string;
  test_id: string;
  status: AttemptStatus;
  started_at: string;
  completed_at: string | null;
  raw_rw: number | null;
  raw_math: number | null;
  scaled_rw: number | null;
  scaled_math: number | null;
  scaled_total: number | null;
  total_seconds: number | null;
}

export interface Answer {
  id: string;
  attempt_id: string;
  question_id: string;
  selected: string | null;
  is_correct: boolean;
  seconds_spent: number;
  was_flagged: boolean;
  error_category: ErrorCategoryId | null;
}

export interface Note {
  id: string;
  device_id: string;
  attempt_id: string | null;
  question_id: string | null;
  body: string;
  created_at: string;
  updated_at: string;
}

/* -------------------------------------------------------------------------
   The seven error categories from SAT_PREPARATION_MASTER_PLAN.md §6.3.
   Stored as the numeric id so the taxonomy can be relabelled without a
   data migration.
   ---------------------------------------------------------------------- */

export type ErrorCategoryId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface ErrorCategory {
  id: ErrorCategoryId;
  label: string;
  /** Shown under the label in the picker — keeps categorisation honest. */
  hint: string;
  /** What this category means she should actually do about it. */
  remedy: string;
}

export const ERROR_CATEGORIES: ErrorCategory[] = [
  {
    id: 1,
    label: "Didn't know the concept",
    hint: "Still can't solve it, even with unlimited time",
    remedy: "Learn it properly, then re-drill the skill",
  },
  {
    id: 2,
    label: "Misunderstood the question",
    hint: "Solved something correctly — just not what was asked",
    remedy: "Underline what's asked before solving",
  },
  {
    id: 3,
    label: "Calculation error",
    hint: "Right method, the arithmetic or algebra slipped",
    remedy: "Write working down; use Desmos",
  },
  {
    id: 4,
    label: "Careless mistake",
    hint: "Knew it fully, but slipped or misread",
    remedy: "Slow down at the moment of selecting",
  },
  {
    id: 5,
    label: "Time pressure",
    hint: "Rushed it, or never properly read it",
    remedy: "Pacing drills; practise abandoning questions",
  },
  {
    id: 6,
    label: "Guessed",
    hint: "No real basis for the choice",
    remedy: "Find the gap underneath — a guess is a symptom",
  },
  {
    id: 7,
    label: "Wrong strategy",
    hint: "Knew the content, took a long or fragile route",
    remedy: "Learn the efficient method",
  },
];

export const ERROR_CATEGORY_BY_ID = new Map<ErrorCategoryId, ErrorCategory>(
  ERROR_CATEGORIES.map((c) => [c.id, c]),
);

/** Per-question pacing benchmarks, from the official section timings. */
export const BENCHMARK_SECONDS: Record<Section, number> = {
  rw: 71, // 64 min / 54 questions
  math: 95, // 70 min / 44 questions
};

export const SECTION_LABEL: Record<Section, string> = {
  rw: "Reading and Writing",
  math: "Math",
};
