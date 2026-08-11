# Deploy

Three steps: secure the repo, push to GitHub, connect Vercel. The database is already
live — nothing to migrate.

---

## 1. Stop tracking `.env` (do this first)

`.env` is currently committed. Fix it before pushing anything else.

```bash
cd ~/sarem_projects/SAT/go-sat

git rm --cached .env
git commit -m "Stop tracking .env"
```

The file stays on your disk — this only removes it from git. `.gitignore` already covers
it going forward.

> **Is the key a secret?** No. The Supabase anon key ships inside the client bundle by
> design, so it's public either way. The real exposure is the wide-open RLS policies:
> anyone with the URL can read the questions and write attempt rows. Your repo is
> private, so this is low risk — but keep it private, and never put anything sensitive
> in this database.

---

## 2. Push to GitHub

```bash
git add -A
git commit -m "Build SAT practice app: runner, scoring, mistake log, notes, progress, PWA"
git push origin main
```

If git asks for a password, GitHub wants a **Personal Access Token**, not your account
password — create one at github.com → Settings → Developer settings → Personal access
tokens, with `repo` scope, and paste it as the password.

---

## 3. Deploy on Vercel

1. Go to **vercel.com/new** and import `babchulo1048/go-sat`.
2. Framework preset: **Vite** (auto-detected). Leave build command and output directory
   alone — `vercel.json` already sets them.
3. Add two **Environment Variables** — copy the values from your local `.env`:

   | Name | Value |
   |---|---|
   | `VITE_SUPABASE_URL` | `https://qjlvnigtcuisptlmqtkn.supabase.co` |
   | `VITE_SUPABASE_PUBLISHABLE_KEY` | *(the key from your `.env`)* |

   Apply to **Production, Preview, and Development**.
4. Click **Deploy**.

> These must be set **before** the first build. Vite bakes `VITE_*` values into the
> bundle at build time — adding them afterwards does nothing until you redeploy.

---

## 4. Database — already done

Your Supabase project is live and seeded. Verified:

| Table | Rows |
|---|---|
| `domains` | 8 |
| `skills` | 30 |
| `tests` | 9 (1 full mock + 8 drills) |
| `test_parts` | 12 |
| `questions` | 162 |
| `score_conversions` | 100 |

**Nothing to run.** The app reads this on first load and caches it on the device.

<details>
<summary>Only if you ever start a fresh Supabase project</summary>

Run these in the Supabase SQL editor, in this order:

1. `supabase/migrations/20260810152601_*.sql` — tables, RLS, indexes
2. `supabase/seed/00_domains_skills.sql`
3. `supabase/seed/01_score_conversions.sql`
4. `supabase/seed/10_full_mock_1.sql`
5. `supabase/seed/20_*.sql` … `33_*.sql` — the eight drills

Every file uses `on conflict do nothing`, so re-running is safe.
</details>

---

## 5. Check the live site

Open the Vercel URL on **her phone** and confirm:

- [ ] "Preparing your question bank" runs once, then the home screen loads
- [ ] Practice → *Math: Algebra* → Start untimed → answer → Finish → results appear
- [ ] Refresh mid-test — it resumes on the same question
- [ ] Add to Home Screen (Share → Add to Home Screen on iOS; ⋮ → Install on Android)
- [ ] Open from the home-screen icon — no browser address bar
- [ ] Turn on airplane mode and take a whole drill — it should work

If the first load hangs, the env vars are wrong or missing. Fix them in Vercel →
Settings → Environment Variables, then **Redeploy** (env changes need a rebuild).

---

## Adding questions later — no redeploy

Insert rows in the Supabase SQL editor. The app picks them up the next time it's opened
online. See the "Adding a new test" section in `README.md` for the exact SQL.

To ship code changes, just `git push` — Vercel rebuilds automatically.
