// Full Mock 2 — Reading and Writing, Modules 1 and 2. 27 questions per module.
//
// Domain mix follows official weightings: Craft and Structure 8, Information
// and Ideas 7, Standard English Conventions 7, Expression of Ideas 5 per
// module. Module 2 is written as the UPPER adaptive module.
//
// Vocabulary questions deliberately use high-utility academic words that recur
// on official exams (drawn from the Princeton Review 2026 "Greatest Hits"
// list) rather than obscure ones — that is how the digital SAT tests words.
//
// All passages and questions are original; they do not reproduce College Board
// items. Passages are short with one question each, matching the digital
// format. No question depends on a chart image: quantitative questions state
// their figures in prose.

export const MOCK2_RW_1 = [
  // ================= Craft and Structure (8) =================
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "easy",
    type: "mc",
    passage:
      "For decades the fossil was described as a juvenile of a well-known species. A 2019 reanalysis of its bone microstructure showed it was fully grown, which _______ the original classification and forced a new species name.",
    prompt: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["undermined", "confirmed", "postponed", "summarised"],
    ans: "A",
    exp: "The reanalysis contradicted the old classification and forced a change, so it weakened it. 'Confirmed' reverses the relationship, which the words 'forced a new species name' rule out.",
  },
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "medium",
    type: "mc",
    passage:
      "Historians long relied on a single memoir for their account of the siege. Recently uncovered letters from three merchants describe the same shortages and the same failed negotiation, which serves to _______ the memoir's account rather than replace it.",
    prompt: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["corroborate", "complicate", "abbreviate", "supersede"],
    ans: "A",
    exp: "Independent sources describing the same events provide supporting evidence, which is what 'corroborate' means. 'Supersede' is ruled out directly by 'rather than replace it'.",
  },
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "medium",
    type: "mc",
    passage:
      "The connection the author draws between the two rebellions rests on a single ambiguous phrase in one letter. Without further documentation, the link remains _______, however appealing the parallel may be.",
    prompt: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["tenuous", "conventional", "deliberate", "widespread"],
    ans: "A",
    exp: "A link resting on one ambiguous phrase and lacking documentation is weak, which is precisely what 'tenuous' means. 'Conventional' would describe how ordinary the claim is, not how well supported it is.",
  },
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "hard",
    type: "mc",
    passage:
      "Critics praised the novel's dialogue for its _______: characters interrupt each other, trail off, and repeat themselves in ways that reproduce the texture of unscripted speech without ever becoming tedious to read.",
    prompt: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["verisimilitude", "brevity", "formality", "ambivalence"],
    ans: "A",
    exp: "The colon explains the praise as dialogue that reproduces how real speech sounds, and 'verisimilitude' means the appearance of being true to life. 'Brevity' is tempting because of 'trail off', but the passage describes repetition, not shortness.",
  },
  {
    d: "craft_structure",
    s: "text_structure_purpose",
    diff: "medium",
    type: "mc",
    passage:
      "Rooftop gardens are often promoted as a way to cool cities. They do lower the temperature of the roof beneath them, sometimes markedly. But a roof is a small fraction of a building's exposed surface, and measurements at street level rarely show any change at all. The benefit is real; it is simply located somewhere other than where it is usually claimed to be.",
    prompt: "What is the main purpose of the text?",
    choices: [
      "To argue that rooftop gardens should not be built in cities",
      "To correct where the cooling benefit of rooftop gardens actually occurs",
      "To compare rooftop gardens with other methods of cooling buildings",
      "To explain the engineering required to install a rooftop garden",
    ],
    ans: "B",
    exp: "The text grants that the cooling is real and then relocates it from the street to the roof itself, which the final sentence states outright. Choice A overstates the point: the passage never recommends against building them.",
  },
  {
    d: "craft_structure",
    s: "text_structure_purpose",
    diff: "hard",
    type: "mc",
    passage:
      "The following is adapted from a short story. Every evening Tesfaye counted the till twice, though the shop took so little that a single count would have done. The second count was not for the money. It was for the ten minutes it bought him at the counter, after the door was locked and before the walk home.",
    prompt: "What is the main function of the final sentence in the text as a whole?",
    choices: [
      "It reveals that the character's ritual serves a purpose unrelated to its stated one.",
      "It suggests that the character suspects someone of stealing from the shop.",
      "It establishes that the shop is more profitable than it first appears.",
      "It explains why the character prefers to work alone in the evenings.",
    ],
    ans: "A",
    exp: "The passage sets up a redundant task and then explains that its real value is the time it buys him alone, not the accuracy of the count. Choice B contradicts 'The second count was not for the money'.",
  },
  {
    d: "craft_structure",
    s: "cross_text_connections",
    diff: "hard",
    type: "mc",
    passage:
      "Text 1: A widely cited study argues that open-plan offices increase collaboration, because removing physical barriers makes informal conversation easier.\n\nText 2: Researchers fitted employees at two firms with sensors before and after a move to open-plan layouts. Face-to-face interaction fell by roughly 70 percent, while email and messaging volume rose sharply.",
    prompt: "Based on the texts, how would the researchers in Text 2 most likely respond to the argument in Text 1?",
    choices: [
      "By agreeing with it and offering the sensor data as additional support",
      "By pointing out that their measurements show the opposite of the predicted effect",
      "By arguing that collaboration is impossible to measure in any workplace",
      "By noting that the effect appears only in firms of a certain size",
    ],
    ans: "B",
    exp: "Text 1 predicts more in-person collaboration; Text 2 measured a large fall in face-to-face interaction, which directly contradicts that prediction. Choice D invents a limitation the passage never mentions.",
  },
  {
    d: "craft_structure",
    s: "cross_text_connections",
    diff: "hard",
    type: "mc",
    passage:
      "Text 1: A curator argues that returning artefacts to their countries of origin risks dispersing collections that allow scholars to compare objects from many cultures side by side.\n\nText 2: Since receiving several returned bronzes, a national museum has hosted visiting researchers from eleven countries and published a catalogue that scholars abroad had been unable to compile from photographs alone.",
    prompt: "Which choice best describes how Text 2 relates to the concern raised in Text 1?",
    choices: [
      "It confirms the concern by showing that scholarship slowed after the return.",
      "It qualifies the concern by showing that returned objects can still support comparative scholarship.",
      "It restates the concern in more concrete terms.",
      "It dismisses the concern as irrelevant to museums outside Europe.",
    ],
    ans: "B",
    exp: "Text 1 worries that returns will fragment scholarly access; Text 2 shows access continuing, and improving, after a return — which softens the concern without declaring it baseless. Choice D overstates: Text 2 offers evidence rather than dismissal.",
  },

  // ================= Information and Ideas (7) =================
  {
    d: "information_ideas",
    s: "central_ideas_details",
    diff: "easy",
    type: "mc",
    passage:
      "Cuttlefish change colour using pigment sacs controlled directly by muscle. Because no chemical signalling stands between the animal and the change, a cuttlefish can shift its entire appearance in under a second — faster than a chameleon, whose colour change depends on slower hormonal cues.",
    prompt: "Which choice best states the main idea of the text?",
    choices: [
      "Cuttlefish and chameleons use the same mechanism to change colour.",
      "The speed of a cuttlefish's colour change follows from the direct muscular control behind it.",
      "Chameleons change colour for reasons that scientists do not yet understand.",
      "Colour change is more common among marine animals than land animals.",
    ],
    ans: "B",
    exp: "The passage links the mechanism (muscle acting directly, with no chemical step) to the outcome (speed), and uses the chameleon only as a contrast. Choice A contradicts that contrast.",
  },
  {
    d: "information_ideas",
    s: "central_ideas_details",
    diff: "medium",
    type: "mc",
    passage:
      "When a language loses its last fluent speakers, what disappears is not only vocabulary. Many endangered languages encode ecological knowledge in their grammar — obligatory markers for whether a plant is edible, or whether a report is first-hand. Translating the words is straightforward; translating what the grammar required a speaker to know is not.",
    prompt: "Which choice best states the main idea of the text?",
    choices: [
      "Endangered languages are more grammatically complex than widely spoken ones.",
      "Language loss removes knowledge that is built into grammar and resists translation.",
      "Dictionaries are sufficient to preserve a language once its speakers are gone.",
      "Most endangered languages are spoken by communities that rely on local plants.",
    ],
    ans: "B",
    exp: "The text distinguishes vocabulary, which translates easily, from grammatically encoded knowledge, which does not — and identifies the latter as the real loss. Choice C is contradicted by the final sentence.",
  },
  {
    d: "information_ideas",
    s: "evidence_textual",
    diff: "medium",
    type: "mc",
    passage:
      "A historian claims that the city's nineteenth-century sanitation reforms were driven less by medical evidence than by commercial pressure, since the diseases in question had already been described for decades without prompting action.",
    prompt: "Which finding, if true, would most directly support the historian's claim?",
    choices: [
      "Physicians in the city published detailed reports on waterborne disease in the 1840s.",
      "The reforms began within a year of merchants reporting that quarantines were disrupting shipping.",
      "The city's population grew rapidly throughout the nineteenth century.",
      "Similar reforms were adopted in several other cities during the same period.",
    ],
    ans: "B",
    exp: "The claim is about what triggered action, so evidence tying the timing of reform to commercial pressure is what supports it. Choice A supports only the second half of the claim — that medical knowledge existed earlier — without showing what finally caused the change.",
  },
  {
    d: "information_ideas",
    s: "evidence_textual",
    diff: "hard",
    type: "mc",
    passage:
      "In her study of urban foxes, a biologist proposes that boldness around humans is learned within a generation rather than inherited, noting that fox populations in newly urbanised areas become tolerant of people far faster than selection on an inherited trait could plausibly act.",
    prompt: "Which finding, if true, would most directly weaken the biologist's proposal?",
    choices: [
      "Urban foxes approach humans more closely than rural foxes do.",
      "Cubs born to bold urban parents but raised by wary rural foster parents remain bold as adults.",
      "Foxes in newly urbanised areas take about two years to become tolerant of people.",
      "Rural foxes will approach humans when food is scarce.",
    ],
    ans: "B",
    exp: "If boldness persists despite being raised by wary parents, it is travelling with heredity rather than being learned from the environment, which is exactly what the proposal denies. Choice A is consistent with either explanation and so distinguishes nothing.",
  },
  {
    d: "information_ideas",
    s: "evidence_quantitative",
    diff: "hard",
    type: "mc",
    passage:
      "A team measured germination rates for four seed batches stored for five years at different humidity levels. Batch W, stored at 15% humidity, germinated at 88%. Batch X, at 30%, germinated at 71%. Batch Y, at 45%, germinated at 44%. Batch Z, at 60%, germinated at 41%.",
    prompt: "Which statement is best supported by the data?",
    choices: [
      "Germination declined steadily as storage humidity rose, with the sharpest drop between 30% and 45%.",
      "Germination was unaffected by storage humidity across the range tested.",
      "The batch stored at the highest humidity germinated at more than half the rate of the driest batch.",
      "Germination fell by an equal amount with each increase in storage humidity.",
    ],
    ans: "A",
    exp: "The rates fall throughout (88, 71, 44, 41) and the largest single drop is 71 to 44, a fall of 27 points. Choice D is wrong because the drops are 17, 27 and 3 — clearly unequal — and choice C fails since 41 is less than half of 88.",
  },
  {
    d: "information_ideas",
    s: "inferences",
    diff: "medium",
    type: "mc",
    passage:
      "Early radio dramas were performed live, with no means of recording them. Networks kept scripts, sound-effect notes, and contracts, but the broadcasts themselves survive only where a listener happened to point a home disc-cutter at the loudspeaker. Historians of the period therefore _______",
    prompt: "Which choice most logically completes the text?",
    choices: [
      "know more about how these dramas were planned than about how they sounded.",
      "have concluded that early radio dramas were rarely popular with listeners.",
      "consider the surviving home recordings to be of higher quality than studio copies.",
      "have been able to reconstruct complete broadcasts from network archives.",
    ],
    ans: "A",
    exp: "Scripts and production papers survive while the sound almost never does, so the surviving record is far stronger on planning than on performance. Choice D contradicts the statement that broadcasts survive only by accident.",
  },
  {
    d: "information_ideas",
    s: "inferences",
    diff: "hard",
    type: "mc",
    passage:
      "A common assumption holds that species with larger brains relative to body size are better at solving novel problems. Yet among birds, the strongest predictor of success on unfamiliar foraging tasks is not relative brain size but whether the species is a generalist feeder. Several small-brained generalists outperform large-brained specialists. This suggests that _______",
    prompt: "Which choice most logically completes the text?",
    choices: [
      "relative brain size is unrelated to any measure of avian behaviour.",
      "what a species habitually does may shape problem-solving more than how large its brain is.",
      "specialist feeders are unable to learn new foraging techniques.",
      "researchers should stop measuring brain size in comparative studies.",
    ],
    ans: "B",
    exp: "The evidence contrasts a structural trait with an ecological habit and finds the habit more predictive, so the inference concerns what the animal does. Choices A and D overreach: the passage limits itself to one class of task, not to all uses of brain size.",
  },

  // ================= Standard English Conventions (7) =================
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "easy",
    type: "mc",
    passage:
      "The archive holds more than four thousand photographic plates _______ most of them have never been printed.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["; ", ", ", " ", " and, "],
    ans: "A",
    exp: "Both halves are complete sentences, so they need a semicolon or a comma plus a conjunction. A comma alone, as in choice B, creates a comma splice.",
  },
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "medium",
    type: "mc",
    passage:
      "Because the reservoir supplies three districts _______ engineers monitor its level daily throughout the dry season.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [", ", "; ", ": ", " "],
    ans: "A",
    exp: "The opening clause begins with 'Because', making it dependent, so it is joined to the main clause with a comma. A semicolon or colon would require a complete sentence on both sides.",
  },
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "medium",
    type: "mc",
    passage:
      "The 1908 expedition returned with one significant find _______ a fragment of woven cloth preserved in peat.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [": ", "; ", ", and ", " which was "],
    ans: "A",
    exp: "The second part names and explains the 'one significant find', which is exactly the job of a colon after a complete sentence. A semicolon in choice B would require an independent clause after it, and the fragment is not one.",
  },
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "hard",
    type: "mc",
    passage:
      "The composer's final quartet _______ was not performed publicly until 1971.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      ", written in the year before her death,",
      " written in the year before her death,",
      ", written in the year before her death",
      " written in the year before her death",
    ],
    ans: "A",
    exp: "'Written in the year before her death' is extra, non-essential information, so it needs punctuation on both sides. Using only one comma, as in choices B and C, separates the subject from its verb and leaves the interrupter half-enclosed.",
  },
  {
    d: "standard_conventions",
    s: "form_structure_sense",
    diff: "medium",
    type: "mc",
    passage:
      "A collection of letters, diaries, and municipal receipts _______ the only surviving record of the town's founding decade.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["constitutes", "constitute", "have constituted", "were constituting"],
    ans: "A",
    exp: "The subject is 'A collection', which is singular; 'of letters, diaries, and municipal receipts' is a prepositional phrase and cannot govern the verb. The plural nouns just before the blank are what make the plural choices tempting.",
  },
  {
    d: "standard_conventions",
    s: "form_structure_sense",
    diff: "hard",
    type: "mc",
    passage:
      "Having been buried under volcanic ash for seventeen centuries _______ when excavation finally began in 1954.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      "the frescoes retained much of their original colour",
      "excavators found the frescoes had retained much of their original colour",
      "it was found that the frescoes retained much of their original colour",
      "much of the frescoes' original colour had been retained",
    ],
    ans: "A",
    exp: "The opening modifier describes whatever was buried for seventeen centuries, so the frescoes must be the subject that follows it. Choice B makes the excavators the buried party, and choices C and D bury 'it' and 'colour' respectively.",
  },
  {
    d: "standard_conventions",
    s: "form_structure_sense",
    diff: "hard",
    type: "mc",
    passage:
      "By the time the survey team reached the summit ridge, the storm _______ for six hours, and the last of the marker flags had been torn away.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["had been blowing", "has been blowing", "is blowing", "will have been blowing"],
    ans: "A",
    exp: "The storm began before the team arrived, and both events are in the past, so the earlier one takes the past perfect. Choice B shifts to the present perfect, which would tie the storm to now rather than to the moment of arrival.",
  },

  // ================= Expression of Ideas (5) =================
  {
    d: "expression_ideas",
    s: "transitions",
    diff: "medium",
    type: "mc",
    passage:
      "Solar panels generate the most electricity in the middle of the day, while household demand peaks in the early evening. _______ grid operators increasingly pair new solar installations with battery storage.",
    prompt: "Which choice completes the text with the most logical transition?",
    choices: ["For this reason,", "Nevertheless,", "Similarly,", "In contrast,"],
    ans: "A",
    exp: "The mismatch between generation and demand is the reason batteries are added, so the relationship is cause to effect. 'Nevertheless' would signal a concession, but nothing in the second sentence contradicts the first.",
  },
  {
    d: "expression_ideas",
    s: "transitions",
    diff: "hard",
    type: "mc",
    passage:
      "Most models predicted that the reintroduced beavers would take a decade to alter the valley's hydrology. _______ measurable changes in the water table appeared within three years.",
    prompt: "Which choice completes the text with the most logical transition?",
    choices: ["In fact,", "Therefore,", "Likewise,", "For example,"],
    ans: "A",
    exp: "The result contradicts the prediction, and 'In fact' introduces a correction of that kind. 'Therefore' would make the fast change follow from the slow prediction, which reverses the logic.",
  },
  {
    d: "expression_ideas",
    s: "transitions",
    diff: "hard",
    type: "mc",
    passage:
      "The manuscript's marginal notes are written in at least three hands, and the ink of the latest differs chemically from the others. _______ the annotations cannot all be attributed to the original owner, as earlier catalogues assumed.",
    prompt: "Which choice completes the text with the most logical transition?",
    choices: ["Consequently,", "However,", "Meanwhile,", "Admittedly,"],
    ans: "A",
    exp: "The physical evidence about hands and ink leads directly to the conclusion about authorship, so the link is consequence. 'However' would set the conclusion against the evidence, but here it follows from it.",
  },
  {
    d: "expression_ideas",
    s: "rhetorical_synthesis",
    diff: "medium",
    type: "mc",
    passage:
      "While researching, a student has taken these notes:\n• The Tigray region has more than 120 recorded rock-hewn churches.\n• Many are carved into cliff faces reachable only on foot.\n• Their construction dates are debated, ranging from the 6th to the 15th century.\n• Conservation surveys began in earnest only in the 1990s.",
    prompt: "The student wants to emphasise the difficulty of studying these churches. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      "The Tigray region has more than 120 recorded rock-hewn churches, some dating to the 6th century.",
      "Reachable only on foot and surveyed systematically just since the 1990s, Tigray's rock-hewn churches have construction dates still debated across nine centuries.",
      "Tigray's rock-hewn churches were carved into cliff faces, and there are more than 120 of them.",
      "Conservation surveys of the Tigray churches began in the 1990s, and more than 120 churches have been recorded.",
    ],
    ans: "B",
    exp: "The goal is difficulty of study, and only choice B combines the obstacles — hard access, late start, and unresolved dating. The other choices report facts accurately but none of them frames anything as an impediment.",
  },
  {
    d: "expression_ideas",
    s: "rhetorical_synthesis",
    diff: "hard",
    type: "mc",
    passage:
      "While researching, a student has taken these notes:\n• Mycorrhizal fungi attach to plant roots.\n• The fungi supply phosphorus to the plant.\n• The plant supplies sugars to the fungi.\n• Plants grown without the fungi in phosphorus-poor soil grow about 40% smaller.",
    prompt: "The student wants to present the relationship as mutually beneficial. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      "Mycorrhizal fungi attach to plant roots, where they supply phosphorus.",
      "Plants grown without mycorrhizal fungi in phosphorus-poor soil grow about 40% smaller.",
      "Mycorrhizal fungi supply phosphorus to the plants they attach to, and receive sugars in return.",
      "Mycorrhizal fungi and plants are both found in phosphorus-poor soils.",
    ],
    ans: "C",
    exp: "Mutual benefit requires both directions of exchange, and only choice C states what each partner gives and gets. Choice A describes only one direction, and choice B shows a cost of absence rather than a two-way benefit.",
  },
];

