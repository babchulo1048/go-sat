# Moving the database to your own Supabase account

**Why:** the current database was created and owned by Lovable Cloud. Lovable
confirmed it dies with the Lovable project — and in September 2026 it was wiped,
taking every table with it. Owning the project removes that dependency and gives
you dashboard access, so you never have to paste SQL through a chat again.

**Time:** about 20 minutes. Nothing here touches app code.

**Order matters.** Seed the new database *before* pointing the app at it, so the
first content fetch sees a complete question bank.

---

## 1. Create the project

1. Go to **supabase.com** → sign in with GitHub → **New project**
2. Organisation: your personal one (not any Lovable org)
3. Name: `sat-practice`
4. **Database password: generate one and save it somewhere safe.** You cannot
   retrieve it later, only reset it.
5. Region: pick the one closest to Ethiopia — **EU (Frankfurt)** is usually the
   best latency
6. Plan: **Free** is ample. This app is ~1 MB of data.

Wait ~2 minutes for provisioning.

## 2. Collect the two values you need

**Project Settings → API**

| Value | Where |
|---|---|
| Project URL | `https://<ref>.supabase.co` |
| `anon` / `public` key | long string starting `eyJ…` |

Ignore the `service_role` key — the app never uses it.

## 3. Build the schema and content

Open **SQL Editor** → **New query**, then run these files in order. Paste each,
press Run, wait for success, then move to the next.

| # | File | What it does |
|---|---|---|
| 1 | `supabase/migrations/20260810152601_*.sql` | tables, RLS policies, indexes |
| 2 | `supabase/seed/00_domains_skills.sql` | 8 domains, 30 skills |
| 3 | `supabase/seed/01_score_conversions.sql` | raw → scaled tables |
| 4 | `supabase/seed/10_full_mock_1.sql` | Full Mock 1 (98 questions) |
| 5 | `supabase/seed/11_full_mock_2.sql` | Full Mock 2 (98 questions) |
| 6 | `supabase/seed/20_*` … `33_*` | the eight drill sets |
| 7 | **`supabase/restore/90_restore_history.sql`** | **her practice history** |

Skip `supabase/migrations/20260814192949_seed_full_mock_2.sql` — it duplicates
step 5, and is only there for platforms that auto-apply migrations.

To copy a file's contents:

```bash
cd ~/sarem_projects/SAT/go-sat
xdg-open supabase/seed/10_full_mock_1.sql      # then Ctrl+A, Ctrl+C
```

### About step 7

`90_restore_history.sql` was generated from the export taken off her phone on
12 September: **20 attempts, 284 answers, 3 notes**, including both full mocks
and her written reflection.

This step is necessary rather than optional. Her phone marks those rows as
already synced, so the app will never re-upload them on its own — without this
file her history exists only on that one device.

All 237 question IDs her answers reference are recreated exactly by steps 4–6,
because question IDs are derived from content rather than generated randomly.
Verified before this file was written.

## 4. Check it landed

In the SQL Editor:

```sql
select 'questions' t, count(*) from questions
union all select 'tests',     count(*) from tests
union all select 'attempts',  count(*) from attempts
union all select 'answers',   count(*) from answers
union all select 'notes',     count(*) from notes;
```

Expect **260 questions · 10 tests · 20 attempts · 284 answers · 3 notes**.

## 5. Point the app at it

**Locally:**

```bash
cd ~/sarem_projects/SAT/go-sat
nano .env        # replace both values with the new URL and anon key
npm run dev      # confirm the app loads and Practice lists 10 tests
```

**On Vercel:** project → **Settings → Environment Variables** → edit both

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Then **Deployments → ⋯ → Redeploy**. Vite bakes these in at build time, so
editing them changes nothing until you rebuild.

## 6. On her phone

Open the app once with internet. It will:

- fetch content from the new database and refresh its offline copy
- resume syncing normally for everything she does from now on

Her existing history is already in the new database from step 7, so nothing is
waiting to upload. Her `device_id` is unchanged, so the app still recognises
the device.

---

## Afterwards

- **Keep the export.** `~/Downloads/Telegram Desktop/sat-practice-export-2026-09-12.json`
  is the only complete copy of her work from before the wipe. Move it out of
  Downloads.
- **Free-tier projects pause after about a week of inactivity.** Unpausing is one
  click from your dashboard — a nuisance, not data loss. If she uses the app
  regularly it will not pause.
- **Back up occasionally.** Settings → *Export everything as JSON* in the app,
  or Database → Backups in Supabase. After losing one database, a monthly export
  costs nothing.
- **Delete the Lovable project only when you are ready.** It no longer has
  anything you need, but there is no hurry.
