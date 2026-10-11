-- Study notes for her school subjects (first: Grade 11 Chemistry, Unit 1).
--
-- Concept-first summaries of chapters she sends, read in the app before she
-- reads her own book notes. Content tables like tests/questions: public read,
-- written only from the SQL editor (the postgres role bypasses RLS).
--
-- Re-runnable.

create table if not exists public.subjects (
  id          text primary key,           -- 'chemistry'
  name        text not null,
  grade       text,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.subject_chapters (
  id          text primary key,           -- 'chem-g11-u1-bohr'
  subject_id  text not null references public.subjects(id) on delete cascade,
  unit        text,                       -- 'Unit 1 · Part II'
  title       text not null,
  source      text,                       -- which slides / pages it summarizes
  intro       text,                       -- the big picture, read first
  exam_date   date,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.chapter_sections (
  id          text primary key,           -- stable: the app tracks "understood" by it
  chapter_id  text not null references public.subject_chapters(id) on delete cascade,
  sort_order  int  not null,
  title       text not null,
  book_ref    text,                       -- '1.5.4' — where it is in her book
  big_idea    text,                       -- the one-sentence takeaway
  body        jsonb not null,             -- array of display blocks
  checks      jsonb not null default '[]'::jsonb,  -- [{q, a}] self-check questions
  videos      jsonb not null default '[]'::jsonb,  -- [{url, title, channel, minutes}] optional
  updated_at  timestamptz not null default now()
);

create index if not exists subject_chapters_subject_idx on public.subject_chapters (subject_id, sort_order);
create index if not exists chapter_sections_chapter_idx on public.chapter_sections (chapter_id, sort_order);

alter table public.subjects         enable row level security;
alter table public.subject_chapters enable row level security;
alter table public.chapter_sections enable row level security;

grant select on public.subjects, public.subject_chapters, public.chapter_sections to anon, authenticated;
grant all    on public.subjects, public.subject_chapters, public.chapter_sections to service_role;

drop policy if exists "subjects public read"         on public.subjects;
drop policy if exists "subject chapters public read" on public.subject_chapters;
drop policy if exists "chapter sections public read" on public.chapter_sections;
create policy "subjects public read"         on public.subjects         for select using (true);
create policy "subject chapters public read" on public.subject_chapters for select using (true);
create policy "chapter sections public read" on public.chapter_sections for select using (true);
