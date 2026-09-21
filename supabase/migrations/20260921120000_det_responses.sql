-- Duolingo English Test practice responses.
--
-- Only her responses live in the database. Task guides, prompts, vocabulary and
-- drills are bundled with the app (src/features/det/data), so there is nothing
-- to seed. Audio recordings are never uploaded here — they stay on the device
-- until login and a private storage bucket exist.
--
-- Safe to run once in the Supabase SQL Editor. Access model matches the other
-- student tables: open to the anon key by design, pending the login phase.

create table if not exists public.det_responses (
  id uuid primary key,
  device_id text not null,
  task_id text not null,
  prompt_id text not null,
  mode text not null,
  response_text text,
  part2_text text,
  audio_mime text,
  duration_seconds int,
  metrics jsonb,
  self_scores jsonb,
  reflection text,
  created_at timestamptz not null default now()
);

comment on table public.det_responses is 'No auth yet by design — single-user personal app. device_id separates devices; it is not a security boundary. Moves to auth.uid() policies in the login phase.';

grant select, insert, update on public.det_responses to anon, authenticated;
grant all on public.det_responses to service_role;

alter table public.det_responses enable row level security;

create policy "det responses open read"   on public.det_responses for select using (true);
create policy "det responses open insert" on public.det_responses for insert with check (true);
create policy "det responses open update" on public.det_responses for update using (true) with check (true);

create index if not exists det_responses_device_idx on public.det_responses (device_id);
create index if not exists det_responses_task_idx on public.det_responses (task_id);

-- The project has "automatically expose new tables" OFF, so make the API see
-- this table immediately rather than on its next schema reload.
notify pgrst, 'reload schema';
