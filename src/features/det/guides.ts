import type { TaskGuide, DetTaskId } from "./types";

/**
 * The eight open-response task guides. Source of truth for this content is
 * ~/sarem_projects/SAT/DET_PRACTICE_SPEC.md — keep the two in step.
 *
 * Timings marked [OFFICIAL] in the spec: Interactive Speaking (6–8 turns,
 * 35 s, no prep). Everything else is [REPORTED] — consistent across prep
 * sources but unconfirmed on an official page. Minimum-submit times are the
 * least certain; confirm with one run of the official practice test.
 */

const PRP_STEPS = [
  {
    label: "Position",
    job: "Answer the question in your first sentence.",
    starters: ["I firmly believe that …", "In my view, … , provided that …"],
  },
  {
    label: "Reason 1 + example",
    job: "Your strongest point, made concrete.",
    starters: ["The most compelling reason is that …", "When I …, I learned …"],
  },
  {
    label: "Reason 2 + example",
    job: "A different angle, not a repeat.",
    starters: ["Moreover, …", "Beyond that, …", "A case in point is …"],
  },
  {
    label: "Concession",
    job: "Admit the other side, then answer it.",
    starters: ["Admittedly, …", "This concern is reasonable; however, …"],
  },
  {
    label: "Conclusion",
    job: "One sentence, in new words.",
    starters: ["In short, …", "All things considered, …"],
  },
];

