/**
 * Progress email — a short note to her on how this week's practice is going.
 *
 * Runs as a Vercel serverless function, triggered by the cron in vercel.json
 * (Mon/Wed/Fri). It reads her attempts from Supabase, builds a few lines of
 * summary, and sends them through Gmail with an app password.
 *
 * Env vars, set in Vercel (NOT VITE_-prefixed — they must never reach the
 * browser bundle):
 *   GMAIL_USER          the Gmail address that sends
 *   GMAIL_APP_PASSWORD  16-character app password for that account
 *   REPORT_TO           recipient(s), comma-separated
 *   CRON_SECRET         Vercel sends it as a Bearer token on cron runs;
 *                       manual runs pass it as ?key=
 *   STUDENT_DEVICE_IDS  optional, comma-separated: count only her devices, so
 *                       anyone testing the app on another phone is excluded
 *
 * Manual use:
 *   /api/progress-email?key=SECRET&preview=1   show the email, send nothing
 *   /api/progress-email?key=SECRET             send it now
 */
import nodemailer from "nodemailer";

interface Req {
  headers: Record<string, string | string[] | undefined>;
  query: Record<string, string | string[] | undefined>;
}
interface Res {
  status(code: number): Res;
  setHeader(name: string, value: string): Res;
  send(body: string): void;
  json(body: unknown): void;
}

interface Test { id: string; slug: string; title: string; sort_order: number }
interface Attempt {
  id: string;
  test_id: string;
  device_id: string;
  status: string;
  completed_at: string | null;
}
interface Answer { attempt_id: string; is_correct: boolean; seconds_spent: number | null }

const APP_URL = "https://sarem-sat.vercel.app";
const WEEK_PREFIX = "week1-";
const RW_PACE = 71; // official seconds per Reading and Writing question
const MATH_PACE = 95;

/* ------------------------------------------------------------------ data */

