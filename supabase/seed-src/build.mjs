// Generates re-runnable seed SQL files under supabase/seed/ from the authored
// question bank in this folder. Run: node supabase/seed-src/build.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createHash } from "node:crypto";
import { DOMAINS, SKILLS, scaleFor } from "./taxonomy.mjs";
import { MOCK_RW_1, MOCK_RW_2 } from "./mock-rw.mjs";
import { MOCK_MATH_1, MOCK_MATH_2 } from "./mock-math.mjs";
import { DRILLS } from "./drills.mjs";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "seed");
mkdirSync(OUT, { recursive: true });

const q = (v) => (v === null || v === undefined ? "null" : `'${String(v).replace(/'/g, "''")}'`);
const jsonb = (v) => (v === null || v === undefined ? "null" : `${q(JSON.stringify(v))}::jsonb`);

// Deterministic UUIDv5-ish ids so re-running the seed never duplicates rows.
function uuid(ns) {
  const h = createHash("sha1").update(ns).digest("hex");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-5${h.slice(13, 16)}-a${h.slice(17, 20)}-${h.slice(20, 32)}`;
}

const RW_ORDER = [
  "craft_structure",
  "information_ideas",
  "standard_conventions",
  "expression_ideas",
];
const DIFF_ORDER = { easy: 0, medium: 1, hard: 2 };

/** RW: order by domain (fixed official sequence) then easiest -> hardest.
 *  Math: order easiest -> hardest across the whole module. */
function orderQuestions(list, section) {
  const copy = list.map((item, i) => ({ item, i }));
  copy.sort((a, b) => {
    if (section === "rw") {
      const d = RW_ORDER.indexOf(a.item.d) - RW_ORDER.indexOf(b.item.d);
      if (d !== 0) return d;
    }
    const diff = DIFF_ORDER[a.item.diff] - DIFF_ORDER[b.item.diff];
    if (diff !== 0) return diff;
    return a.i - b.i;
  });
  return copy.map((c) => c.item);
}

function questionSql(testSlug, partId, partSection, list) {
  const ordered = orderQuestions(list, partSection);
  return ordered
    .map((x, idx) => {
      const id = uuid(`${testSlug}:${partId}:${idx + 1}`);
      const choices =
        x.type === "spr"
          ? null
          : x.choices.map((text, i) => ({ key: "ABCD"[i], text }));
      return `insert into public.questions (id, part_id, order_index, domain_id, skill_id, difficulty, question_type, passage, prompt, choices, correct_answer, accepted_answers, explanation) values (${q(id)}, ${q(partId)}, ${idx + 1}, ${q(x.d)}, ${q(x.s)}, ${q(x.diff)}, ${q(x.type)}, ${q(x.passage ?? null)}, ${q(x.prompt)}, ${jsonb(choices)}, ${q(x.ans)}, ${jsonb(x.alt ?? null)}, ${q(x.exp)}) on conflict (id) do nothing;`;
    })
    .join("\n");
}

function testSql({ slug, title, subtitle, test_type, section_scope, focus, difficulty, description, sort, parts }) {
  const testId = uuid(`test:${slug}`);
  const lines = [
    `insert into public.tests (id, slug, title, subtitle, test_type, section_scope, focus_domain_id, difficulty, description, sort_order) values (${q(testId)}, ${q(slug)}, ${q(title)}, ${q(subtitle)}, ${q(test_type)}, ${q(section_scope)}, ${q(focus ?? null)}, ${q(difficulty)}, ${q(description)}, ${sort}) on conflict (slug) do nothing;`,
  ];
  parts.forEach((p, i) => {
    const partId = uuid(`part:${slug}:${i + 1}`);
    lines.push(
      `insert into public.test_parts (id, test_id, part_index, title, section, duration_seconds) values (${q(partId)}, ${q(testId)}, ${i + 1}, ${q(p.title)}, ${q(p.section)}, ${p.duration}) on conflict (test_id, part_index) do nothing;`,
    );
    lines.push(questionSql(slug, partId, p.section, p.questions));
  });
  return lines.join("\n") + "\n";
}

// ---- 00 taxonomy -----------------------------------------------------------
let sql = "-- Reference taxonomy: official SAT domains and skills. Re-runnable.\n";
for (const d of DOMAINS)
  sql += `insert into public.domains (id, section, name, weight_pct, sort_order) values (${q(d.id)}, ${q(d.section)}, ${q(d.name)}, ${d.weight}, ${d.order}) on conflict (id) do nothing;\n`;
SKILLS.forEach(([id, dom, name], i) => {
  sql += `insert into public.skills (id, domain_id, name, sort_order) values (${q(id)}, ${q(dom)}, ${q(name)}, ${i + 1}) on conflict (id) do nothing;\n`;
});
writeFileSync(join(OUT, "00_domains_skills.sql"), sql);

// ---- 01 score conversions --------------------------------------------------
sql =
  "-- Approximate. The real SAT uses item response theory and adaptive routing; this app cannot reproduce it.\n" +
  "comment on table public.score_conversions is 'Approximate. The real SAT uses item response theory and adaptive routing; this app cannot reproduce it.';\n";
for (let r = 0; r <= 54; r++)
  sql += `insert into public.score_conversions (section, raw_score, scaled) values ('rw', ${r}, ${scaleFor(r, 54)}) on conflict (section, raw_score) do nothing;\n`;
for (let r = 0; r <= 44; r++)
  sql += `insert into public.score_conversions (section, raw_score, scaled) values ('math', ${r}, ${scaleFor(r, 44)}) on conflict (section, raw_score) do nothing;\n`;
writeFileSync(join(OUT, "01_score_conversions.sql"), sql);

// ---- 10 full mock ----------------------------------------------------------
const mock = {
  slug: "full-mock-1",
  title: "Full Mock 1",
  subtitle: "Complete digital SAT practice test",
  test_type: "full_mock",
  section_scope: "both",
  focus: null,
  difficulty: "mixed",
  description:
    "Four timed parts: two Reading and Writing modules of 27 questions and two Math modules of 22 questions. 98 questions, 2 hours 14 minutes of testing time.",
  sort: 1,
  parts: [
    { title: "Reading and Writing — Module 1", section: "rw", duration: 32 * 60, questions: MOCK_RW_1 },
    { title: "Reading and Writing — Module 2", section: "rw", duration: 32 * 60, questions: MOCK_RW_2 },
    { title: "Math — Module 1", section: "math", duration: 35 * 60, questions: MOCK_MATH_1 },
    { title: "Math — Module 2", section: "math", duration: 35 * 60, questions: MOCK_MATH_2 },
  ],
};
writeFileSync(join(OUT, "10_full_mock_1.sql"), testSql(mock));

// ---- 20..33 drills ---------------------------------------------------------
for (const d of DRILLS) {
  writeFileSync(
    join(OUT, `${d.file}.sql`),
    testSql({
      slug: d.slug,
      title: d.title,
      subtitle: d.subtitle,
      test_type: "drill",
      section_scope: d.section,
      focus: d.focus,
      difficulty: "mixed",
      description: d.description,
      sort: d.sort,
      parts: [
        {
          title: d.title,
          section: d.section,
          duration: d.questions.length * (d.section === "rw" ? 75 : 100),
          questions: d.questions,
        },
      ],
    }),
  );
}

// ---- sanity checks ---------------------------------------------------------
const mockCount = mock.parts.reduce((n, p) => n + p.questions.length, 0);
const problems = [];
if (mockCount !== 98) problems.push(`Full Mock 1 has ${mockCount} questions, expected 98`);
mock.parts.forEach((p, i) => {
  const expected = p.section === "rw" ? 27 : 22;
  if (p.questions.length !== expected)
    problems.push(`Part ${i + 1} has ${p.questions.length}, expected ${expected}`);
});
for (const d of DRILLS)
  if (d.questions.length < 8) problems.push(`${d.slug} has only ${d.questions.length} questions`);
const skillIds = new Set(SKILLS.map((s) => s[0]));
const all = [...mock.parts.flatMap((p) => p.questions), ...DRILLS.flatMap((d) => d.questions)];
for (const x of all) {
  if (x.s && !skillIds.has(x.s)) problems.push(`unknown skill ${x.s}`);
  if (!x.exp || x.exp.length < 60) problems.push(`weak explanation: ${x.prompt.slice(0, 50)}`);
  if (x.type === "mc" && (!x.choices || x.choices.length !== 4))
    problems.push(`bad choices: ${x.prompt.slice(0, 50)}`);
  if (x.type === "mc" && !"ABCD".includes(x.ans)) problems.push(`bad answer: ${x.prompt.slice(0, 40)}`);
}
if (problems.length) {
  console.error("SEED PROBLEMS:\n" + problems.join("\n"));
  process.exit(1);
}
console.log(`OK — mock ${mockCount} questions, ${DRILLS.length} drills, ${all.length} total.`);