export const MOCK2_RW_2 = [
  // ================= Craft and Structure (8) =================
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "medium",
    type: "mc",
    passage:
      "The council's endorsement was carefully worded to commit it to nothing. Members praised the proposal's ambition, noted the need for further study, and set no date — a _______ that satisfied both factions precisely because it obliged neither.",
    prompt: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["compromise", "denunciation", "mandate", "precedent"],
    ans: "A",
    exp: "A statement designed to satisfy two opposed factions by obliging neither is a middle position, which is what 'compromise' names. 'Mandate' would require the council to have ordered something, which the passage says it avoided.",
  },
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "hard",
    type: "mc",
    passage:
      "Once considered _______ by engineers who preferred digital control, the mechanical governor has returned to some turbine designs: it fails gradually and predictably, whereas a failed controller can stop a machine without warning.",
    prompt: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["obsolete", "hazardous", "expensive", "experimental"],
    ans: "A",
    exp: "The contrast is between something set aside in favour of newer technology and its subsequent return, so the word must mean out of date. 'Hazardous' is contradicted by the passage's account of its safer failure mode.",
  },
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "hard",
    type: "mc",
    passage:
      "The distinction the essay draws is _______ but consequential: it separates readers who abandon a book from readers who merely pause, and the two groups turn out to respond to entirely different kinds of recommendation.",
    prompt: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["subtle", "arbitrary", "familiar", "conclusive"],
    ans: "A",
    exp: "The word is set against 'consequential', so it must concede that the distinction is fine or easy to miss while its effects are large. 'Arbitrary' would imply the distinction is groundless, which the evidence about different responses contradicts.",
  },
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "hard",
    type: "mc",
    passage:
      "Reviewers treated the study's central claim as settled, but the author herself was more _______, describing the result as one reading of a noisy data set and calling explicitly for replication.",
    prompt: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["circumspect", "indifferent", "emphatic", "evasive"],
    ans: "A",
    exp: "The author qualifies her own result and asks for replication, which is cautious rather than confident. 'Evasive' wrongly suggests she was avoiding the question, when in fact she stated her uncertainty openly.",
  },
  {
    d: "craft_structure",
    s: "text_structure_purpose",
    diff: "hard",
    type: "mc",
    passage:
      "Standard accounts of the printing revolution emphasise the speed of reproduction. Speed alone, though, does not explain why print reshaped scholarship: hand-copied manuscripts could be produced quickly enough by a large enough scriptorium. What print added was that every copy was identical, so a scholar in one city could cite a page number and be understood in another.",
    prompt: "What is the main purpose of the text?",
    choices: [
      "To argue that manuscripts were produced faster than is generally believed",
      "To replace a common explanation of print's impact with a more precise one",
      "To describe the working conditions inside a medieval scriptorium",
      "To trace the spread of page numbering across European universities",
    ],
    ans: "B",
    exp: "The passage names the standard explanation, shows it insufficient, and substitutes uniformity of copies. Choice A picks up a supporting point — scriptoria could be fast — and mistakes it for the purpose.",
  },
  {
    d: "craft_structure",
    s: "text_structure_purpose",
    diff: "hard",
    type: "mc",
    passage:
      "The following is adapted from a novel. The letter had lain in the drawer for eleven years. Meskerem knew its contents by heart and had never once reread it. She had kept it the way one keeps a key to a house long since sold.",
    prompt: "What is the main function of the simile in the last sentence?",
    choices: [
      "It conveys that the letter is retained out of habit rather than usefulness.",
      "It suggests that the character intends to return to a former home.",
      "It implies that the character has forgotten why she kept the letter.",
      "It indicates that the letter contains legal instructions about property.",
    ],
    ans: "A",
    exp: "A key to a sold house cannot open anything, so keeping it is sentiment or habit rather than practical use — which matches a letter she never rereads. Choice C is ruled out by her knowing the contents by heart.",
  },
  {
    d: "craft_structure",
    s: "cross_text_connections",
    diff: "hard",
    type: "mc",
    passage:
      "Text 1: An economist argues that cash transfers are the most effective form of aid, since recipients understand their own needs better than distant agencies do.\n\nText 2: In a trial across 60 villages, households receiving cash reported better outcomes than those receiving goods on almost every measure. The exception was vaccination rates, which rose only where a clinic was also funded.",
    prompt: "Which choice best describes the relationship between the two texts?",
    choices: [
      "Text 2 refutes the argument in Text 1 by showing that cash transfers rarely help.",
      "Text 2 largely supports Text 1 while identifying an outcome that cash alone did not improve.",
      "Text 2 supports Text 1 by showing that vaccination rates rose wherever cash was given.",
      "Text 2 is unrelated to the argument in Text 1 because it studies villages rather than agencies.",
    ],
    ans: "B",
    exp: "Cash won on almost every measure, which supports the argument, but vaccination required a funded clinic, which marks a limit. Choice C misreads that exception as a confirmation.",
  },
  {
    d: "craft_structure",
    s: "cross_text_connections",
    diff: "hard",
    type: "mc",
    passage:
      "Text 1: A literary scholar contends that an author's letters should not be used to interpret their fiction, since a writer's stated intentions are just one more piece of writing, no more authoritative than the novel itself.\n\nText 2: A biographer notes that in three separate letters the novelist described the ending she had discarded, and that knowing this makes an otherwise puzzling final chapter legible.",
    prompt: "The biographer in Text 2 would most likely respond to Text 1 by arguing that",
    choices: [
      "letters are always more reliable than novels as evidence of meaning.",
      "external documents can resolve difficulties that the fiction alone leaves unexplained.",
      "the scholar in Text 1 has misread the final chapter of the novel.",
      "a novelist's discarded endings are of no interest to literary critics.",
    ],
    ans: "B",
    exp: "Text 2's case rests on the letters making a puzzling chapter legible, which is a claim about usefulness, not about general authority. Choice A overstates it into a blanket ranking the biographer never makes.",
  },

  // ================= Information and Ideas (7) =================
  {
    d: "information_ideas",
    s: "central_ideas_details",
    diff: "medium",
    type: "mc",
    passage:
      "Coral reefs are often described as the rainforests of the sea, but the comparison misleads in one respect. Rainforest soils are rich; reef waters are famously poor in nutrients. A reef's productivity comes not from abundance but from recycling — nutrients pass between coral, algae, and fish so efficiently that very little escapes into open water.",
    prompt: "Which choice best states the main idea of the text?",
    choices: [
      "Coral reefs and rainforests support similar numbers of species.",
      "A reef's productivity depends on efficient recycling rather than on rich surroundings.",
      "Nutrient-poor waters cannot support large populations of fish.",
      "The comparison between reefs and rainforests should be abandoned entirely.",
    ],
    ans: "B",
    exp: "The passage corrects the analogy on one specific point and explains that productivity comes from recycling in nutrient-poor water. Choice D goes further than the text, which limits its objection to 'one respect'.",
  },
  {
    d: "information_ideas",
    s: "central_ideas_details",
    diff: "hard",
    type: "mc",
    passage:
      "It is often said that photography made portrait painting obsolete. The commissions tell a different story. Portrait painting did contract sharply in the 1860s, but it recovered within two decades, having changed its purpose: sitters who wanted a likeness now went to a photographer, and those who went to a painter wanted something a camera could not offer — an interpretation.",
    prompt: "Which choice best states the main idea of the text?",
    choices: [
      "Photography permanently ended the market for painted portraits.",
      "Painted portraiture survived photography by taking on a different function.",
      "Portrait painters in the 1860s adopted photographic techniques.",
      "Photographs were considered more accurate than paintings by most sitters.",
    ],
    ans: "B",
    exp: "The passage concedes the contraction, reports the recovery, and attributes it to a changed purpose — interpretation rather than likeness. Choice A states the very claim the evidence is offered to refute.",
  },
  {
    d: "information_ideas",
    s: "evidence_textual",
    diff: "hard",
    type: "mc",
    passage:
      "A researcher argues that the abandonment of the settlement was gradual and planned rather than sudden, contrary to the long-standing assumption that it was evacuated during a single crisis.",
    prompt: "Which finding, if true, would most directly support the researcher's argument?",
    choices: [
      "A layer of ash covers the uppermost floor surfaces across the site.",
      "Heavy grinding stones were removed from houses, while broken pottery was left in place.",
      "The settlement's population had grown steadily in the preceding century.",
      "Several neighbouring settlements were abandoned during the same period.",
    ],
    ans: "B",
    exp: "Taking valuable, heavy items while leaving worthless ones behind is the signature of an orderly departure with time to choose. Choice A points toward the sudden catastrophe the researcher is arguing against.",
  },
  {
    d: "information_ideas",
    s: "evidence_textual",
    diff: "hard",
    type: "mc",
    passage:
      "A psychologist proposes that the benefit of handwritten notes over typed ones comes from the slowness of handwriting, which forces students to summarise rather than transcribe.",
    prompt: "Which finding, if true, would most directly weaken the psychologist's proposal?",
    choices: [
      "Students who handwrite notes recall more of a lecture a week later than students who type.",
      "Students told to type only summaries recall as much as students who handwrite freely.",
      "Handwriting speed varies considerably between individual students.",
      "Students generally prefer typing to handwriting for long lectures.",
    ],
    ans: "B",
    exp: "If typing while summarising matches handwriting, the benefit tracks the act of summarising rather than the slowness of the hand — which is the mechanism the proposal specifies. Choice A supports the phenomenon without testing the proposed cause.",
  },
  {
    d: "information_ideas",
    s: "evidence_quantitative",
    diff: "hard",
    type: "mc",
    passage:
      "A city compared four bus routes after adding dedicated lanes. On Route 1, average journey time fell from 42 to 31 minutes and ridership rose 18%. On Route 2, time fell from 38 to 35 minutes and ridership rose 3%. On Route 3, time fell from 55 to 39 minutes and ridership rose 26%. On Route 4, time fell from 29 to 27 minutes and ridership was unchanged.",
    prompt: "Which statement is best supported by the data?",
    choices: [
      "Routes with larger reductions in journey time showed larger increases in ridership.",
      "Every route showed an increase in ridership after the lanes were added.",
      "Route 3 had the shortest journey time after the lanes were added.",
      "Ridership rose by the same proportion as journey time fell on each route.",
    ],
    ans: "A",
    exp: "The time savings were 11, 3, 16 and 2 minutes, and the ridership gains were 18%, 3%, 26% and 0% — larger savings accompany larger gains throughout. Choice B fails on Route 4, and choice C is wrong because Route 4 ends at 27 minutes.",
  },
  {
    d: "information_ideas",
    s: "inferences",
    diff: "hard",
    type: "mc",
    passage:
      "Restorers cleaning a sixteenth-century altarpiece found that the varnish they were removing had itself been applied over an earlier cleaning, one that had already stripped some of the original glazes. The damage they were uncovering, in other words, was not the work of time but of a previous restoration. Any decision about how far to clean must therefore _______",
    prompt: "Which choice most logically completes the text?",
    choices: [
      "reckon with the possibility that removing later layers will not reveal an intact original.",
      "be postponed until the identity of the earlier restorer is established.",
      "involve replacing the missing glazes with modern equivalents.",
      "assume that the surface beneath the varnish is in its sixteenth-century state.",
    ],
    ans: "A",
    exp: "If an earlier cleaning already removed original glazes, then stripping the varnish cannot restore what is no longer there. Choice D asserts exactly the assumption the passage has just disproved.",
  },
  {
    d: "information_ideas",
    s: "inferences",
    diff: "hard",
    type: "mc",
    passage:
      "Desert ants navigate by counting steps, and a series of experiments confirmed it neatly: ants given stilts overshot the nest, while ants whose legs were shortened stopped short. Both groups, however, corrected on the return journey, arriving accurately the second time. This indicates that the step counter _______",
    prompt: "Which choice most logically completes the text?",
    choices: [
      "is recalibrated against the distance actually travelled on a completed trip.",
      "operates independently of any information about the terrain.",
      "is used only by ants that have never left the nest before.",
      "becomes less accurate each time a journey is repeated.",
    ],
    ans: "A",
    exp: "The ants erred once and then corrected with the same altered legs, so something must have updated the internal measure using the trip just completed. Choice D reverses the result, which was improvement rather than decay.",
  },

  // ================= Standard English Conventions (7) =================
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "medium",
    type: "mc",
    passage:
      "The seed bank stores samples at −20°C _______ at that temperature, most varieties remain viable for decades.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["; ", ", ", " ", ", and it is "],
    ans: "A",
    exp: "Both sides are complete sentences, so a semicolon is required; a comma alone would splice them. Choice D adds a conjunction but produces a redundant and ungrammatical second clause.",
  },
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "hard",
    type: "mc",
    passage:
      "Wangari Maathai _______ was awarded the Nobel Peace Prize in 2004.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      ", who founded the Green Belt Movement in 1977,",
      " who founded the Green Belt Movement in 1977,",
      ", who founded the Green Belt Movement in 1977",
      " who founded the Green Belt Movement in 1977",
    ],
    ans: "A",
    exp: "The relative clause adds non-essential information about a person already identified by name, so it takes commas on both sides. A single comma leaves the interrupter open and separates the subject from 'was awarded'.",
  },
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "hard",
    type: "mc",
    passage:
      "The expedition's supplies were chosen for weight rather than variety _______ dried meat, hard biscuit, and tea made up nearly the entire list.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [": ", "; and ", ", ", " which "],
    ans: "A",
    exp: "The second half illustrates the general statement that precedes it, and a colon after a complete sentence is the conventional way to introduce that illustration. Choice B is wrong because a semicolon is not combined with a coordinating conjunction.",
  },
  {
    d: "standard_conventions",
    s: "form_structure_sense",
    diff: "medium",
    type: "mc",
    passage:
      "Neither the surveyor's field notes nor the later published map _______ any mention of the smaller of the two rivers.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["makes", "make", "have made", "are making"],
    ans: "A",
    exp: "With 'neither … nor', the verb agrees with the nearer subject, which is the singular 'map'. The plural 'notes' earlier in the sentence is what makes the plural forms tempting.",
  },
  {
    d: "standard_conventions",
    s: "form_structure_sense",
    diff: "hard",
    type: "mc",
    passage:
      "The committee released its findings in March _______ by then the contract had already been signed and the site cleared.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["; ", ", ", " ", " and, "],
    ans: "A",
    exp: "Two independent clauses joined without a conjunction require a semicolon. 'By then' is an adverbial phrase, not a conjunction, so it cannot hold the two clauses together after a comma.",
  },
  {
    d: "standard_conventions",
    s: "form_structure_sense",
    diff: "hard",
    type: "mc",
    passage:
      "Written in a shorthand that no living scholar could read _______ for more than a century after its discovery.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      "the diary remained untranslated",
      "translators were unable to work on the diary",
      "there was no translation of the diary",
      "it proved impossible to translate the diary",
    ],
    ans: "A",
    exp: "The opening modifier describes what was written in shorthand, so the diary must directly follow it as the subject. Choices B, C and D place translators, 'there' and 'it' in that position, none of which was written in shorthand.",
  },
  {
    d: "standard_conventions",
    s: "form_structure_sense",
    diff: "hard",
    type: "mc",
    passage:
      "Researchers had assumed the crater was volcanic until shocked quartz _______ at the rim in 1991, confirming an impact origin.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["was identified", "has been identified", "is identified", "will be identified"],
    ans: "A",
    exp: "The sentence is anchored to a completed past moment, 1991, so the simple past passive is required. The present perfect in choice B cannot take a specific past time marker.",
  },

  // ================= Expression of Ideas (5) =================
  {
    d: "expression_ideas",
    s: "transitions",
    diff: "hard",
    type: "mc",
    passage:
      "The alloy is far stronger than aluminium and only slightly heavier, which makes it attractive for aircraft frames. _______ it corrodes rapidly in salt air, which has limited its use in maritime aviation.",
    prompt: "Which choice completes the text with the most logical transition?",
    choices: ["However,", "Consequently,", "Moreover,", "For instance,"],
    ans: "A",
    exp: "The first sentence gives an advantage and the second a drawback that restricts use, so the relationship is contrast. 'Moreover' would signal another point in the same direction, which corrosion is not.",
  },
  {
    d: "expression_ideas",
    s: "transitions",
    diff: "hard",
    type: "mc",
    passage:
      "Early estimates of the manuscript's age relied on the style of its script, a method that can be out by fifty years in either direction. Radiocarbon dating narrowed the range to a single decade. _______ the palaeographic estimate was not discarded: it remains the only way to date the many fragments too small to sample.",
    prompt: "Which choice completes the text with the most logical transition?",
    choices: ["Even so,", "As a result,", "Likewise,", "In short,"],
    ans: "A",
    exp: "Radiocarbon dating is more precise, so one would expect the older method to be abandoned; the sentence concedes that it was not. 'As a result' would make retention follow from the new precision, which reverses the logic.",
  },
  {
    d: "expression_ideas",
    s: "transitions",
    diff: "hard",
    type: "mc",
    passage:
      "The survey found that most respondents could not name their local representative. _______ the same respondents correctly identified the representative's party and two of their recent votes.",
    prompt: "Which choice completes the text with the most logical transition?",
    choices: ["Nevertheless,", "Therefore,", "Similarly,", "Accordingly,"],
    ans: "A",
    exp: "Not knowing a name while knowing the party and voting record is unexpected, so the second fact stands against the first. 'Similarly' would require the two findings to point the same way, but they cut in opposite directions.",
  },
  {
    d: "expression_ideas",
    s: "rhetorical_synthesis",
    diff: "hard",
    type: "mc",
    passage:
      "While researching, a student has taken these notes:\n• The Great Ethiopian Run was first held in 2001.\n• It attracts more than 40,000 participants annually.\n• Elite and amateur runners compete on the same 10 km course.\n• Registration fees subsidise youth athletics programmes.",
    prompt: "The student wants to emphasise the event's scale. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      "The Great Ethiopian Run, first held in 2001, subsidises youth athletics through its registration fees.",
      "More than 40,000 runners take part in the Great Ethiopian Run each year, with elite and amateur competitors sharing a single 10 km course.",
      "The Great Ethiopian Run is a 10 km race that was first held in 2001.",
      "Registration fees for the Great Ethiopian Run support youth athletics programmes across the country.",
    ],
    ans: "B",
    exp: "Scale is a matter of size, and only choice B leads with the 40,000 participants and the shared course. The other options are accurate but foreground funding or founding date instead.",
  },
  {
    d: "expression_ideas",
    s: "rhetorical_synthesis",
    diff: "hard",
    type: "mc",
    passage:
      "While researching, a student has taken these notes:\n• Lake Chad shrank by about 90% between 1963 and the 1990s.\n• Irrigation withdrawals increased sharply over the same period.\n• Rainfall in the basin also declined.\n• Since 2000 the lake's area has been broadly stable.",
    prompt: "The student wants to explain that the lake's decline had more than one cause. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      "Lake Chad shrank by about 90% between 1963 and the 1990s.",
      "Since 2000, the area of Lake Chad has been broadly stable.",
      "Lake Chad's sharp decline coincided with both a rise in irrigation withdrawals and a fall in rainfall across the basin.",
      "Irrigation withdrawals from Lake Chad increased sharply between 1963 and the 1990s.",
    ],
    ans: "C",
    exp: "Multiple causes require naming more than one factor, and only choice C pairs irrigation with declining rainfall. Choices A and D each state a single element of the picture.",
  },
];