async function rest<T>(path: string): Promise<T> {
  // Same values the app uses. Deliberately not SUPABASE_URL: old env files
  // still carry that name pointing at the retired Lovable project.
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Supabase URL or key is not configured");
  const r = await fetch(`${url}/rest/v1/${path}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  if (!r.ok) throw new Error(`Supabase ${r.status}: ${await r.text()}`);
  return (await r.json()) as T;
}

interface DayResult {
  title: string;
  isMath: boolean;
  correct: number | null;
  total: number | null;
  avgSeconds: number | null;
}

async function gather() {
  const devices = (process.env.STUDENT_DEVICE_IDS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const tests = await rest<Test[]>(
    `tests?slug=like.${WEEK_PREFIX}*&select=id,slug,title,sort_order&order=sort_order`,
  );
  const ids = tests.map((t) => t.id).join(",");
  let attempts = await rest<Attempt[]>(
    `attempts?test_id=in.(${ids})&status=eq.completed&select=id,test_id,device_id,status,completed_at`,
  );
  if (devices.length) attempts = attempts.filter((a) => devices.includes(a.device_id));

  const answers = attempts.length
    ? await rest<Answer[]>(
        `answers?attempt_id=in.(${attempts.map((a) => a.id).join(",")})&select=attempt_id,is_correct,seconds_spent`,
      )
    : [];

  const days: DayResult[] = tests.map((t) => {
    // Her FIRST completed attempt is the honest one; retakes know the answers.
    const first = attempts
      .filter((a) => a.test_id === t.id)
      .sort((a, b) => (a.completed_at ?? "").localeCompare(b.completed_at ?? ""))[0];
    const isMath = t.slug === "week1-day3";
    if (!first) return { title: t.title, isMath, correct: null, total: null, avgSeconds: null };
    const rows = answers.filter((x) => x.attempt_id === first.id);
    const secs = rows.reduce((n, x) => n + (x.seconds_spent ?? 0), 0);
    return {
      title: t.title,
      isMath,
      correct: rows.filter((x) => x.is_correct).length,
      total: rows.length,
      avgSeconds: rows.length ? Math.round(secs / rows.length) : null,
    };
  });

  return { days };
}

/* --------------------------------------------------------------- content */

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/*
 * Brand tokens, copied from src/index.css (light theme). Email clients ignore
 * CSS variables and <style> blocks, so every style is inline and the layout
 * is tables — the only thing Gmail, Outlook and phone mail apps all render.
 */
const C = {
  page: "#f1f5f9",
  card: "#ffffff",
  surface: "#f8fafc",
  border: "#e2e8f0",
  text: "#0f172a",
  muted: "#64748b",
  subtle: "#94a3b8",
  brand: "#4f46e5",
  brandSoft: "#eef2ff",
  success: "#059669",
  successSoft: "#ecfdf5",
  warning: "#d97706",
  warningSoft: "#fffbeb",
};
const FONT = "Inter,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

function compose(days: DayResult[], now: Date) {
  const done = days.filter((d) => d.correct !== null);
  const next = days.find((d) => d.correct === null);
  const weekday = now.getUTCDay(); // 5 = Friday
  const allDone = done.length === days.length;
  const mockSoon = weekday === 5 || weekday === 6 || allDone;

  const subject = allDone
    ? "SAT: all 6 days done — full mock this weekend"
    : `SAT: ${done.length} of ${days.length} days done this week`;

  const headline = allDone ? "All 6 days done" : `${done.length} of ${days.length} days done`;
  const subline =
    done.length === 0
      ? "The week starts with Day 1 — about 20 minutes."
      : allDone
        ? "Every daily set finished. Well done."
        : "Keep going — one day at a time.";

  /* 6-segment progress bar */
  const bar = days
    .map(
      (d, i) =>
        `<td style="padding:0 ${i === days.length - 1 ? 0 : 4}px 0 0"><div style="height:6px;border-radius:3px;background:${d.correct !== null ? "#ffffff" : "rgba(255,255,255,0.28)"}"></div></td>`,
    )
    .join("");

  const rows = days
    .map((d, i) => {
      const n = i + 1;
      const isDone = d.correct !== null;
      const [, name = d.title] = d.title.split(" — ");
      const badge = isDone
        ? `<div style="width:28px;height:28px;border-radius:14px;background:${C.successSoft};color:${C.success};font:600 14px/28px ${FONT};text-align:center">✓</div>`
        : `<div style="width:26px;height:26px;border-radius:14px;border:1px solid ${C.border};color:${C.subtle};font:600 13px/26px ${FONT};text-align:center">${n}</div>`;

      let detail = d.isMath ? "Math" : "Reading and Writing";
      let pill = "";
      if (isDone && d.total) {
        const pct = d.correct! / d.total;
        const good = pct >= 0.7;
        pill = `<span style="display:inline-block;padding:3px 10px;border-radius:999px;background:${good ? C.successSoft : C.warningSoft};color:${good ? C.success : C.warning};font:600 13px ${FONT}">${d.correct}/${d.total}</span>`;
        if (d.avgSeconds !== null) {
          const pace = d.isMath ? MATH_PACE : RW_PACE;
          detail = `${d.avgSeconds}s per question · test pace ${pace}s`;
        }
      }
      const isNext = next === d;
      return `<tr>
  <td style="padding:12px 0;border-top:${i ? `1px solid ${C.border}` : "0"};width:40px;vertical-align:top">${badge}</td>
  <td style="padding:12px 0;border-top:${i ? `1px solid ${C.border}` : "0"};vertical-align:top">
    <div style="font:${isDone || isNext ? 600 : 500} 15px/1.35 ${FONT};color:${isDone || isNext ? C.text : C.muted}">Day ${n} · ${esc(name)}${isNext ? ` <span style="font:600 11px ${FONT};color:${C.brand};letter-spacing:.04em">NEXT</span>` : ""}</div>
    <div style="font:400 13px/1.45 ${FONT};color:${C.muted};margin-top:2px">${detail}</div>
  </td>
  <td style="padding:12px 0;border-top:${i ? `1px solid ${C.border}` : "0"};text-align:right;vertical-align:top;white-space:nowrap;padding-left:8px">${pill}</td>
</tr>`;
    })
    .join("\n");

  /*
   * One gentle line, not a warning per row. Answering at under half the test
   * pace usually means explanations are being skipped, not that it was easy.
   */
  const fast = done.filter(
    (d) => d.avgSeconds !== null && d.avgSeconds < (d.isMath ? MATH_PACE : RW_PACE) * 0.5,
  );
  const paceNote = fast.length
    ? `<tr><td style="padding:0 24px 20px"><div style="font:400 14px/1.5 ${FONT};color:${C.muted};padding:12px 16px;border-left:3px solid ${C.warning};background:${C.warningSoft};border-radius:0 8px 8px 0">You're answering fast — well under test pace. Speed is good, but the explanations are where the learning is. Read each one, even for the questions you got right.</div></td></tr>`
    : "";

  const nextCard = next
    ? `<tr><td style="padding:0 24px 20px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.brandSoft};border-radius:12px">
    <tr><td style="padding:18px 20px">
      <div style="font:600 11px ${FONT};letter-spacing:.08em;color:${C.brand}">UP NEXT</div>
      <div style="font:600 17px/1.35 ${FONT};color:${C.text};margin-top:4px">${esc(next.title)}</div>
      <div style="font:400 14px/1.5 ${FONT};color:${C.muted};margin-top:6px">About 20 minutes. Read the card at the top first, then answer untimed.</div>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:14px"><tr><td style="background:${C.brand};border-radius:10px">
        <a href="${APP_URL}/practice" style="display:inline-block;padding:11px 20px;font:600 15px ${FONT};color:#ffffff;text-decoration:none">Start ${esc(next.title.split(" — ")[0])} →</a>
      </td></tr></table>
    </td></tr>
  </table>
</td></tr>`
    : "";

  const mockCard = `<tr><td style="padding:0 24px 24px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${mockSoon ? C.warningSoft : C.surface};border:1px solid ${mockSoon ? "#fde68a" : C.border};border-radius:12px">
    <tr><td style="padding:16px 20px">
      <div style="font:600 15px/1.4 ${FONT};color:${C.text}">${mockSoon ? "📝 This weekend: full mock test" : "📝 Weekend: full mock test"}</div>
      <div style="font:400 14px/1.5 ${FONT};color:${C.muted};margin-top:4px">${
        mockSoon
          ? "About 2 hours 15 minutes in one sitting. Take it in the morning, phone in another room."
          : "At the end of the week you'll take a full practice test to see how far this week moved you."
      }</div>
    </td></tr>
  </table>
</td></tr>`;

  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:${C.page}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.page}"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${C.card};border-radius:16px;overflow:hidden;border:1px solid ${C.border}">
  <tr><td style="background:${C.brand};padding:24px 24px 22px">
    <div style="font:600 12px ${FONT};letter-spacing:.1em;color:rgba(255,255,255,.75)">SAT PRACTICE · WEEK 1</div>
    <div style="font:700 26px/1.25 ${FONT};color:#ffffff;margin-top:8px">${headline}</div>
    <div style="font:400 15px/1.45 ${FONT};color:rgba(255,255,255,.85);margin-top:4px">${subline}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px"><tr>${bar}</tr></table>
  </td></tr>
  <tr><td style="padding:12px 24px 8px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
  </td></tr>
  ${paceNote}
  ${nextCard}
  ${mockCard}
  <tr><td style="padding:16px 24px;border-top:1px solid ${C.border};background:${C.surface}">
    <div style="font:400 12px/1.5 ${FONT};color:${C.subtle}">From your SAT Practice app · <a href="${APP_URL}/week/reference" style="color:${C.brand};text-decoration:none">Rules sheets</a> · <a href="${APP_URL}/practice" style="color:${C.brand};text-decoration:none">Open the app</a></div>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;

  const text = [
    `${headline}. ${subline}`,
    "",
    ...days.map((d, i) =>
      d.correct === null
        ? `[ ] Day ${i + 1} — ${d.title.split(" — ")[1] ?? d.title}`
        : `[x] ${d.title}: ${d.correct}/${d.total}${d.avgSeconds !== null ? `, ${d.avgSeconds}s per question` : ""}`,
    ),
    "",
    next ? `Up next: ${next.title}. Read the card first, go untimed, read every explanation.` : "",
    mockSoon ? "This weekend: full mock test, about 2h15 in one sitting." : "At the weekend: full mock test.",
    "",
    `${APP_URL}/practice`,
  ].join("\n");

  return { subject, html, text };
}

/* --------------------------------------------------------------- handler */

export default async function handler(req: Req, res: Res) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers["authorization"];
  const key = req.query["key"];
  const authorized =
    !!secret && (auth === `Bearer ${secret}` || (typeof key === "string" && key === secret));
  if (!authorized) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }

  try {
    const { days } = await gather();
    const email = compose(days, new Date());

    if (req.query["preview"]) {
      res
        .status(200)
        .setHeader("Content-Type", "text/html; charset=utf-8")
        .send(email.html);
      return;
    }

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    const to = process.env.REPORT_TO;
    if (!user || !pass || !to) throw new Error("GMAIL_USER, GMAIL_APP_PASSWORD and REPORT_TO must be set");

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass: pass.replace(/\s+/g, "") }, // Google shows it with spaces
    });
    await transport.sendMail({
      from: `SAT Practice <${user}>`,
      to,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });

    res.status(200).json({ sent: true, to, subject: email.subject });
  } catch (err) {
    console.error("[progress-email]", err);
    res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
}
