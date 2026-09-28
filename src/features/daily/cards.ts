/**
 * Teaching cards for the Week 1 daily practice sets, plus the two reference
 * sheets. Source of truth is SAT_WEEK1_DAILY_SECTIONS.md; keep them in step.
 *
 * Static on purpose: the cards ship with the app bundle, so they work offline
 * and need no database change. Cards are keyed by test slug — the daily sets
 * are ordinary drill tests whose slug starts with WEEK_PREFIX.
 *
 * Inline markup in any string: **bold** and *italic*.
 */

export const WEEK_PREFIX = "week1-";

export const isDailySet = (slug: string | undefined) => !!slug?.startsWith(WEEK_PREFIX);

export type Block =
  | { kind: "heading"; text: string }
  | { kind: "p"; text: string }
  | { kind: "steps"; items: string[] }
  | { kind: "bullets"; items: string[] }
  | { kind: "rows"; rows: { left: string; right: string; use: string; never: string }[] };

export interface TeachingCard {
  minutes: number;
  blocks: Block[];
  watch: string;
}

export const CARDS: Record<string, TeachingCard> = {
  "week1-day1": {
    minutes: 3,
    blocks: [
      { kind: "p", text: "Every boundaries question is the same decision. Run it in order:" },
      {
        kind: "steps",
        items: [
          "**Cover the punctuation choices.** Read the words BEFORE the blank back to the start of the sentence, and the words AFTER it to the end.",
          "**Ask of each side: could it stand alone as a sentence?**",
          "**Both sides complete** → a period, a semicolon, or a comma **+ and/but/so/yet**. A comma alone is NEVER enough (comma splice). Nothing at all is never enough (run-on). *However* is not a joining word — it needs a period or semicolon in front of it.",
          "**Left side complete, right side a list or an explanation** → colon (or a dash). A colon may ONLY follow a complete sentence.",
          "**Left side incomplete, or the right side is a dependent clause** (starts with *because, although, when, while, which, who*) → comma or nothing. Never a period, semicolon, or colon. A right side that is only a list or a noun phrase is step 4, not this one.",
          "**Semicolon = period.** They do the same job. If two choices differ only in that one uses `;` and the other `.`, both are wrong — the answer is something else.",
          "**No punctuation belongs** between a subject and its verb, between a verb and its object, or after *including* / *such as* — no matter how long the sentence has run.",
        ],
      },
    ],
    watch:
      "The comma splice. When two complete sentences sit on either side of the blank, the comma-only choice is always offered, and it always *sounds* fine read aloud. Don't listen — count clauses.",
  },

  "week1-day2": {
    minutes: 3,
    blocks: [
      { kind: "heading", text: "The lift-out test" },
      {
        kind: "p",
        text: "Take the phrase between the punctuation and delete it.",
      },
      {
        kind: "bullets",
        items: [
          "Sentence still works, and still means the same thing? → the phrase is **non-essential** — fence it with punctuation on **BOTH** sides.",
          "Sentence breaks, or now points at the wrong thing? → the phrase is **essential** — **no fences at all**.",
        ],
      },
      { kind: "heading", text: "Three matching fences, never mixed" },
      {
        kind: "p",
        text: "`, … ,`   `— … —`   `( … )`. Open with a comma, close with a comma. Open with a dash, close with a dash. A comma on one side and a dash on the other is always wrong. The most common error on the test is not the wrong fence — it is the **missing second fence**.",
      },
      { kind: "heading", text: "That vs. which" },
      {
        kind: "p",
        text: "*that*-clauses are essential — no comma. *which*-clauses are non-essential — comma before, and a comma after if the sentence continues. Never \", that\".",
      },
      { kind: "heading", text: "Names" },
      {
        kind: "p",
        text: "If the description before a name fits many people (\"the novelist\"), the name is essential — no commas. If the description already pins down one person or thing, the name is extra — commas.",
      },
    ],
    watch:
      "Spotting the opening comma and forgetting to check for the closing one. Every time a phrase interrupts a sentence, find both fences before you answer.",
  },

  "week1-day3": {
    minutes: 4,
    blocks: [
      {
        kind: "p",
        text: "Five moves cover almost every PSDA question. Desmos does the arithmetic — your job is picking the move.",
      },
      {
        kind: "steps",
        items: [
          "**Percent of:** x% of y = (x/100) · y. **Percent change** = (new − old) ÷ **old**. The divisor is always the ORIGINAL.",
          "**Working backward from a % change:** original = final ÷ (1 ± rate). After 20% off, price = original × 0.80, so original = price ÷ 0.80. **Never** \"add the percent back.\"",
          "**Successive percents multiply.** 30% are seniors and 40% of the seniors vote → 0.30 × 0.40 = 12%. Never add.",
          "**Mean and median are different animals.** Mean: sum ÷ count — and the useful direction is sum = mean × count. Median: middle of the ORDERED list. Outliers drag the mean, not the median.",
          "**Probability: read the denominator out of the words.** \"Of the students who do NOT play a sport…\" — your world shrinks to those students.",
        ],
      },
      {
        kind: "p",
        text: "Also: a margin of error only brackets the true value (54% ± 4 → plausibly 50 to 58). A sample only speaks for the population it was drawn from — people surveyed at a gym do not stand for the whole city.",
      },
    ],
    watch:
      "Answering the question the problem didn't ask. Find what is asked for (the sugar, not the flour; the original price, not the sale price) before touching Desmos.",
  },

  "week1-day4": {
    minutes: 3,
    blocks: [
      {
        kind: "steps",
        items: [
          "**Find the real subject.** A singular subject hides behind a plural phrase: \"The pattern of stripes … **is**.\" Cross out every \"of the ___\" phrase before matching the verb. *The number of* → singular. *Each, every, neither* → singular.",
          "**Match the timeline, not the nearest verb.** *Since 2019* → has + verb. *By the time X happened* → had + verb. *If X had happened, Y would have happened.* Look for the time cue — there always is one.",
          "**Pronouns:** *its* = belonging to it; *it's* = it is. *Whose* = belonging to whom; *who's* = who is. An organization (museum, orchestra, committee) is **it**, not they.",
          "**An opening phrase describes the very next noun.** \"Illuminated by ultraviolet light, **the ink** became legible\" — the ink was illuminated, so it works. If the next noun didn't do (or receive) the action, the modifier dangles.",
        ],
      },
      { kind: "heading", text: "Transitions (the last 4 questions)" },
      {
        kind: "p",
        text: "Cover the choices. Decide how the second sentence relates to the first — *result*, *contrast*, *example*, *addition*, or *concession* — and only then find the word that names it.",
      },
      {
        kind: "bullets",
        items: [
          "Result: *consequently, therefore, as a result*",
          "Contrast: *however, by contrast*",
          "Example: *for instance*",
          "Concession (\"despite that\"): *even so, nevertheless*",
          "Restatement: *in other words*",
        ],
      },
    ],
    watch:
      "Trusting your ear. The distance between subject and verb is designed to make the wrong verb sound right — cross out the phrases instead. On Transitions, the trap is a formal-sounding word that names the wrong relationship.",
  },

  "week1-day5": {
    minutes: 3,
    blocks: [
      { kind: "heading", text: "Words in Context (the first 8)" },
      {
        kind: "p",
        text: "The passage always contains the answer; the vocabulary is the distractor.",
      },
      {
        kind: "steps",
        items: [
          "Cover the choices. Read the passage and say your OWN word for the blank.",
          "Find the clue — a contrast (*although, but, rather than, yet*), a restatement (after a colon or dash), or an example.",
          "Pick the choice nearest your word. Judge the words you know first — a word you don't know is not automatically the answer, and a known word that fits is never wrong.",
          "Add every unknown word from today to your vocabulary list — choices too, not just answers.",
        ],
      },
      { kind: "heading", text: "Text Structure and Purpose (the last 4)" },
      {
        kind: "p",
        text: "The question is never \"what does it say\" but \"what is it DOING\": introducing, challenging, conceding, illustrating. Give each sentence a verb — it *sets up*, *complicates*, *admits*, *proves*. Wrong answers describe things the passage never does.",
      },
    ],
    watch:
      "Choosing a word because it sounds sophisticated. The clue in the passage outranks everything.",
  },

  "week1-day6": {
    minutes: 3,
    blocks: [
      {
        kind: "p",
        text: "One discipline: **the answer must be provable from the passage alone.** The most tempting wrong answer is usually TRUE — just not established by this text.",
      },
      {
        kind: "bullets",
        items: [
          "**Main idea:** state the point in your own ten words, THEN look at the choices. Wrong answers promote a detail, exaggerate the claim (\"some ecologists argue\" ≠ \"beekeeping is destroying cities\"), or say something the passage never does.",
          "**Support / weaken:** restate exactly what the claim asserts. The right finding bears on THAT claim, not the general topic.",
          "**Logical completion (\"therefore ___\"):** the blank must follow from what is given. Prefer the modest conclusion the text earns over the grand one it doesn't.",
          "**Data in prose:** compare SHARE (percent) and COUNT separately — one can rise while the other falls.",
        ],
      },
    ],
    watch:
      "Picking the choice that is true in the real world instead of the one the passage proves. Every answer must point back at a sentence.",
  },
};

