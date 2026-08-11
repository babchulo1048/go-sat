create table public.domains (
  id text primary key,
  section text not null,
  name text not null,
  weight_pct int not null,
  sort_order int not null
);

create table public.skills (
  id text primary key,
  domain_id text not null references public.domains(id),
  name text not null,
  sort_order int not null
);

create table public.tests (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subtitle text,
  test_type text not null,
  section_scope text not null,
  focus_domain_id text references public.domains(id),
  difficulty text,
  description text,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.test_parts (
  id uuid primary key default gen_random_uuid(),
  test_id uuid not null references public.tests(id) on delete cascade,
  part_index int not null,
  title text not null,
  section text not null,
  duration_seconds int not null,
  unique (test_id, part_index)
);

create table public.questions (
  id uuid primary key default gen_random_uuid(),
  part_id uuid not null references public.test_parts(id) on delete cascade,
  order_index int not null,
  domain_id text not null references public.domains(id),
  skill_id text references public.skills(id),
  difficulty text not null,
  question_type text not null,
  passage text,
  prompt text not null,
  choices jsonb,
  correct_answer text not null,
  accepted_answers jsonb,
  explanation text not null,
  unique (part_id, order_index)
);

create table public.score_conversions (
  section text not null,
  raw_score int not null,
  scaled int not null,
  primary key (section, raw_score)
);

create table public.attempts (
  id uuid primary key,
  device_id text not null,
  test_id uuid not null references public.tests(id),
  status text not null,
  started_at timestamptz not null,
  completed_at timestamptz,
  raw_rw int,
  raw_math int,
  scaled_rw int,
  scaled_math int,
  scaled_total int,
  total_seconds int
);

create table public.answers (
  id uuid primary key,
  attempt_id uuid not null references public.attempts(id) on delete cascade,
  question_id uuid not null references public.questions(id),
  selected text,
  is_correct boolean not null,
  seconds_spent int not null default 0,
  was_flagged boolean not null default false,
  error_category text,
  unique (attempt_id, question_id)
);

create table public.notes (
  id uuid primary key,
  device_id text not null,
  attempt_id uuid references public.attempts(id) on delete cascade,
  question_id uuid references public.questions(id),
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.attempts is 'No auth by design — single-user personal app. device_id separates devices; it is not a security boundary.';
comment on table public.answers is 'No auth by design — single-user personal app. device_id separates devices; it is not a security boundary.';
comment on table public.notes is 'No auth by design — single-user personal app. device_id separates devices; it is not a security boundary.';
comment on table public.score_conversions is 'Approximate. The real SAT uses item response theory and adaptive routing; this app cannot reproduce it.';

grant select on public.domains to anon, authenticated;
grant select on public.skills to anon, authenticated;
grant select on public.tests to anon, authenticated;
grant select on public.test_parts to anon, authenticated;
grant select on public.questions to anon, authenticated;
grant select on public.score_conversions to anon, authenticated;
grant select, insert, update on public.attempts to anon, authenticated;
grant select, insert, update on public.answers to anon, authenticated;
grant select, insert, update, delete on public.notes to anon, authenticated;
grant all on public.domains, public.skills, public.tests, public.test_parts, public.questions, public.score_conversions, public.attempts, public.answers, public.notes to service_role;

alter table public.domains enable row level security;
alter table public.skills enable row level security;
alter table public.tests enable row level security;
alter table public.test_parts enable row level security;
alter table public.questions enable row level security;
alter table public.score_conversions enable row level security;
alter table public.attempts enable row level security;
alter table public.answers enable row level security;
alter table public.notes enable row level security;

create policy "content readable by anyone" on public.domains for select using (true);
create policy "content readable by anyone" on public.skills for select using (true);
create policy "content readable by anyone" on public.tests for select using (true);
create policy "content readable by anyone" on public.test_parts for select using (true);
create policy "content readable by anyone" on public.questions for select using (true);
create policy "content readable by anyone" on public.score_conversions for select using (true);

create policy "attempts open read" on public.attempts for select using (true);
create policy "attempts open insert" on public.attempts for insert with check (true);
create policy "attempts open update" on public.attempts for update using (true) with check (true);

create policy "answers open read" on public.answers for select using (true);
create policy "answers open insert" on public.answers for insert with check (true);
create policy "answers open update" on public.answers for update using (true) with check (true);

create policy "notes open read" on public.notes for select using (true);
create policy "notes open insert" on public.notes for insert with check (true);
create policy "notes open update" on public.notes for update using (true) with check (true);
create policy "notes open delete" on public.notes for delete using (true);

create index on public.questions (part_id);
create index on public.test_parts (test_id);
create index on public.answers (attempt_id);
create index on public.attempts (device_id);
create index on public.notes (device_id);