export const GUIDES: TaskGuide[] = [
  /* ============================================================ WRITING */
  {
    id: "write_about_photo",
    name: "Write About the Photo",
    modality: "writing",
    appears: "3 times",
    prepSeconds: 0,
    responseSeconds: 60,
    minSubmitSeconds: 0,
    targetMin: 30,
    targetMax: 45,
    sentToColleges: false,
    summary: "Describe a photo in writing. One minute, no preparation time.",
    focus: "Precise vocabulary, accurate grammar, and saying something beyond a list of objects.",
    structureName: "O-D-I",
    steps: [
      {
        label: "Overview",
        job: "Who, doing what, where — one sentence.",
        starters: ["A young woman is …ing … in what appears to be …", "This photo shows …"],
      },
      {
        label: "Detail",
        job: "One or two specifics, with their position.",
        starters: ["Behind her, …", "In the foreground, …", "On the left, … is/are …"],
      },
      {
        label: "Inference",
        job: "One careful guess — hedged, never stated as fact.",
        starters: ["Judging by …, she is presumably …", "This suggests that …", "It appears that …"],
      },
    ],
    strategies: [
      "Start typing within 5 seconds. There is no prep time — deciding is the prep.",
      "Present continuous for actions (is adjusting); present simple for states (the wall is lined with).",
      "Put your one complex sentence in the Inference step. A “which suggests…” clause is safe and scores.",
      "Name things precisely: workshop, not room; crouching, not sitting.",
      "Stop writing at 50 seconds. Use the last 10 to fix spelling — the real test has no spellcheck.",
    ],
    mistakes: [
      "Listing objects: “There is a bike. There is a wall.”",
      "One long run-on sentence.",
      "Stating guesses as facts.",
      "An unfinished final sentence when time runs out.",
    ],
    models: [
      {
        title: "Model answer — 42 words",
        prompt: "Photo: a woman repairing a bicycle in a workshop.",
        text:
          "A young woman is crouching beside an upturned bicycle, carefully adjusting its rear wheel in a small workshop. Behind her, tools are neatly arranged on the wall, which suggests she works here regularly. Judging by her focused expression, she is clearly experienced.",
        notes: [
          { criterion: "Content", where: "Overview + detail + inference — goes beyond description." },
          { criterion: "Vocabulary", where: "crouching, upturned, adjusting, neatly arranged — precise, not fancy." },
          {
            criterion: "Grammar",
            where: "Participle phrase (carefully adjusting…), relative clause (which suggests…), fronted phrase (Judging by…) — three patterns, zero errors.",
          },
        ],
      },
    ],
  },
  {
    id: "interactive_writing",
    name: "Interactive Writing",
    modality: "writing",
    appears: "Once, in two parts",
    prepSeconds: 30,
    responseSeconds: 300,
    part2Seconds: 180,
    minSubmitSeconds: 180,
    targetMin: 110,
    targetMax: 150,
    part2TargetMin: 50,
    part2TargetMax: 80,
    sentToColleges: false,
    summary:
      "Write a response to a prompt in 5 minutes, then answer a follow-up question in 3 more minutes.",
    focus: "Development (reasons with examples), clear paragraphs and connectors, grammatical range, accuracy.",
    structureName: "P-R-R-C-C, then Link-New-Example-Close",
    steps: PRP_STEPS,
    part2Steps: [
      { label: "Link", job: "Connect to what you wrote in part 1.", starters: ["Building on that, …"] },
      { label: "New point", job: "Something part 1 did not cover.", starters: ["One practical way would be …"] },
      { label: "Example", job: "Make it concrete.", starters: ["For example, …"] },
      { label: "Close", job: "One sentence that ties it off.", starters: ["This way, …"] },
    ],
    strategies: [
      "Use the 30-second prep to choose your position and two reasons. Nothing more.",
      "Position in the first sentence. Never open by restating the question.",
      "Plan one complex sentence per paragraph: a conditional in Reason 1, a concession clause in paragraph 4.",
      "Part 2: do not recycle part 1's vocabulary — the grader measures variety across both parts.",
      "If time is short, drop Reason 2 — never the Concession or Conclusion.",
      "Keep 45 seconds at the end to proofread: verb endings, articles, spelling.",
    ],
    mistakes: [
      "No paragraphs.",
      "Repeating the same connector (also… also…).",
      "Memorized template sentences that ignore the prompt — relevance is checked.",
      "Stopping at 3 minutes with 80 words.",
    ],
    models: [
      {
        title: "Model follow-up (part 2) — 66 words",
        prompt: "How should schools make sure the service is meaningful?",
        text:
          "Building on that, schools can keep service meaningful by asking students to reflect on it rather than simply counting hours. One practical way would be a short presentation at the end of the term, in which each student explains what they did and what it changed in them. This way, the requirement rewards genuine engagement, not just attendance, and students learn from one another's experiences.",
        notes: [
          { criterion: "Content", where: "Adds a new idea (reflection) instead of repeating part 1." },
          { criterion: "Coherence", where: "Link → new point → example → close, each signposted." },
          { criterion: "Grammar", where: "Relative clause (in which each student…), noun clause (what they did)." },
        ],
      },
    ],
  },
  {
    id: "writing_sample",
    name: "Writing Sample",
    modality: "writing",
    appears: "Once",
    prepSeconds: 30,
    responseSeconds: 300,
    minSubmitSeconds: 180,
    targetMin: 120,
    targetMax: 160,
    sentToColleges: true,
    summary: "An essay-style answer in 5 minutes. Colleges receive this exact text.",
    focus: "Development (reasons with examples), clear paragraphs and connectors, grammatical range, accuracy.",
    structureName: "P-R-R-C-C",
    steps: PRP_STEPS,
    strategies: [
      "Prep time: decide position + two reasons. Do not draft sentences.",
      "Personal examples are faster to write than invented statistics, and read as more genuine.",
      "One planned complex sentence per paragraph — never improvise inversion.",
      "Replace good / bad / important / a lot on sight: beneficial / detrimental / crucial / considerable.",
      "Timing: write 0:00–3:45, proofread the last 0:45.",
    ],
    mistakes: [
      "No paragraphs.",
      "Opening with a restatement of the question.",
      "Memorized template sentences that ignore the prompt.",
      "An unfinished essay — missing conclusion costs coherence points.",
    ],
    models: [
      {
        title: "Model answer — 158 words",
        prompt: "Should students be required to do community service before graduating?",
        text:
          "I firmly believe that community service should be a graduation requirement, provided that students are free to choose where they serve.\n\nThe most compelling reason is that service teaches what classrooms cannot. When I spent a month tutoring younger children in my neighborhood, I learned more about patience and clear communication than any textbook had taught me. Had I not been pushed to volunteer, I would never have discovered that I enjoy teaching.\n\nMoreover, compulsory service exposes students to realities beyond their own circle. A teenager who has served meals at a shelter is far less likely to dismiss poverty as someone else's problem.\n\nAdmittedly, critics argue that forced volunteering is a contradiction, and that resentful students help no one. This concern is reasonable; however, it is largely resolved when students select causes they genuinely care about.\n\nIn short, a modest service requirement benefits both students and their communities, and schools should not hesitate to adopt it.",
        notes: [
          { criterion: "Content", where: "Clear position, two developed reasons, a real example, the other side addressed." },
          { criterion: "Coherence", where: "Five paragraphs, one job each; connectors vary: Moreover · Admittedly · however · In short." },
          { criterion: "Vocabulary", where: "compelling, compulsory, dismiss, resentful, modest — accurate and natural." },
          {
            criterion: "Grammar",
            where: "Inverted third conditional (Had I not been…), relative clause (who has served…), provided that clause, correct semicolon.",
          },
        ],
      },
    ],
  },
  {
    id: "summarize_conversation",
    name: "Summarize the Conversation",
    modality: "writing",
    appears: "Twice",
    prepSeconds: 45, // reading time in this app; on the real test you listen
    responseSeconds: 75,
    minSubmitSeconds: 0,
    targetMin: 40,
    targetMax: 60,
    sentToColleges: false,
    summary:
      "Summarize a conversation in 75 seconds. On the real test you hear it; here you read it once, then it disappears.",
    focus: "Accurate content and compression — the purpose and the outcome, not the dialogue.",
    structureName: "W-D-O",
    steps: [
      {
        label: "Who + why",
        job: "The speakers and the purpose of the conversation.",
        starters: ["A student spoke with her professor about …", "In this conversation, a student asked … for help with …"],
      },
      {
        label: "Discussion",
        job: "The problem and the key point raised.",
        starters: ["She explained that … , and the professor pointed out that …"],
      },
      {
        label: "Outcome",
        job: "What was decided, or what happens next.",
        starters: ["In the end, they agreed that …", "The professor recommended that she …"],
      },
    ],
    strategies: [
      "While reading, hold three things: purpose, problem, outcome. Everything else is noise.",
      "Past tense, third person, reported speech. Never “I”, never quotation marks.",
      "Reporting verbs carry the score: explained, suggested, recommended, pointed out, agreed, advised.",
      "75 seconds = three sentences. Do not attempt a fourth.",
    ],
    mistakes: [
      "Retelling the conversation line by line.",
      "Writing as one of the speakers.",
      "Missing the outcome.",
      "An unfinished last sentence.",
    ],
    models: [
      {
        title: "Model answer — 52 words",
        prompt: "A student asks a professor for an extension because of a lab-schedule clash.",
        text:
          "A student spoke with her professor about extending the deadline for her research paper. She explained that a rescheduled chemistry lab had taken up most of her week, and the professor pointed out that the policy normally allows only two extra days. In the end, he agreed to a three-day extension, provided that she submitted an outline first.",
        notes: [
          { criterion: "Content", where: "Purpose, problem, outcome — all three, nothing extra." },
          { criterion: "Coherence", where: "One sentence per job; In the end signals the resolution." },
          { criterion: "Grammar", where: "Reported speech with correct backshift (had taken up), provided that clause." },
        ],
      },
    ],
  },

  /* =========================================================== SPEAKING */
  {
    id: "speak_about_photo",
    name: "Speak About the Photo",
    modality: "speaking",
    appears: "Once",
    prepSeconds: 20,
    responseSeconds: 90,
    minSubmitSeconds: 30,
    targetMin: 75,
    targetMax: 90,
    sentToColleges: false,
    summary: "Describe a photo aloud: 20 seconds to look, then up to 90 seconds to speak.",
    focus: "Fluency (steady pace, few fillers), vocabulary, and speaking for the full time.",
    structureName: "O-F-B-M-P",
    steps: [
      { label: "Overview (~10 s)", job: "The whole scene in one sentence.", starters: ["This photo shows …", "What we can see here is …"] },
      { label: "Foreground (~20 s)", job: "The main people or objects.", starters: ["In the foreground, …", "The first thing that catches my eye is …"] },
      { label: "Background (~20 s)", job: "What is behind them.", starters: ["Behind them, …", "In the background, I can make out …"] },
      { label: "Mood + inference (~20 s)", job: "The atmosphere and a careful guess.", starters: ["The atmosphere seems …", "Judging by …, I would guess that …"] },
      { label: "Personal link (~15 s)", job: "Your safety net when description runs dry.", starters: ["This reminds me of …", "If I were there, I would …"] },
    ],
    strategies: [
      "Use the 20 seconds to pick three nouns and two adjectives you will definitely say. Words, not sentences.",
      "Aim to still be speaking at 75 seconds. Stopping at 35 is the most common way to lose points.",
      "Pace over speed: 120–150 words a minute. Pause at commas, never mid-phrase.",
      "Lost a word? Describe around it (the thing used for…) and keep moving. Silence costs more than imprecision.",
    ],
    mistakes: ["Stopping early.", "um… and… um… and chains.", "Describing in a flat list.", "Restarting sentences."],
    models: [
      {
        title: "Model answer — about 85 seconds",
        prompt: "Photo: a busy outdoor vegetable market.",
        text:
          "This photo shows a lively outdoor market, probably early in the morning, since the light is still soft. In the foreground, a vendor in a green apron is handing a paper bag to a customer, and both of them are smiling, so I'd guess they know each other well. The stall in front of them is piled high with tomatoes, peppers and leafy greens, all arranged in neat rows. Behind them, I can make out several more stalls under striped umbrellas, and a few shoppers who are wandering between them with baskets. The atmosphere seems relaxed but busy at the same time — it's the kind of place where people come not only to shop but also to catch up with their neighbors. This actually reminds me of the market near my home, where my mother buys vegetables every weekend. If I were there, I would probably head straight for the fruit, because everything looks incredibly fresh.",
        notes: [
          { criterion: "Content", where: "Moves from description to inference to a personal response." },
          { criterion: "Vocabulary", where: "lively, piled high, leafy greens, wandering, catch up with." },
          { criterion: "Fluency", where: "Signposts (In the foreground · Behind them · This reminds me) give natural breathing points." },
        ],
      },
    ],
  },
  {
    id: "read_then_speak",
    name: "Read, Then Speak",
    modality: "speaking",
    appears: "Once",
    prepSeconds: 20,
    responseSeconds: 90,
    minSubmitSeconds: 30,
    targetMin: 75,
    targetMax: 90,
    sentToColleges: false,
    summary: "A topic with 3–4 guiding questions that stay on screen. 20 seconds to read, up to 90 to speak.",
    focus: "Development, fluency over a long turn, vocabulary range.",
    structureName: "Walk the bullets",
    steps: [
      { label: "Question 1", job: "Two or three sentences.", starters: ["The experience I'd like to talk about is …"] },
      { label: "Question 2", job: "Two or three sentences.", starters: ["What made it difficult was …"] },
      { label: "Question 3", job: "Two or three sentences.", starters: ["The way I handled it was …"] },
      { label: "Question 4 + close", job: "Answer it, then one closing sentence.", starters: ["Looking back, …"] },
    ],
    strategies: [
      "The guiding questions ARE your outline. Answer them in order.",
      "Prep time is for choosing your story, not your sentences.",
      "Past tense for the story, present for reflection — range arrives by itself.",
      "Replace um with a silent half-second pause or: well · actually · what I mean is.",
    ],
    mistakes: ["Skipping a guiding question.", "Stopping well before 75 seconds.", "Trailing off without a close."],
    models: [
      {
        title: "Model answer — about 80 seconds",
        prompt:
          "Talk about a time you learned something difficult. What was it? Why was it difficult? How did you learn it? How did you feel afterwards?",
        text:
          "The experience I'd like to talk about is learning to swim, which I only did at the age of thirteen. What made it difficult was that I was genuinely afraid of deep water, so every time the instructor asked me to let go of the wall, I froze. On top of that, everyone else in the class was much younger than me, which was a little embarrassing. The way I learned, in the end, was by breaking it into tiny steps. First I practiced floating, then kicking with a board, and only after a few weeks did I try to swim a full length. My instructor never rushed me, and that made a huge difference. Looking back, I felt incredibly proud the first time I crossed the pool, and more importantly, it taught me that fear usually shrinks when you face it in small pieces.",
        notes: [
          { criterion: "Content", where: "Answers all four questions in order." },
          { criterion: "Grammar (heard)", where: "Relative clauses, inversion (only after a few weeks did I…)." },
          { criterion: "Fluency", where: "Each question's starter gives a clean transition." },
        ],
      },
    ],
  },
  {
    id: "interactive_speaking",
    name: "Interactive Speaking",
    modality: "speaking",
    appears: "Once — 6 to 8 turns",
    prepSeconds: 0,
    responseSeconds: 35,
    minSubmitSeconds: 0,
    targetMin: 25,
    targetMax: 32,
    sentToColleges: false,
    summary:
      "A character asks 6–8 questions, each played once. 35 seconds per answer, no preparation. [OFFICIAL]",
    focus: "A fast start, staying relevant to this question, finishing the thought inside 35 seconds.",
    structureName: "A-R-E",
    steps: [
      { label: "Answer (~5 s)", job: "Echo the question's words.", starters: ["Definitely …", "Honestly, I'd say …", "It depends, but mostly …"] },
      { label: "Reason (~12 s)", job: "One reason.", starters: ["The main reason is that …", "That's because …"] },
      { label: "Example (~12 s)", job: "One concrete example.", starters: ["For instance, last month …", "Take my school, for example —"] },
    ],
    strategies: [
      "Begin within two seconds by echoing the question: “Do you prefer…?” → “I definitely prefer…”.",
      "One reason, one example. Two half-developed reasons score below one full one.",
      "Finish your sentence by 32 seconds.",
      "Missed part of the question? Answer the topic you did hear. Never stay silent.",
      "Do not memorize answers — follow-ups are built from what you just said.",
    ],
    mistakes: ["One-sentence answers.", "Long silent thinking at the start.", "Drifting off-topic.", "Being cut off mid-sentence every turn."],
    models: [
      {
        title: "Model turn — about 30 seconds",
        prompt: "Do you prefer studying alone or with other people?",
        text:
          "Honestly, I prefer studying alone, at least for the first round. The main reason is that I need silence to really understand a new idea, and in a group I tend to nod along without actually getting it. For instance, when I was preparing for my last math exam, I worked through every chapter alone, and only then met my friends to compare answers. That combination worked really well.",
        notes: [
          { criterion: "Content", where: "Answer, one reason, one example — complete in 30 seconds." },
          { criterion: "Fluency", where: "Starts immediately by echoing the question." },
        ],
      },
    ],
  },
  {
    id: "speaking_sample",
    name: "Speaking Sample",
    modality: "speaking",
    appears: "Once",
    prepSeconds: 30,
    responseSeconds: 180,
    minSubmitSeconds: 60,
    targetMin: 120,
    targetMax: 165,
    sentToColleges: true,
    summary: "Speak for up to 3 minutes on one prompt. Colleges receive this video.",
    focus: "Development, fluency over a long turn, vocabulary range — and sounding like yourself.",
    structureName: "P-S-E-C-C",
    steps: [
      { label: "Position (~15 s)", job: "Your view, nuanced.", starters: ["I'd say that …", "My honest view is that …"] },
      { label: "Story (~45 s)", job: "One real memory.", starters: ["Let me give you an example from my own life. A couple of years ago, …"] },
      { label: "Extend (~40 s)", job: "Beyond your own case.", starters: ["And it's not just me — …", "More generally, …"] },
      { label: "Counterpoint (~30 s)", job: "The other side, answered.", starters: ["Of course, some people would say … , and they have a point. But …"] },
      { label: "Conclusion (~15 s)", job: "Close it.", starters: ["So, all things considered, …"] },
    ],
    strategies: [
      "Prep time is for choosing your story. One real memory carries 45 seconds effortlessly.",
      "Target 2:00–2:45. Under 1:30 looks thin; you do not need the full 3:00.",
      "It is recorded on video for colleges: look at the camera, sit in good light, read nothing.",
      "Use: well · actually · what I mean is — instead of um.",
    ],
    mistakes: ["A memorized speech that ignores the prompt.", "Trailing off without a conclusion.", "Racing."],
    models: [
      {
        title: "Model answer — about 2 min 20 s",
        prompt: "Has technology made people less social?",
        text:
          "My honest view is that technology hasn't made us less social — it has changed what being social looks like, and whether that's good or bad depends on how we use it.\n\nLet me give you an example from my own life. My closest cousin moved abroad three years ago, and if this had happened twenty years earlier, we would probably have lost touch. Instead, we talk almost every week. We send each other voice messages, we study together on video calls, and last year she even helped me prepare for an exam from another continent. So for me, technology has protected a relationship that distance would otherwise have ended.\n\nAnd it's not just me. Think about people with rare hobbies or unusual interests. Someone who loves astronomy in a small town might never meet another enthusiast in person, but online they can find a whole community. That's a kind of social life that simply didn't exist before.\n\nOf course, some people would say that we now sit at the same table staring at different screens, and they have a point. I've seen family dinners where nobody speaks. But I'd argue that's a problem of habits, not of technology itself. A phone doesn't force anyone to ignore the person next to them.\n\nSo, all things considered, I believe technology is a tool that can connect or isolate us. What matters most is whether we're disciplined enough to put it down when someone is sitting right in front of us.",
        notes: [
          { criterion: "Content", where: "Nuanced position, personal story, general example, counterpoint answered." },
          { criterion: "Fluency", where: "Spoken signposts: Let me give you · And it's not just me · Of course · So." },
          { criterion: "Grammar (heard)", where: "Third conditional, relative clauses, cleft (What matters most is…)." },
        ],
      },
    ],
  },
];

export const GUIDE_BY_ID = new Map<DetTaskId, TaskGuide>(GUIDES.map((g) => [g.id, g]));

export function getGuide(id: string): TaskGuide | undefined {
  return GUIDE_BY_ID.get(id as DetTaskId);
}

/** Recommended practice order from the spec — writing first, it is her lowest subscore. */
export const PRACTICE_ORDER: DetTaskId[] = [
  "writing_sample",
  "interactive_writing",
  "write_about_photo",
  "summarize_conversation",
  "speaking_sample",
  "read_then_speak",
  "interactive_speaking",
  "speak_about_photo",
];