/* ------------------------------------------------------------ references */

export const RULES_SHEET: Block[] = [
  { kind: "heading", text: "Step 1 — split the sentence at the blank" },
  { kind: "p", text: "Cover the choices. Ask of each side: could it stand alone?" },
  {
    kind: "rows",
    rows: [
      {
        left: "Complete",
        right: "Complete",
        use: "`.`  `;`  `, and/but/so/yet`",
        never: "comma alone · nothing · \", however\"",
      },
      {
        left: "Complete",
        right: "List, definition, or explanation",
        use: "`:` or `—`",
        never: "`;` `.` (they strand a fragment)",
      },
      {
        left: "Incomplete (*because, although, when…*)",
        right: "Anything",
        use: "comma or nothing",
        never: "`.` `;` `:`",
      },
      {
        left: "Complete",
        right: "Dependent clause (*because, which, who…*)",
        use: "comma or nothing",
        never: "`.` `;` `:`",
      },
    ],
  },
  { kind: "heading", text: "Step 2 — equivalences" },
  {
    kind: "bullets",
    items: [
      "`;` **=** `.` If two choices join the same complete sentences with `;` and `.`, both are wrong.",
      "`:` and `—` can both introduce an explanation after a complete sentence. If both appear, look for what else differs.",
      "*However / therefore / moreover* are **not** joining words. Sentence + \", however,\" + sentence is always a splice.",
    ],
  },
  { kind: "heading", text: "Step 3 — pairs must match" },
  {
    kind: "bullets",
    items: [
      "`, … ,`   `— … —`   `( … )`",
      "Lift-out test: delete the fenced phrase. Same meaning → non-essential, fence **both** sides. Sentence breaks or changes who it is about → essential, **no** fences.",
      "Opened with a dash, closed with a comma = wrong. Every time.",
      "*that*-clauses: essential, no comma. *which*-clauses: non-essential, comma. Never \", that\".",
    ],
  },
  { kind: "heading", text: "Step 4 — where NO punctuation belongs" },
  {
    kind: "bullets",
    items: [
      "Between a subject and its verb — however long the subject runs.",
      "Between a verb and its object, even with a short phrase between (\"announced on Friday that…\").",
      "After *including*, *such as*, or a verb like *is* before a list.",
    ],
  },
  { kind: "heading", text: "Verbs, pronouns, modifiers" },
  {
    kind: "bullets",
    items: [
      "Cross out prepositional phrases; match the verb to what is left. *The number of* → singular. *Each / every / neither* → singular.",
      "*since 2019* → **has/have** + verb · *by the time X-ed* → **had** + verb · if X **had** happened, Y **would have** happened.",
      "*it's* = it is · *its* = possessive · *who's* = who is · *whose* = possessive. Expand the contraction; see if the sentence survives.",
      "An organization (museum, committee, orchestra, city) = **it**, singular.",
      "The noun right after an opening phrase must be the thing the phrase describes.",
    ],
  },
];

export const PSDA_CARD: string[] = [
  "x% of y = (x/100)·y. **Percent change = (new − old) ÷ old.**",
  "Undo a percent by **dividing**: original = final ÷ (1 ± rate). Never \"add the percent back.\"",
  "Successive percents **multiply**: 30% of members, 40% of those → 12%.",
  "Ratio 3 : 2 → think **parts**: total ÷ (3+2) = one part.",
  "Rate = amount ÷ time. Write the units down; they tell you what to divide.",
  "Mean questions: convert to the **sum** (sum = mean × count), adjust the sum, divide back.",
  "Median = middle of the **ordered** list. Outliers move the mean, not the median.",
  "Probability denominators come from the **words**: \"of the students who don't…\" shrinks the world to that group.",
  "Margin of error: estimate ± MoE is the plausible range for the TRUE value. It says nothing else.",
  "A sample speaks only for the population it was drawn from. One location or volunteers = biased, and a bigger sample does not fix bias.",
  "Slope of best fit = change in y per 1 unit of x — **in y's stated units** (\"in thousands\" matters). Intercept = predicted y at x = 0.",
];
