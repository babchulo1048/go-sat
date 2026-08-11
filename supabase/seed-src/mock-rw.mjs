// Full Mock 1 — Reading and Writing, Modules 1 and 2.
// 27 questions per module. Domain mix follows official weightings:
// Craft and Structure 8, Information and Ideas 7, Conventions 7, Expression 5.
// All passages and questions are original; they do not reproduce College Board items.

export const MOCK_RW_1 = [
  // ---- Craft and Structure (8) ----
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "easy",
    type: "mc",
    passage:
      "When the botanist Ynes Mexia began collecting plants in 1925, she was fifty-five years old and had no formal training beyond a handful of university courses. Colleagues expected a brief hobby. Instead, over thirteen years she gathered more than 145,000 specimens, including some five hundred species new to science. Her output was, by any measure, prodigious.",
    prompt:
      'As used in the text, what does the word "prodigious" most nearly mean?',
    choices: ["Enormous", "Careless", "Unexpected", "Puzzling"],
    ans: "A",
    exp: "The sentence summarises figures — 145,000 specimens and 500 new species — so the word must describe sheer quantity, and 'enormous' captures that. 'Unexpected' is tempting because colleagues were surprised, but the surprise is stated separately; the final sentence rates the output itself, not its predictability.",
  },
  {
    d: "craft_structure",
    s: "text_structure_purpose",
    diff: "easy",
    type: "mc",
    passage:
      "Sea otters eat enormous quantities of sea urchins. Urchins, in turn, graze on kelp. Where otters were hunted out in the nineteenth century, urchin populations exploded and kelp forests collapsed into bare rock. Where otters returned, kelp returned with them. The otter is small, but the forest depends on it.",
    prompt: "Which choice best describes the overall structure of the text?",
    choices: [
      "It poses a question and then rejects two possible answers to it.",
      "It traces a chain of ecological cause and effect and then states its implication.",
      "It compares two habitats that responded differently to the same disturbance.",
      "It presents a widely held belief and then supplies evidence against it.",
    ],
    ans: "B",
    exp: "The text moves otters → urchins → kelp, then reports what happened when the first link was removed and restored, closing with the implication that a small animal supports the forest. Choice C is tempting because two situations are mentioned, but they are the same habitat before and after otter loss, not two different habitats.",
  },
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "medium",
    type: "mc",
    passage:
      "Critics initially dismissed the composer Florence Price's symphonies as derivative, hearing in them only echoes of Dvořák. Later scholars have argued that this reading is _______: the spirituals and juba rhythms woven through her scoring are structural, not decorative, and they organise the music in ways Dvořák never attempted.",
    prompt:
      "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["exhaustive", "reductive", "speculative", "unflattering"],
    ans: "B",
    exp: "The colon explains that the earlier reading missed structural features of Price's music, so the word must mean 'oversimplifying' — 'reductive'. 'Unflattering' is true of the criticism but describes its tone rather than its analytical failure, which is what the second half of the sentence documents.",
  },
  {
    d: "craft_structure",
    s: "text_structure_purpose",
    diff: "medium",
    type: "mc",
    passage:
      "The following is adapted from a 1908 novel. Mrs. Aldingham had a gift for the small remark that ended a conversation. 'How brave of you to wear that,' she said, and the room, which had been noisy, found other things to look at. Her daughter had learned to read the weather of these silences before she learned to read print.",
    prompt: "What is the main purpose of the final sentence of the text?",
    choices: [
      "To explain why Mrs. Aldingham speaks as she does",
      "To indicate how routine and formative the mother's behaviour is for the daughter",
      "To suggest that the daughter is unusually slow to learn to read",
      "To contrast the daughter's manners with her mother's",
    ],
    ans: "B",
    exp: "Saying the daughter learned to read these silences before print signals that the pattern was constant enough to shape her early. Choice C misreads the comparison, which is about the order in which two skills were acquired, not about any deficiency in reading.",
  },
  {
    d: "craft_structure",
    s: "cross_text_connections",
    diff: "medium",
    type: "mc",
    passage:
      "Text 1: Urban rewilding projects, which let city parkland grow unmanaged, have been criticised as an abdication of care. Tidy planting, the argument runs, is what makes a park feel safe and welcoming to the widest range of residents.\n\nText 2: Surveys in three rewilded London parks found that visits rose after mowing stopped, and that respondents most often described the meadows as 'alive'. Perceptions of safety were unchanged from the pre-rewilding baseline.",
    prompt:
      "Based on the texts, how would the author of Text 2 most likely respond to the criticism described in Text 1?",
    choices: [
      "By conceding that unmanaged parkland does reduce visitor numbers",
      "By noting that the predicted loss of welcome is not what the survey data show",
      "By arguing that safety matters less than biodiversity",
      "By claiming that residents cannot judge the quality of parkland",
    ],
    ans: "B",
    exp: "Text 2 reports higher visits and unchanged safety perceptions, which directly contradicts Text 1's prediction that unmanaged parks feel less welcoming. Choice C is tempting but Text 2 never ranks the two values; it simply reports that the feared cost did not appear.",
  },
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "hard",
    type: "mc",
    passage:
      "Archaeologists once treated the absence of grave goods at the site as evidence of poverty. Recent work has _______ that inference: at several comparable settlements, wealthy households deliberately buried their dead without objects, reserving valuables for the living.",
    prompt:
      "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["confirmed", "unsettled", "publicised", "restated"],
    ans: "B",
    exp: "The colon supplies a counterexample showing that absent grave goods need not indicate poverty, so the recent work destabilises the old inference — 'unsettled'. 'Confirmed' reverses the logic, and 'restated' would require the new work to repeat rather than challenge the earlier claim.",
  },
  {
    d: "craft_structure",
    s: "cross_text_connections",
    diff: "hard",
    type: "mc",
    passage:
      "Text 1: The economist argues that remote work redistributes opportunity: a software job once tied to two coastal cities can now be held from anywhere, lifting incomes in regions long bypassed by growth.\n\nText 2: A study of relocations found that remote workers overwhelmingly moved to a small number of mid-sized cities that already had high amenity scores and rising rents. Rural counties gained almost no net workers.",
    prompt:
      "Which choice best describes the relationship between the two texts?",
    choices: [
      "Text 2 provides an empirical qualification of the mechanism Text 1 describes.",
      "Text 2 offers a historical precedent for the trend Text 1 predicts.",
      "Text 2 endorses Text 1's conclusion using different reasoning.",
      "Text 2 disputes Text 1's definition of remote work.",
    ],
    ans: "A",
    exp: "Text 1 claims remote work spreads opportunity widely; Text 2's relocation data show the gains concentrating in a few already-attractive cities, narrowing rather than rejecting the claim. Choice C is wrong because the data cut against, not for, the broad redistribution Text 1 forecasts.",
  },
  {
    d: "craft_structure",
    s: "text_structure_purpose",
    diff: "hard",
    type: "mc",
    passage:
      "In 1943 the mathematician wrote to her editor that the proof was 'finished, in the sense that a house is finished when the roof is on and the rain still comes through the ceiling.' She published two years later.",
    prompt: "What is the main rhetorical effect of the simile in the text?",
    choices: [
      "It conveys that the proof was structurally complete but not yet sound in detail.",
      "It emphasises how quickly the mathematician worked once she had an outline.",
      "It suggests that the mathematician regarded the proof as a failure.",
      "It implies that the editor had unreasonable expectations of her.",
    ],
    ans: "A",
    exp: "A roofed house that still leaks has its overall structure in place while remaining defective in particulars, which maps onto a complete argument with unresolved gaps — and the two-year delay before publication supports this. Choice C overstates it: an unfinished house is not a demolished one, and the work was eventually published.",
  },

  // ---- Information and Ideas (7) ----
  {
    d: "information_ideas",
    s: "central_ideas_details",
    diff: "easy",
    type: "mc",
    passage:
      "Honeybees communicate the location of food through a waggle dance whose angle encodes direction relative to the sun and whose duration encodes distance. Because the sun moves across the sky, a bee that has waited inside the hive must adjust the angle of her dance to account for the time elapsed — and she does.",
    prompt: "Which choice best states the main idea of the text?",
    choices: [
      "Honeybees prefer to forage when the sun is directly overhead.",
      "The waggle dance conveys direction and distance, and bees correct it for the sun's movement.",
      "Bees that wait inside the hive lose track of where food is located.",
      "The duration of the waggle dance is more informative than its angle.",
    ],
    ans: "B",
    exp: "The text defines the two things the dance encodes and then adds that bees compensate for solar movement. Choice C directly contradicts the final clause, which states that the waiting bee does make the adjustment.",
  },
  {
    d: "information_ideas",
    s: "evidence_textual",
    diff: "easy",
    type: "mc",
    passage:
      "A student claims that the Roman road network was designed primarily for military movement rather than trade.",
    prompt:
      "Which finding, if true, would most directly support the student's claim?",
    choices: [
      "Roman roads were paved with locally quarried stone wherever possible.",
      "Road construction consistently followed, rather than preceded, the arrival of legions in a province.",
      "Merchants' accounts frequently mention travelling on Roman roads.",
      "Many Roman roads remained in use for centuries after the empire fell.",
    ],
    ans: "B",
    exp: "If roads were built after legions arrived, construction tracked military campaigns, which is exactly the priority the student asserts. Choice C is evidence for the rival claim, and choices A and D concern materials and longevity, which are silent on purpose.",
  },
  {
    d: "information_ideas",
    s: "central_ideas_details",
    diff: "medium",
    type: "mc",
    passage:
      "The novelist Nella Larsen published only two novels and a handful of stories before leaving literature for nursing. Critics have often framed this as a silence. Larsen's letters suggest something narrower: after a plagiarism accusation she considered and dismissed as baseless, she stopped seeking publication, not writing.",
    prompt:
      "According to the text, what do Larsen's letters indicate about her departure from literature?",
    choices: [
      "She continued to write but withdrew from the process of publishing.",
      "She accepted that the plagiarism accusation against her was justified.",
      "She found nursing more satisfying than writing had been.",
      "She had planned to write only two novels from the start.",
    ],
    ans: "A",
    exp: "The final clause draws precisely this distinction: she stopped seeking publication, not writing. Choice B reverses the text, which says she dismissed the accusation as baseless.",
  },
  {
    d: "information_ideas",
    s: "evidence_quantitative",
    diff: "medium",
    type: "mc",
    passage:
      "A team measured germination rates for a native wildflower at four soil temperatures. At 10°C, 18 percent of seeds germinated; at 15°C, 44 percent; at 20°C, 71 percent; and at 25°C, 39 percent. The researchers concluded that the species has an intermediate thermal optimum for germination.",
    prompt:
      "Which choice most effectively uses data from the text to support the researchers' conclusion?",
    choices: [
      "Germination rose steadily with temperature, from 18 percent at 10°C to 71 percent at 20°C.",
      "Germination peaked at 20°C (71 percent) and fell to 39 percent at the warmer 25°C.",
      "Fewer than half of all seeds germinated at 10°C and 15°C.",
      "Germination at 25°C (39 percent) was more than double the rate at 10°C.",
    ],
    ans: "B",
    exp: "An intermediate optimum requires a rise and then a fall, so the evidence must include both the 20°C peak and the drop at 25°C. Choice A shows only the rising half, which would equally fit a species that simply prefers heat.",
  },
  {
    d: "information_ideas",
    s: "inferences",
    diff: "medium",
    type: "mc",
    passage:
      "Deep-sea anglerfish live where prey is so scarce that an individual may encounter a meal only a few times a year. Their stomachs distend to hold prey larger than themselves, and their metabolic rates are among the lowest measured in vertebrates of comparable size. These traits suggest that, for the anglerfish, _______",
    prompt:
      "Which choice most logically completes the text?",
    choices: [
      "hunting speed is the decisive factor in survival.",
      "the main challenge is surviving long intervals between meals rather than finding abundant food.",
      "competition with other anglerfish limits population growth.",
      "body size is unrelated to the amount of prey consumed.",
    ],
    ans: "B",
    exp: "Both traits described — a stomach that banks an oversized meal and a very low metabolic rate — are adaptations for waiting, which points to scarcity over time as the central problem. Choice A is unsupported: nothing in the text concerns speed, and low metabolism argues against it.",
  },
  {
    d: "information_ideas",
    s: "evidence_textual",
    diff: "hard",
    type: "mc",
    passage:
      "Historians disagree about why sixteenth-century Antwerp overtook Bruges as the commercial capital of the Low Countries. One school emphasises the silting of the Zwin channel, which cut Bruges off from deep water. Another argues that Antwerp's success was institutional: its fairs offered creditor protections that Bruges's guild courts did not.",
    prompt:
      "Which quotation from a historical record, if authentic, would most weaken the institutional explanation?",
    choices: [
      "'The Antwerp fairs were crowded beyond memory in the year 1520.'",
      "'Merchants of Lucca removed to Antwerp only after their galleys could no longer reach Bruges at any tide.'",
      "'The magistrates of Antwerp confirmed the privileges of foreign creditors in a charter of 1515.'",
      "'Bruges's guilds refused to hear suits brought by foreign merchants.'",
    ],
    ans: "B",
    exp: "The institutional account says merchants moved for legal protections; a record showing they moved only once navigation failed attributes the shift to silting instead. Choice D would strengthen the institutional account by confirming that Bruges's courts were closed to foreigners.",
  },
  {
    d: "information_ideas",
    s: "inferences",
    diff: "hard",
    type: "mc",
    passage:
      "Tree-ring records from the Colorado Plateau show that the twelfth-century drought was neither the driest nor the hottest of the last two millennia, yet it coincides with the most extensive settlement abandonment in the region's archaeological record. Researchers note that the drought was, however, the longest.",
    prompt: "Which choice most logically completes the text?",
    choices: [
      "Tree-ring records are unreliable indicators of past temperature.",
      "Settlement abandonment in the region was unrelated to climate.",
      "Duration may matter more than severity in determining whether communities can absorb a drought.",
      "The twelfth-century population of the plateau was smaller than previously estimated.",
    ],
    ans: "C",
    exp: "The paragraph pointedly rules out severity and heat as distinguishing features while highlighting length, so the inference is that persistence, not intensity, drove abandonment. Choice B ignores the coincidence the passage treats as significant.",
  },

  // ---- Standard English Conventions (7) ----
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "easy",
    type: "mc",
    passage:
      "The lighthouse at Cape Byron was automated in 1989 _______ the keeper's cottages remained standing and now house researchers.",
    prompt:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [", but", ", and it", "; and", " but,"],
    ans: "A",
    exp: "Two independent clauses joined by the coordinating conjunction 'but' require a comma before the conjunction. Choice B adds a redundant subject 'it' that leaves 'the keeper's cottages' without a verb structure that fits, and choice D misplaces the comma after the conjunction.",
  },
  {
    d: "standard_conventions",
    s: "form_structure_sense",
    diff: "easy",
    type: "mc",
    passage:
      "Each of the six volcanic islands in the chain _______ a distinct population of finches found nowhere else.",
    prompt:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["support", "have supported", "supports", "are supporting"],
    ans: "C",
    exp: "The subject is 'Each', which is singular, so the verb must be 'supports'; the plural noun 'islands' sits inside a prepositional phrase and cannot control the verb. Choice B is also plural in form and shifts the tense without cause.",
  },
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "medium",
    type: "mc",
    passage:
      "Working entirely at night to avoid the heat, the excavation team uncovered a mosaic floor _______ its central panel showed a hunting scene in nine colours of stone.",
    prompt:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [", ", ": ", ", and ", "; and, "],
    ans: "B",
    exp: "The second clause specifies what was found, so a colon correctly introduces the elaboration after a complete independent clause. Choice A creates a comma splice between two independent clauses, and choice D's comma after 'and' is unidiomatic.",
  },
  {
    d: "standard_conventions",
    s: "form_structure_sense",
    diff: "medium",
    type: "mc",
    passage:
      "The curator argued that the vase, along with the two bronze mirrors recovered from the same chamber, _______ almost certainly imported rather than produced locally.",
    prompt:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["were", "have been", "are being", "was"],
    ans: "D",
    exp: "The subject is the singular 'vase'; the phrase 'along with...' is parenthetical and does not make the subject plural, so 'was' is correct. Choice A is the trap: the nearby plural 'mirrors' pulls the ear toward a plural verb.",
  },
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "medium",
    type: "mc",
    passage:
      "Marie Tharp's 1957 map of the Atlantic seafloor revealed a continuous rift valley running down the ridge _______ a feature her colleague initially dismissed as 'girl talk.'",
    prompt:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [", ", ". ", "; ", " and "],
    ans: "A",
    exp: "'A feature her colleague initially dismissed' is a noun phrase in apposition to the rift valley, and an appositive is set off with a comma. A period or semicolon would leave that phrase as a fragment because it contains no main verb of its own.",
  },
  {
    d: "standard_conventions",
    s: "form_structure_sense",
    diff: "hard",
    type: "mc",
    passage:
      "Having sequenced the genomes of forty ancient horse specimens, _______",
    prompt:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      "the domestication date was pushed back by nearly a millennium.",
      "the team pushed the domestication date back by nearly a millennium.",
      "nearly a millennium was added to the domestication date by the team.",
      "there was a shift of nearly a millennium in the domestication date.",
    ],
    ans: "B",
    exp: "The opening participial phrase must modify whoever did the sequencing, so the main clause has to begin with 'the team'. The other options leave the modifier dangling, attaching the sequencing to a date, a millennium, or nothing at all.",
  },
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "hard",
    type: "mc",
    passage:
      "The archive holds letters from three writers who never met in person _______ Rabindranath Tagore, who wrote from Bengal; Romain Rolland, who wrote from Switzerland; and Ocampo, who wrote from Buenos Aires.",
    prompt:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [", ", ": ", "; ", ", and "],
    ans: "B",
    exp: "A complete clause precedes a list that names its items, which is exactly the job of a colon; the items themselves are already separated by semicolons because each contains a comma. A comma before the list would be too weak, and a semicolon would wrongly signal a second independent clause.",
  },

  // ---- Expression of Ideas (5) ----
  {
    d: "expression_ideas",
    s: "transitions",
    diff: "easy",
    type: "mc",
    passage:
      "Cast iron conducts heat unevenly, producing hot spots that can scorch delicate sauces. _______ its thickness lets it hold a steady temperature once heated, which is why it browns meat so well.",
    prompt:
      "Which choice completes the text with the most logical transition?",
    choices: ["Therefore,", "However,", "Similarly,", "For instance,"],
    ans: "B",
    exp: "The first sentence names a drawback and the second names a compensating strength, so a contrastive transition is required. 'Therefore' would wrongly present the steady temperature as a consequence of uneven conduction.",
  },
  {
    d: "expression_ideas",
    s: "transitions",
    diff: "medium",
    type: "mc",
    passage:
      "Salt marshes trap sediment, and as sea levels rise slowly the marsh surface can build upward at a comparable rate. _______ where the rise outpaces sediment supply, the marsh drowns and converts to open water.",
    prompt:
      "Which choice completes the text with the most logical transition?",
    choices: ["Beyond that,", "Consequently,", "In other words,", "Where possible,"],
    ans: "A",
    exp: "The second sentence introduces the case that lies past the limit described in the first, and 'Beyond that' marks that boundary. 'Consequently' is wrong because drowning is not a result of successful upward growth — it is what happens when growth fails.",
  },
  {
    d: "expression_ideas",
    s: "rhetorical_synthesis",
    diff: "medium",
    type: "mc",
    passage:
      "While researching, a student took these notes:\n• Cochineal is a red dye made from scale insects.\n• It was farmed in Oaxaca before Spanish contact.\n• By 1600 it was the second most valuable export from New Spain after silver.\n• Synthetic red dyes displaced it in the 1870s.\n\nThe student wants to emphasise cochineal's commercial importance in the colonial period.",
    prompt:
      "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      "Cochineal, a red dye made from scale insects, was farmed in Oaxaca long before Spanish contact.",
      "By 1600 cochineal, a dye made from scale insects, was New Spain's second most valuable export after silver.",
      "Cochineal, once farmed in Oaxaca, was displaced by synthetic red dyes in the 1870s.",
      "Synthetic dyes of the 1870s replaced a red dye that had been made from scale insects.",
    ],
    ans: "B",
    exp: "Only choice B carries the export-ranking note, which is the one detail that establishes commercial importance in the colonial period. Choice A is accurate but speaks to antiquity, and choices C and D emphasise the dye's later decline.",
  },
  {
    d: "expression_ideas",
    s: "rhetorical_synthesis",
    diff: "hard",
    type: "mc",
    passage:
      "While researching, a student took these notes:\n• The Antikythera mechanism is a geared bronze device recovered from a shipwreck in 1901.\n• X-ray tomography in 2006 revealed at least 30 interlocking gears.\n• It modelled the positions of the sun and moon and predicted eclipses.\n• No comparably complex geared device is known for the next thousand years.\n\nThe student wants to explain to an audience unfamiliar with the mechanism why it is historically remarkable.",
    prompt:
      "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      "The Antikythera mechanism was recovered from a shipwreck in 1901 and studied with X-ray tomography in 2006.",
      "With at least 30 interlocking gears, the mechanism modelled the sun and moon and predicted eclipses — and nothing so complex is known for the next thousand years.",
      "X-ray tomography in 2006 revealed that the Antikythera mechanism contains at least 30 interlocking gears.",
      "Recovered in 1901, the Antikythera mechanism is a geared bronze device that modelled the positions of the sun and moon.",
    ],
    ans: "B",
    exp: "Remarkableness needs both the device's capability and the fact that it had no successor for a millennium, and only choice B pairs them. Choice C gives the gear count but leaves the reader with no standard of comparison to judge it against.",
  },
  {
    d: "expression_ideas",
    s: "transitions",
    diff: "hard",
    type: "mc",
    passage:
      "Economists had long assumed that consumers respond to a price rise by buying less of a good. Studies of staple foods among very low-income households complicate that picture: when the price of a cheap staple rises, some households buy more of it, cutting the costlier foods that had supplemented it. _______ the demand curve for such a good can slope upward over a limited range.",
    prompt:
      "Which choice completes the text with the most logical transition?",
    choices: ["Nevertheless,", "In effect,", "By contrast,", "Admittedly,"],
    ans: "B",
    exp: "The last sentence restates the described behaviour in formal economic terms rather than adding a new or opposing point, which is what 'In effect' signals. 'Nevertheless' and 'By contrast' would falsely mark the conclusion as a reversal of the evidence that supports it.",
  },
];

