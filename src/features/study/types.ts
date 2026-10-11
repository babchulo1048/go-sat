import type { Block } from "@/features/daily/cards";

/** Mirrors supabase/migrations/20261011120000_subjects.sql. */
export interface Subject {
  id: string;
  name: string;
  grade: string | null;
  sort_order: number;
}

export interface SubjectChapter {
  id: string;
  subject_id: string;
  unit: string | null;
  title: string;
  source: string | null;
  intro: string | null;
  exam_date: string | null; // YYYY-MM-DD
  sort_order: number;
}

export interface SelfCheck {
  q: string;
  a: string;
}

export interface StudyVideo {
  url: string;
  title: string;
  channel: string;
  minutes?: number;
}

export interface ChapterSection {
  id: string;
  chapter_id: string;
  sort_order: number;
  title: string;
  book_ref: string | null;
  big_idea: string | null;
  body: Block[];
  checks: SelfCheck[];
  videos: StudyVideo[];
}

/** Local only: a section she marked as understood. */
export interface StudyRead {
  section_id: string;
  at: number;
}
