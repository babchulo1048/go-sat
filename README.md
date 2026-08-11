# SAT Practice

A mobile-first, offline-capable SAT practice app for a single student. Full mock tests,
targeted drills by topic, a mistake log with cause tracking, notes, and a progress
dashboard.

Companion to `SAT_PREPARATION_MASTER_PLAN.md` — the app implements the study loop from
§6 and the tracking indicators from §7 of that plan.

---

## What it does

- **Full mock tests** — 98 questions across four correctly-timed parts (2×32 min Reading
  and Writing, 2×35 min Math), with an optional 10-minute break at the section seam.
- **Focused drills** — short sets targeting one of the eight official SAT domains.
- **Estimated scoring** — raw → scaled per section using a seeded conversion table.
- **Mistake log** — every wrong answer, tagged with one of seven causes in a single tap.
- **Re-attempt mode** — spaced re-practice drawn from her own previous misses.
- **Notes** — per test and per question, searchable.
- **Progress** — score trend, accuracy by topic (weakest first), error-category mix over
  time, pacing against the 71s/95s benchmarks, and a consistency heatmap.

### Two things it deliberately does *not* do

1. **It is not adaptive**, and it never claims a real score. The SAT routes you into an
   easier or harder second module and scores with item response theory; a fixed practice
   set cannot reproduce that. Every score here is labelled **Estimated**. For a
   trustworthy score, use College Board's Bluebook.
2. **It does not replace official material.** Bluebook and the SAT Suite Question Bank
   are the real preparation. This app's advantage is that it lives on her phone, knows
   her history, and works with no signal.

---

## Stack

| | |
|---|---|
| Build | Vite 7 + React 19 + TypeScript (strict) |
| Routing | React Router (SPA, no SSR) |
| Styling | Tailwind CSS v4, CSS custom-property design tokens |
| Local storage | Dexie / IndexedDB — **source of truth** |
| Backend | Supabase Postgres — backup and content delivery |
| Offline | vite-plugin-pwa (Workbox) |
| Charts | Recharts (lazy-loaded — Progress screen only) |
| Hosting | Vercel (static) |

### Architecture: local-first

```
   Question content                 Her work
   ────────────────                 ────────
   Supabase  ──download once──►     UI writes ──► IndexedDB ──► sync queue ──► Supabase
        │                                             │                            │
        └──► IndexedDB ──► every screen reads here     └── source of truth ─────────┘
             (background refresh when online)              (never blocks on network)
```

- Content is a **read-through cache**: downloaded once, refreshed quietly on each online
  launch. That refresh is what makes a newly-seeded test appear with no redeploy.
- Attempts, answers and notes write to **IndexedDB first, synchronously**. Supabase is a
  backup that catches up. Nothing in the UI ever awaits the network.
- Sync uses a **dirty flag, not an operation queue**, so it is idempotent: retrying can
  never double-apply, and a row edited five times offline costs one write.

### No authentication — read this

There is no login, by design. A `device_id` in `localStorage` separates devices; **it is
not a security boundary.** The anon key plus the RLS policies allow anyone with the URL
to read the question bank and write attempt rows. That is an acceptable trade for a
personal single-user study tool. **Do not store anything sensitive in it.**

---

## Local setup

```bash
npm install
cp .env.example .env      # fill in your Supabase URL and anon key
npm run dev               # http://localhost:5173
```

```bash
npm run typecheck         # tsc --noEmit
npm run build             # typecheck + production build to dist/
npm run preview           # serve dist/ — required to test the service worker
```

The service worker is disabled in dev. **Offline behaviour must be tested against
`npm run preview`, not `npm run dev`.**

---

## Database

### First-time setup

Run these in the Supabase SQL editor, in order:

1. `supabase/migrations/*.sql` — schema, RLS policies, indexes
2. `supabase/seed/00_domains_skills.sql` — the official taxonomy (8 domains, 30 skills)
3. `supabase/seed/01_score_conversions.sql` — raw → scaled tables
4. `supabase/seed/10_full_mock_1.sql` — Full Mock 1 (98 questions)
5. `supabase/seed/2*.sql`, `3*.sql` — the eight drill sets