export const MOCK_RW_2 = [
  // ---- Craft and Structure (8) ----
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "easy",
    type: "mc",
    passage:
      "The first printed maps of the Pacific were assembled from reports by sailors who had seen only fragments of coastline. Cartographers filled the gaps with _______ guesses, drawing continents where none existed and omitting islands that did.",
    prompt:
      "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["confident", "reluctant", "measured", "borrowed"],
    ans: "A",
    exp: "The examples that follow — drawing whole continents that do not exist — describe guessing done boldly, so 'confident' fits. 'Measured' would suggest restraint, which the invented continents contradict.",
  },
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "easy",
    type: "mc",
    passage:
      "Reviewers praised the choreographer's new work for its economy: no gesture was repeated, no dancer stood idle, and the whole piece ran nineteen minutes.",
    prompt: 'As used in the text, what does the word "economy" most nearly mean?',
    choices: ["Low production cost", "Absence of waste", "Financial system", "Commercial appeal"],
    ans: "B",
    exp: "The colon lists features of efficiency — nothing repeated, nobody idle, a short running time — which defines economy as the absence of waste. 'Low production cost' borrows the everyday money sense that the examples do not support.",
  },
  {
    d: "craft_structure",
    s: "text_structure_purpose",
    diff: "medium",
    type: "mc",
    passage:
      "Most descriptions of the water cycle begin with evaporation from the ocean. This is convenient but arbitrary: the cycle has no starting point, and a raindrop that falls on a forest may be returned to the air by a leaf within hours, never reaching a river at all.",
    prompt: "What is the main purpose of the text?",
    choices: [
      "To argue that a familiar way of presenting a process misrepresents how it works",
      "To explain how transpiration differs from evaporation",
      "To criticise scientists for neglecting forests in climate models",
      "To describe the path of a single raindrop in detail",
    ],
    ans: "A",
    exp: "The text names the conventional starting point and then explains why treating it as a starting point is misleading. Choice B is tempting because the leaf detail involves transpiration, but that detail serves the argument rather than being the point of the passage.",
  },
  {
    d: "craft_structure",
    s: "text_structure_purpose",
    diff: "medium",
    type: "mc",
    passage:
      "The following is adapted from a short story. Ojo checked the till three times before locking up, though he had counted it correctly the first time and knew it. The habit had followed him from a job he had left eleven years earlier, where a shortfall of four hundred naira had cost a colleague her position.",
    prompt: "What is the main purpose of the second sentence?",
    choices: [
      "To reveal that Ojo has previously been accused of theft",
      "To explain the origin of a behaviour the first sentence presents as excessive",
      "To establish that Ojo is poor at arithmetic",
      "To contrast Ojo's caution with his colleague's carelessness",
    ],
    ans: "B",
    exp: "The first sentence shows an unnecessary triple check; the second supplies the past event that produced the habit. Choice A misidentifies who was affected — the colleague lost her job, and Ojo is never accused.",
  },
  {
    d: "craft_structure",
    s: "cross_text_connections",
    diff: "medium",
    type: "mc",
    passage:
      "Text 1: Museums that return looted artefacts risk emptying their collections and depriving global audiences of access to the world's heritage.\n\nText 2: Since 2019 the museum has returned 27 objects and reports that loan agreements negotiated alongside each return have brought 63 objects into its galleries, most never previously exhibited in Europe.",
    prompt:
      "Based on the texts, how does the evidence in Text 2 bear on the concern raised in Text 1?",
    choices: [
      "It confirms that returns reduce the size of collections.",
      "It suggests returns can be paired with arrangements that expand, rather than shrink, what is on display.",
      "It shows that global audiences prefer to see objects in their countries of origin.",
      "It demonstrates that loan agreements are more expensive than acquisitions.",
    ],
    ans: "B",
    exp: "The museum returned 27 objects but gained 63 on loan, so the feared depletion did not occur. Choice A reads only the first half of the data and ignores the loans that followed each return.",
  },
  {
    d: "craft_structure",
    s: "cross_text_connections",
    diff: "hard",
    type: "mc",
    passage:
      "Text 1: The linguist maintains that children acquire grammar so rapidly, and on such fragmentary input, that much of its structure must be innate.\n\nText 2: Corpus studies of speech directed at young children find it is far more repetitive and far better formed than earlier researchers assumed, with common constructions recurring thousands of times per month.",
    prompt:
      "Which choice best describes how Text 2 relates to the argument in Text 1?",
    choices: [
      "It challenges a premise of the argument rather than its conclusion.",
      "It provides an additional example of the phenomenon the argument explains.",
      "It agrees with the argument but questions its significance.",
      "It shows that the argument rests on a mathematical error.",
    ],
    ans: "A",
    exp: "Text 1's reasoning depends on the input being fragmentary; Text 2 attacks precisely that premise while saying nothing directly about innateness. Choice C is wrong because Text 2 does not accept the argument — it removes one of its supports.",
  },
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "hard",
    type: "mc",
    passage:
      "Early reviewers found the poet's late work austere to the point of coldness. Read alongside her letters, however, the same poems appear _______: the plainness is the discipline of someone who distrusted her own facility for ornament.",
    prompt:
      "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["indulgent", "effortless", "deliberate", "derivative"],
    ans: "C",
    exp: "The colon explains the plainness as a discipline adopted against a natural talent for ornament, which makes it chosen — 'deliberate'. 'Effortless' is the opposite of what discipline implies and would undercut the contrast with 'facility'.",
  },
  {
    d: "craft_structure",
    s: "text_structure_purpose",
    diff: "hard",
    type: "mc",
    passage:
      "A physicist once described turbulence as the last great unsolved problem of classical physics. The remark is quoted so often that it has acquired the authority of a verdict. It is worth remembering that it was made in a lecture, offhand, and that the speaker spent none of his career working on the problem.",
    prompt: "What is the main purpose of the final sentence?",
    choices: [
      "To identify the physicist who made the remark",
      "To undercut the weight the remark has come to carry",
      "To argue that turbulence has now been solved",
      "To explain why turbulence is difficult to model",
    ],
    ans: "B",
    exp: "By noting that the line was offhand and made by someone who never studied turbulence, the sentence deflates the 'authority of a verdict' described just before. Choice C goes further than the text, which questions the quotation's standing rather than the problem's status.",
  },

  // ---- Information and Ideas (7) ----
  {
    d: "information_ideas",
    s: "central_ideas_details",
    diff: "easy",
    type: "mc",
    passage:
      "Fungi in the genus Ophiocordyceps infect ants and alter their behaviour, driving them to climb vegetation and clamp onto a leaf vein before dying. The height and humidity at that spot happen to be close to optimal for the fungus to fruit — but poor for the ant colony's usual foraging routes.",
    prompt: "Which choice best states the main idea of the text?",
    choices: [
      "Ant colonies avoid vegetation that is high and humid.",
      "The fungus manipulates infected ants into dying in a place that suits the fungus.",
      "Ophiocordyceps infections are usually survivable for ants.",
      "Humidity is the main factor limiting fungal growth.",
    ],
    ans: "B",
    exp: "The passage pairs the altered behaviour with the observation that the final location is optimal for the fungus, which is the point. Choice D overstates one detail; humidity is mentioned as part of the favourable spot, not as the limiting factor generally.",
  },
  {
    d: "information_ideas",
    s: "evidence_quantitative",
    diff: "easy",
    type: "mc",
    passage:
      "A city compared cycling rates on four corridors one year after adding protected bike lanes to two of them. On the two protected corridors, daily cycling trips rose from 620 to 1,410 and from 480 to 1,090. On the two unchanged corridors, trips moved from 550 to 575 and from 700 to 690.",
    prompt:
      "Which choice best describes data in the text that support the conclusion that protected lanes increased cycling?",
    choices: [
      "Cycling more than doubled on both protected corridors while remaining nearly flat on both unchanged ones.",
      "Cycling rose on three of the four corridors studied.",
      "The busiest corridor before the change was also the busiest afterward.",
      "Total cycling trips across all four corridors increased.",
    ],
    ans: "A",
    exp: "The comparison that isolates the effect of the lanes is the contrast between the doubled protected corridors and the flat control corridors. Choice D reports an aggregate that the unchanged corridors could not explain and does not separate treatment from control.",
  },
  {
    d: "information_ideas",
    s: "inferences",
    diff: "medium",
    type: "mc",
    passage:
      "Manuscript copies of a medieval medical text survive in twelve libraries. Eleven contain a chapter on eye surgery; the twelfth, the oldest surviving copy, does not, and its page numbering runs continuously across the point where the chapter would appear. This suggests that the chapter _______",
    prompt: "Which choice most logically completes the text?",
    choices: [
      "was removed from the oldest copy after it was bound.",
      "was added to the text after the oldest surviving copy was made.",
      "was the most frequently consulted part of the work.",
      "was written by a different author from the rest of the text.",
    ],
    ans: "B",
    exp: "Continuous page numbering shows nothing was cut out of the oldest copy, so the chapter's absence there means it did not yet exist when that copy was made. Choice A is exactly what the unbroken numbering rules out.",
  },
  {
    d: "information_ideas",
    s: "evidence_textual",
    diff: "medium",
    type: "mc",
    passage:
      "A researcher hypothesises that urban peregrine falcons hunt at night, using artificial light, whereas rural peregrines do not.",
    prompt:
      "Which finding, if true, would most directly support the researcher's hypothesis?",
    choices: [
      "Urban peregrines nest on tall buildings at heights similar to their rural cliff sites.",
      "Prey remains at urban nests include a high proportion of nocturnally migrating songbirds, which are largely absent from rural nests.",
      "Urban peregrines raise slightly larger clutches than rural peregrines.",
      "Artificial light levels in the study city have increased over the past two decades.",
    ],
    ans: "B",
    exp: "Nocturnal migrants in the urban diet but not the rural one is direct evidence that urban birds are catching prey that flies at night. Choice D establishes the opportunity for night hunting but shows no evidence that the falcons take it.",
  },
  {
    d: "information_ideas",
    s: "central_ideas_details",
    diff: "medium",
    type: "mc",
    passage:
      "The Voynich manuscript has resisted decipherment for a century. Statistical analyses show that its script has word-length distributions and entropy resembling natural language rather than random strings, yet no scholar has matched it to any known language, and no bilingual text has surfaced.",
    prompt: "According to the text, what makes the manuscript's script puzzling?",
    choices: [
      "It uses characters that appear in no other historical document.",
      "It behaves statistically like a real language while matching none.",
      "It has been shown to be a random sequence of symbols.",
      "It exists in only a single incomplete copy.",
    ],
    ans: "B",
    exp: "The passage contrasts language-like statistics with the failure to match any known language, and that tension is the puzzle. Choice C directly contradicts the statistical finding reported.",
  },
  {
    d: "information_ideas",
    s: "evidence_quantitative",
    diff: "hard",
    type: "mc",
    passage:
      "A trial tested whether adding a legume cover crop raises maize yield. Across 40 plots, mean yield was 6.1 t/ha with the cover crop and 5.6 t/ha without, a difference of 0.5 t/ha with a 95 percent confidence interval of −0.2 to 1.2 t/ha.",
    prompt:
      "Which choice best describes what the data indicate about the effect of the cover crop?",
    choices: [
      "The cover crop reliably raises yield by about 0.5 t/ha.",
      "The observed yield gain is consistent with no true effect, so the trial is not conclusive.",
      "The cover crop reduces yield in most plots.",
      "The sample of 40 plots is large enough to rule out chance.",
    ],
    ans: "B",
    exp: "Because the confidence interval spans zero, a true effect of nothing cannot be excluded, so the result is inconclusive despite the positive point estimate. Choice A is the classic error of reading the point estimate while ignoring the interval around it.",
  },
  {
    d: "information_ideas",
    s: "inferences",
    diff: "hard",
    type: "mc",
    passage:
      "Modern beavers cannot fell trees more than about half a metre across. Fossil dams from the Pliocene, however, contain trunks nearly twice that diameter, and the beaver species present at the time was no larger than today's. Researchers therefore propose that _______",
    prompt: "Which choice most logically completes the text?",
    choices: [
      "the Pliocene trunks were incorporated after falling by other means, such as wind or flooding.",
      "Pliocene beavers had substantially stronger jaws than modern beavers.",
      "the fossil dams were built by a much larger, undiscovered species.",
      "modern beavers avoid large trees only because of competition.",
    ],
    ans: "A",
    exp: "Since body size is held constant, the proposal must explain the large trunks without invoking bigger or stronger beavers, and scavenging already-fallen timber does exactly that. Choice C is ruled out by the statement that the beaver species of the period was no larger than today's.",
  },

  // ---- Standard English Conventions (7) ----
  {
    d: "standard_conventions",
    s: "form_structure_sense",
    diff: "easy",
    type: "mc",
    passage:
      "The museum's new wing, which opened in March, _______ three galleries devoted to textiles.",
    prompt:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["contain", "containing", "contains", "to contain"],
    ans: "C",
    exp: "The singular subject 'wing' needs the singular present-tense verb 'contains'; the relative clause between them does not change the subject. Choices B and D are non-finite forms that would leave the sentence without a main verb.",
  },
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "easy",
    type: "mc",
    passage:
      "After weeks of rehearsal in a borrowed hall _______ the quartet recorded the whole programme in a single afternoon.",
    prompt:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [", ", "; ", ": ", " — and "],
    ans: "A",
    exp: "An introductory prepositional phrase is separated from the main clause by a comma. A semicolon or colon requires an independent clause before it, and the opening phrase has no subject or verb.",
  },
  {
    d: "standard_conventions",
    s: "form_structure_sense",
    diff: "medium",
    type: "mc",
    passage:
      "Neither the two surveying teams nor the project geologist _______ able to explain the anomaly in the magnetic readings.",
    prompt:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["were", "are", "have been", "was"],
    ans: "D",
    exp: "With 'neither...nor', the verb agrees with the nearer subject, and 'the project geologist' is singular, so 'was' is correct. Choice A follows the plural 'teams', which is the more distant subject and does not govern the verb here.",
  },
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "medium",
    type: "mc",
    passage:
      "The recipe calls for three ingredients that are hard to find outside the region _______ a bitter orange, a fermented pepper paste, and a dried river fish.",
    prompt:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [": ", "; ", ", and ", " "],
    ans: "A",
    exp: "A colon introduces a list that follows a complete independent clause, which is the case here. A semicolon would require a full clause on both sides, and choice D would run the list into the clause with no punctuation at all.",
  },
  {
    d: "standard_conventions",
    s: "form_structure_sense",
    diff: "medium",
    type: "mc",
    passage:
      "By the time the survey ship reached the trench, the autonomous submersible _______ four descents.",
    prompt:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["completes", "had completed", "completing", "will complete"],
    ans: "B",
    exp: "The descents finished before the ship arrived, and both events are in the past, so the past perfect 'had completed' marks the earlier action. Choice D puts a past-anchored sequence into the future.",
  },
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "hard",
    type: "mc",
    passage:
      "Chinua Achebe's novel was published in 1958 _______ within a decade it had been translated into more than thirty languages.",
    prompt:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [", ", ", and ", " and, ", "and "],
    ans: "B",
    exp: "Two independent clauses require a comma plus a coordinating conjunction, which choice B supplies. Choice A alone creates a comma splice, and choice D joins them with no punctuation, producing a run-on.",
  },
  {
    d: "standard_conventions",
    s: "form_structure_sense",
    diff: "hard",
    type: "mc",
    passage:
      "The committee praised the proposal for its clear budget, its realistic timetable, and _______",
    prompt:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      "because it involved the community.",
      "its plan to involve the community.",
      "that the community would be involved.",
      "involving of the community in it.",
    ],
    ans: "B",
    exp: "The list already contains two possessive noun phrases, so the third item must take the same form for parallel structure. Choices A and C switch to subordinate clauses, breaking the pattern the first two items establish.",
  },

  // ---- Expression of Ideas (5) ----
  {
    d: "expression_ideas",
    s: "transitions",
    diff: "easy",
    type: "mc",
    passage:
      "Aluminium is abundant in the earth's crust. _______ it remained more valuable than gold until an electrolytic process for separating it was developed in 1886.",
    prompt: "Which choice completes the text with the most logical transition?",
    choices: ["For example,", "Even so,", "As a result,", "Likewise,"],
    ans: "B",
    exp: "Abundance would normally imply cheapness, so the high price is a surprising contrast requiring a concessive transition. 'As a result' asserts the opposite causal relationship and makes the sentence illogical.",
  },
  {
    d: "expression_ideas",
    s: "rhetorical_synthesis",
    diff: "medium",
    type: "mc",
    passage:
      "While researching, a student took these notes:\n• The Tabula Peutingeriana is a medieval copy of a Roman road map.\n• It is 6.75 metres long and only 34 centimetres tall.\n• Distances along roads are accurate; the shapes of coastlines are heavily distorted.\n• It was designed to be rolled and carried.\n\nThe student wants to explain why the map's distortions were not a flaw.",
    prompt:
      "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      "The Tabula Peutingeriana is 6.75 metres long but only 34 centimetres tall.",
      "Because it was made to be rolled up and used for travel along roads, the map keeps road distances accurate and lets coastlines distort.",
      "The Tabula Peutingeriana is a medieval copy of a Roman original.",
      "Coastlines on the Tabula Peutingeriana are heavily distorted.",
    ],
    ans: "B",
    exp: "Justifying the distortion requires linking the map's purpose — portable route-finding — to what it chose to keep accurate, and only choice B does both. Choice D states the distortion without offering any reason it was acceptable.",
  },
  {
    d: "expression_ideas",
    s: "transitions",
    diff: "medium",
    type: "mc",
    passage:
      "The team assumed that the pottery had been made locally, since the clay matched nearby deposits. Chemical analysis of the temper, however, identified volcanic sand from an island 300 kilometres away. _______ the vessels were probably shaped elsewhere and traded in.",
    prompt: "Which choice completes the text with the most logical transition?",
    choices: ["Nonetheless,", "Thus,", "Meanwhile,", "Granted,"],
    ans: "B",
    exp: "The final sentence draws the conclusion that follows from the temper evidence, so a resultative transition is needed. 'Nonetheless' would signal a reversal even though the sentence agrees with the evidence just presented.",
  },
  {
    d: "expression_ideas",
    s: "rhetorical_synthesis",
    diff: "hard",
    type: "mc",
    passage:
      "While researching, a student took these notes:\n• Wangari Maathai founded the Green Belt Movement in Kenya in 1977.\n• The movement paid rural women small sums for each seedling that survived.\n• More than 50 million trees have been planted through it.\n• Maathai received the Nobel Peace Prize in 2004.\n\nThe student wants to explain the movement's design to an audience interested in what made it effective.",
    prompt:
      "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      "Wangari Maathai, who received the Nobel Peace Prize in 2004, founded the Green Belt Movement in 1977.",
      "The Green Belt Movement, founded in Kenya in 1977, has planted more than 50 million trees.",
      "The Green Belt Movement paid rural women for each seedling that survived, tying income to the trees' long-term success.",
      "Wangari Maathai founded the Green Belt Movement in Kenya in 1977 and won the Nobel Peace Prize in 2004.",
    ],
    ans: "C",
    exp: "A question about design and effectiveness calls for the incentive structure — payment on survival rather than on planting — which only choice C reports and interprets. Choice B gives the result but not the mechanism that produced it.",
  },
  {
    d: "expression_ideas",
    s: "transitions",
    diff: "hard",
    type: "mc",
    passage:
      "Standard models predicted that the alloy would lose strength above 600°C, as its grain boundaries coarsened. In tests it held its strength to 850°C. _______ the boundaries were found to be pinned by nanoscale oxide particles that the models did not include.",
    prompt: "Which choice completes the text with the most logical transition?",
    choices: ["Notably,", "In contrast,", "That is because", "Similarly,"],
    ans: "C",
    exp: "The final sentence supplies the mechanism explaining the unexpected result, so an explicitly causal connector is required. 'Notably' would merely flag the finding as interesting and would lose the explanatory link the sentence actually performs.",
  },
];