Every seed file uses `on conflict do nothing`, so re-running is safe.

### Schema

```
domains ──< skills
   ▲
   │
tests ──< test_parts ──< questions
   ▲                         ▲
   │                         │
attempts ──< answers ────────┘
   ▲
   └──< notes

score_conversions   (section, raw_score) → scaled
```

A **test** is any practice unit — `full_mock`, `section_mock` or `drill`. A test has one
or more separately-timed **parts** (the real SAT calls these modules). This is why no
schema change is ever needed to add a new kind of practice.

### Adding a new test — no code change, no redeploy

Insert three sets of rows:

```sql
-- 1. the test
insert into public.tests
  (id, slug, title, subtitle, test_type, section_scope, focus_domain_id, difficulty, description, sort_order)
values
  (gen_random_uuid(), 'drill-math-circles', 'Math: Circles', 'Arcs, sectors, equations',
   'drill', 'math', 'geometry_trig', 'mixed', 'A short set on circle geometry.', 40);

-- 2. one or more parts
insert into public.test_parts (id, test_id, part_index, title, section, duration_seconds)
values (gen_random_uuid(), '<test id>', 1, 'Math: Circles', 'math', 900);

-- 3. the questions
insert into public.questions
  (id, part_id, order_index, domain_id, skill_id, difficulty, question_type,
   passage, prompt, choices, correct_answer, accepted_answers, explanation)
values
  (gen_random_uuid(), '<part id>', 1, 'geometry_trig', 'circles', 'medium', 'mc',
   null, 'What is the radius…',
   '[{"key":"A","text":"3"},{"key":"B","text":"5"}]'::jsonb,
   'B', null, 'Because…');
```

The next time the app is opened online it picks the test up automatically.

**Ordering rules that keep tests realistic:**

- Reading and Writing parts must order questions by domain in this exact sequence —
  `craft_structure`, `information_ideas`, `standard_conventions`, `expression_ideas` —
  easiest to hardest within each group. This mirrors the real test, and it is what makes
  "bank the fast grammar points first" a usable strategy.
- Math parts run easiest to hardest across the whole module.

**Student-produced response (`question_type = 'spr'`):** leave `choices` null, put the
canonical answer in `correct_answer`, and list every equivalent form in
`accepted_answers` (e.g. `'["13/5","2.60"]'`). The checker also compares numerically, so
`2.6` and `13/5` match regardless.

---

## Deploying to Vercel

1. Push to GitHub.
2. Import the repo in Vercel — it auto-detects Vite.
3. Add environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`.
4. Deploy. `vercel.json` handles SPA rewrites and the cache headers the service worker
   needs (`sw.js` must never be cached).

---

## Project layout

```
src/
  lib/
    db.ts         Dexie schema — the local mirror
    content.ts    read-through cache for questions
    sync.ts       dirty-flag sync engine
    repo.ts       all reads and writes (UI never touches Dexie directly)
    scoring.ts    answer checking + raw→scaled conversion
    stats.ts      aggregations for Home and Progress
  features/
    home/ practice/ runner/ results/ review/ notes/ progress/ settings/
  components/
    ui/           shadcn/ui primitives
    common.tsx    StatTile, DomainAccuracyBars, GoalRing, EmptyState
```

The two files worth reading before changing anything: **`sync.ts`** (idempotency rules)
and **`TestRunner.tsx`** (the timer stores an absolute deadline, not seconds remaining —
that is what makes refresh-resume correct with no per-tick writes).

---

## Known limitations

- **Re-attempt history is local-only.** A re-attempt belongs to no single test, and the
  server `answers` table is keyed to a formal attempt. Rather than invent a synthetic
  test row to satisfy a foreign key, re-attempts stay in IndexedDB. They therefore don't
  follow her to a second device. The underlying mistakes do sync.
- **Timed parts use a wall-clock deadline.** Closing the app does not pause a timed test,
  which matches real test conditions. If the phone dies mid-section, that section is
  gone — exit and start over rather than losing a whole mock.
- **Drill sets ship with 8 questions each**, not the 12 originally specified. Top them up
  by appending to the relevant `supabase/seed/*.sql`.
