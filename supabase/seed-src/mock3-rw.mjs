// Full Mock 3 — Reading and Writing, Modules 1 and 2. 27 questions per module.
//
// Written 7 Oct 2026 to MEASURE the week of daily practice, so it follows the
// official distribution, not her weak areas. Per module: Craft and Structure 8,
// Information and Ideas 7, Standard English Conventions 7, Expression of Ideas 5.
// Cross-Text Connections appears exactly once in the whole test (Module 1).
//
// Calibration corrections from Mock 2: Conventions are written at the official
// level (boundaries, non-essential pairs, "no punctuation belongs here"), and
// Module 1 is a broad easy/medium/hard mix while Module 2 is the upper module.
//
// All passages and questions are original. Quantitative questions state their
// figures in prose or as a simple inline table; nothing depends on an image.

export const MOCK3_RW_1 = [
  // ================= Craft and Structure (8) =================
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "easy",
    type: "mc",
    passage:
      "Ice cores drilled from Antarctic glaciers hold air bubbles trapped for hundreds of thousands of years. Because each layer of snow sealed in a sample of the atmosphere as it fell, the cores provide an unusually _______ record of past carbon dioxide levels, one that does not depend on indirect estimates.",
    prompt: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["direct", "contested", "brief", "ornate"],
    ans: "A",
    exp: "The final clause defines the blank by contrast: a record that 'does not depend on indirect estimates' is a direct one. 'Brief' is the trap for a reader who skims 'sample,' but the cores span hundreds of thousands of years, the opposite of brief.",
  },
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "easy",
    type: "mc",
    passage:
      "The architect's first designs for the library were praised for their ambition but rejected as _______: the cantilevered reading rooms alone would have cost three times the city's entire budget.",
    prompt: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["conventional", "impractical", "derivative", "modest"],
    ans: "B",
    exp: "The colon explains the rejection with a cost three times the budget, so the designs could not be carried out: impractical. 'Modest' and 'conventional' contradict 'ambition,' and 'derivative' (copied) has no support in the text.",
  },
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "medium",
    type: "mc",
    passage:
      "Beatrix Potter is remembered for her children's books, yet her early study of fungi was serious enough that a paper of hers was read to the Linnean Society in 1897. Historians now describe her hundreds of mycological drawings as _______, recording spore structures with a precision the amateur sketches of the period rarely matched.",
    prompt: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["whimsical", "rudimentary", "meticulous", "derivative"],
    ans: "C",
    exp: "The clue is 'a precision the amateur sketches of the period rarely matched,' which calls for extremely careful work: meticulous. 'Whimsical' is the trap set by her fame for children's books; the sentence is explicitly contrasting that reputation with her scientific rigor.",
  },
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "hard",
    type: "mc",
    passage:
      "Critics expected the novelist's memoir to settle the long debate over which events in her fiction were drawn from life. Instead, the book is deliberately _______: it narrates the same childhood summer three times, each version contradicting the last, and never says which one is true.",
    prompt: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["exhaustive", "equivocal", "candid", "nostalgic"],
    ans: "B",
    exp: "Three contradictory versions with no verdict make the book noncommittal, or equivocal. 'Candid' is the trap, since memoirs are expected to be frank, but a book that refuses to say what is true is the opposite of candid.",
  },
  {
    d: "craft_structure",
    s: "text_structure_purpose",
    diff: "easy",
    type: "mc",
    passage:
      "Mangrove forests grow where rivers meet the sea, in water too salty for most trees. Their tangled roots slow incoming waves, trapping sediment and building up the shoreline over time. For coastal towns, this makes a mangrove belt a living seawall, one that repairs itself after a storm, which no concrete wall can do.",
    prompt: "Which choice best describes the function of the third sentence in the text as a whole?",
    choices: [
      "It explains why mangroves can survive in salt water.",
      "It presents a practical benefit that follows from the process described in the second sentence.",
      "It introduces a counterargument to the claim that mangroves protect shorelines.",
      "It compares the cost of planting mangroves with the cost of building concrete walls.",
    ],
    ans: "B",
    exp: "Sentence two describes what the roots do; sentence three draws out what that means for towns, a self-repairing seawall. Choice D is the trap: concrete walls are mentioned, but for what they cannot do, not for what they cost.",
  },
  {
    d: "craft_structure",
    s: "text_structure_purpose",
    diff: "medium",
    type: "mc",
    passage:
      "For much of the twentieth century, the standard explanation for the Moon's craters was volcanic. In 1960, geologist Eugene Shoemaker showed that Meteor Crater in Arizona contained minerals that form only under the sudden, extreme pressure of an impact, not the slow heat of an eruption. Within a decade, impact had replaced eruption as the accepted origin of nearly every lunar crater.",
    prompt: "Which choice best describes the overall structure of the text?",
    choices: [
      "Two competing theories are compared, and both are rejected.",
      "A discovery is described, and its practical applications are listed.",
      "A long-held explanation is stated, evidence against it is presented, and the resulting shift in scientific opinion is noted.",
      "A hypothesis is proposed, and an experiment to test it is outlined.",
    ],
    ans: "C",
    exp: "The passage moves from the old view (volcanic) to contrary evidence (Shoemaker's minerals) to the new consensus (impact). Choice A is the trap: there are two theories, but only one is rejected, and the other wins.",
  },
  {
    d: "craft_structure",
    s: "text_structure_purpose",
    diff: "hard",
    type: "mc",
    passage:
      "The letter had been in the drawer for eleven years, and in all that time Teodros had not opened it. He knew what it said; his mother had told him, more than once, the afternoon she wrote it. What he did not know was whether he would still recognize her handwriting, and it was this, not the words, that kept the drawer shut.",
    prompt: "Which choice best states the main purpose of the text?",
    choices: [
      "To explain the contents of a letter that a character has refused to read",
      "To suggest that a character avoids the letter out of fear about his own fading memory of his mother, not because of what it says",
      "To show that a character resents his mother for a message she left him",
      "To describe the drawer and the room in which a letter has been kept",
    ],
    ans: "B",
    exp: "The last sentence names the real obstacle: 'whether he would still recognize her handwriting,' and then insists 'it was this, not the words.' Choice A reverses the emphasis, since the passage says he already knows the contents and that they are not the issue.",
  },
  {
    d: "craft_structure",
    s: "cross_text_connections",
    diff: "hard",
    type: "mc",
    passage:
      "Text 1\nOctopuses and squid rewrite their own RNA at a rate seen in no other animals, altering the proteins their nerve cells make without changing the underlying genes. One research team argues that this is an elegant solution to life in variable seas: an octopus can retune its nervous system to the cold within hours rather than waiting generations for a useful mutation.\n\nText 2\nA second team agrees that RNA editing lets cephalopods adjust quickly but points to a hidden price. For editing to work, the genetic sequence around each editing site must stay unchanged, so those regions accumulate far fewer mutations over evolutionary time. What makes an octopus flexible today may leave its lineage less able to change tomorrow.",
    prompt: "Based on the texts, how would the second team most likely respond to the first team's description of RNA editing as 'an elegant solution'?",
    choices: [
      "By denying that RNA editing allows octopuses to adjust to changes in temperature",
      "By arguing that the solution comes at the cost of reduced long-term evolutionary flexibility",
      "By claiming that genetic mutations are a faster route to adaptation than RNA editing",
      "By suggesting that squid, not octopuses, rely most heavily on RNA editing",
    ],
    ans: "B",
    exp: "Text 2 'agrees' editing works in the short term but stresses 'a hidden price': fewer mutations over evolutionary time. Choice A is the trap for a reader expecting disagreement; the second team concedes the short-term benefit and disputes only the long-term bargain.",
  },

  // ================= Information and Ideas (7) =================
  {
    d: "information_ideas",
    s: "central_ideas_details",
    diff: "easy",
    type: "mc",
    passage:
      "Before mechanical refrigeration, ice was a global commodity. In the 1830s Frederic Tudor's company cut ice from ponds near Boston, packed it in sawdust, and shipped it as far as Calcutta, where it sold at a profit even though much of each cargo melted on the way. The insulated icehouses built at ports to store it were the direct ancestors of the modern cold-storage warehouse.",
    prompt: "Which choice best states the main idea of the text?",
    choices: [
      "The nineteenth-century ice trade carried natural ice across enormous distances and laid the groundwork for modern cold storage.",
      "Frederic Tudor's ice business failed because most of each cargo melted before arrival.",
      "Boston was the most important port in the world during the 1830s.",
      "Mechanical refrigeration was invented to replace the unreliable ice trade.",
    ],
    ans: "A",
    exp: "The passage describes the trade's reach and then its legacy in the final sentence, which choice A captures. Choice B is the trap: melting is mentioned, but the ice still 'sold at a profit,' so the business did not fail.",
  },
  {
    d: "information_ideas",
    s: "central_ideas_details",
    diff: "medium",
    type: "mc",
    passage:
      "My grandfather kept bees the way other men kept secrets: without discussing it, and with a patience that seemed to cost him nothing. In the mornings he would stand at the hives bareheaded, and the bees would walk across his hands as if he were a fence post. I asked him once whether he was ever afraid. He said fear was a smell, and that he had simply learned not to make it.",
    prompt: "Which choice best states the main idea of the text?",
    choices: [
      "The narrator's grandfather concealed important family matters from his relatives.",
      "The narrator's grandfather had a calm, almost instinctive ease with his bees that the narrator found remarkable.",
      "Beekeeping is dangerous and should be done with protective clothing.",
      "The narrator hoped to take over the grandfather's hives one day.",
    ],
    ans: "B",
    exp: "Every detail, from the bare head to the bees treating him like a fence post to his answer about fear, builds a portrait of unforced calm. Choice A takes the opening comparison literally; 'the way other men kept secrets' describes his quiet manner, not actual secrets.",
  },
  {
    d: "information_ideas",
    s: "evidence_textual",
    diff: "easy",
    type: "mc",
    passage:
      "Sperm whales communicate in patterned sequences of clicks, and different clans use noticeably different rhythms. Some researchers believe these rhythms function partly as identity signals, like a dialect. If so, whales should respond differently to clicks from their own clan than to clicks from others.",
    prompt: "Which finding, if true, would most directly support the researchers' belief?",
    choices: [
      "Whales approached underwater speakers playing their own clan's click patterns but moved away from speakers playing other clans' patterns.",
      "Sperm whales produce clicks across a wider range of frequencies than earlier studies measured.",
      "Clans living in different oceans hunt different species of squid.",
      "Young sperm whales produce fewer clicks per minute than adults do.",
    ],
    ans: "A",
    exp: "The passage sets up a test in its last sentence, and choice A reports exactly that result: different behavior toward own-clan and other-clan clicks. The other choices describe whale sounds or habits but say nothing about whether clicks mark identity.",
  },
  {
    d: "information_ideas",
    s: "evidence_textual",
    diff: "hard",
    type: "mc",
    passage:
      "A historian argues that mass-produced cast-iron cooking stoves spread rapidly across rural New England in the 1840s mainly because they burned far less wood than open hearths, a decisive advantage in districts where woodlots were shrinking.",
    prompt: "Which finding, if true, would most directly weaken the historian's argument?",
    choices: [
      "Stoves sold fastest in the heavily forested counties where firewood remained cheap and abundant.",
      "Most stove manufacturers of the 1840s were located in Pennsylvania rather than in New England.",
      "Cast-iron stoves were also sold in large numbers in cities.",
      "Open hearths continued to be used for some cooking tasks even in homes that owned a stove.",
    ],
    ans: "A",
    exp: "The argument rests on fuel scarcity driving sales; if sales were strongest where wood was plentiful, scarcity cannot be the main reason. Choice D is the trap: continued hearth use does not touch the question of why stoves spread quickly.",
  },
  {
    d: "information_ideas",
    s: "evidence_quantitative",
    diff: "easy",
    type: "mc",
    passage:
      "A school tracked the number of library books borrowed per student each year.\n\nYear | Books borrowed per student\n2021 | 6.1\n2022 | 5.4\n2023 | 7.9\n2024 | 8.3\n\nThe librarian claims that a reading program launched at the start of 2023 reversed a decline in borrowing.",
    prompt: "Which choice best describes data from the table that support the librarian's claim?",
    choices: [
      "Borrowing fell from 2021 to 2022, then rose sharply in 2023 and continued to rise in 2024.",
      "Borrowing was higher in 2021 than in any later year.",
      "Borrowing rose steadily every year from 2021 to 2024.",
      "Borrowing in 2024 was lower than borrowing in 2023.",
    ],
    ans: "A",
    exp: "The claim has two parts, a decline and a reversal, and choice A shows both: 6.1 to 5.4, then 7.9 and 8.3 after the program began. Choice C is the trap: it describes growth but erases the decline, and the 2022 figure contradicts it.",
  },
  {
    d: "information_ideas",
    s: "inferences",
    diff: "medium",
    type: "mc",
    passage:
      "Homing pigeons released hundreds of kilometers from their loft return reliably, and for decades the leading explanation was that they navigate by the Sun. Yet pigeons also find their way home on heavily overcast days, and birds fitted with frosted lenses that blur everything beyond a few meters still arrive at their lofts. This suggests that _______",
    prompt: "Which choice most logically completes the text?",
    choices: [
      "pigeons rely mainly on recognizing landmarks along the route.",
      "pigeons use at least one navigational cue that does not require a clear view of the Sun or the landscape.",
      "pigeons are unable to navigate when the Sun is hidden.",
      "frosted lenses sharpen a pigeon's sense of direction.",
    ],
    ans: "B",
    exp: "Overcast skies remove the Sun and frosted lenses remove the landscape, yet the birds still get home, so some other cue must exist. Choice A is the trap: blurred vision rules out landmark recognition rather than supporting it.",
  },
  {
    d: "information_ideas",
    s: "inferences",
    diff: "hard",
    type: "mc",
    passage:
      "Medieval parchment was made from animal skin, and traces of the animal's DNA survive in the pages. Sampling hundreds of legal deeds from one English region, researchers found that the skins came overwhelmingly from local sheep rather than from the calfskin preferred for luxury manuscripts. Since a legal deed had to be durable but not beautiful, the finding implies that _______",
    prompt: "Which choice most logically completes the text?",
    choices: [
      "medieval scribes preferred sheepskin for every type of document.",
      "the choice of animal skin was governed by cost and purpose rather than by prestige.",
      "calfskin manuscripts were produced only in regions that had no sheep.",
      "English legal documents from the period were rarely preserved.",
    ],
    ans: "B",
    exp: "Cheap local sheepskin for plain, durable deeds and calfskin for luxury books is a pattern of matching material to purpose and budget. Choice A overreaches: the passage itself says calfskin was preferred for luxury manuscripts, so sheepskin was not used for everything.",
  },

  // ================= Standard English Conventions (7) =================
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "easy",
    type: "mc",
    passage:
      "The Sahel's Great Green Wall was conceived in 2007 as a continuous band of trees across _______ has since become a mosaic of local projects, from drought-resistant orchards to restored grazing land.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["Africa; it", "Africa, it", "Africa it", "Africa, and, it"],
    ans: "A",
    exp: "'The Great Green Wall was conceived as a band of trees across Africa' and 'it has since become a mosaic' are both complete sentences, so a semicolon joins them. Choice B is a comma splice, choice C a run-on, and choice D wraps 'and' in commas that do not belong.",
  },
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "medium",
    type: "mc",
    passage:
      "The expedition's survey of the cave turned up three species previously unknown to _______ a blind beetle, a translucent shrimp, and a fungus that glows faintly in the dark.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["science;", "science:", "science.", "science"],
    ans: "B",
    exp: "The words before the blank form a complete sentence and the words after it are the list that explains it, which is exactly what a colon introduces. A semicolon or period would leave the list stranded as a fragment with no verb.",
  },
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "medium",
    type: "mc",
    passage:
      "The question of whether the city's medieval walls should be rebuilt or left as picturesque _______ divided the council for a decade.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["ruins, has", "ruins has", "ruins; has", "ruins — has"],
    ans: "B",
    exp: "The subject is 'The question' and 'has divided' is its verb; nothing may separate a subject from its verb, however long the subject runs. The comma in choice A is the natural breath after a long subject, which is precisely the trap.",
  },
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "hard",
    type: "mc",
    passage:
      "Three ingredients — teff flour, water, and a starter saved from the previous _______ are all that traditional injera requires.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["batch,", "batch", "batch —", "batch;"],
    ans: "C",
    exp: "The list opened with a dash, so it must close with a dash before the sentence resumes at 'are.' Choice A mixes a dash with a comma, the most common pair error on the test, and choice B never closes the interruption at all.",
  },
  {
    d: "standard_conventions",
    s: "form_structure_sense",
    diff: "easy",
    type: "mc",
    passage:
      "Each of the radio telescopes in the array, spread across a high plateau in northern Chile, _______ its own cooling system.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["require", "are requiring", "requires", "have required"],
    ans: "C",
    exp: "The subject is 'Each,' which is always singular, so the verb is 'requires.' The plural 'telescopes' and the long interrupting phrase are placed next to the blank to pull the ear toward 'require.'",
  },
  {
    d: "standard_conventions",
    s: "form_structure_sense",
    diff: "medium",
    type: "mc",
    passage:
      "_______ engineers replaced the bridge's steel cables one at a time so that traffic never had to stop.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      "Corroded by decades of salt spray,",
      "Corroding in decades of salt spray,",
      "Having been corroded by decades of salt spray,",
      "Finding the cables corroded by decades of salt spray,",
    ],
    ans: "D",
    exp: "An opening phrase must describe the noun that follows the comma, and that noun is 'engineers.' Only choice D describes something the engineers did; every other choice makes the engineers themselves the thing corroded, a dangling modifier.",
  },
  {
    d: "standard_conventions",
    s: "form_structure_sense",
    diff: "hard",
    type: "mc",
    passage:
      "The park's guidebook advises visitors to arrive early, to carry at least two liters of water, and _______ the marked trails even when a shortcut looks obvious.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["staying on", "to stay on", "that they stay on", "they should stay on"],
    ans: "B",
    exp: "The list already has two items in the same form, 'to arrive' and 'to carry,' so the third must match: 'to stay.' Choice A breaks the parallel with an -ing form, and choices C and D jam a new clause where a matching phrase belongs.",
  },

  // ================= Expression of Ideas (5) =================
  {
    d: "expression_ideas",
    s: "transitions",
    diff: "easy",
    type: "mc",
    passage:
      "A lichen looks like a single organism, but each one is a partnership between a fungus and an alga or a cyanobacterium, with the fungus providing shelter and the alga providing food. _______ a lichen can colonize bare rock where neither partner could survive on its own.",
    prompt: "Which choice completes the text with the most logical transition?",
    choices: ["For example,", "In contrast,", "As a result,", "Similarly,"],
    ans: "C",
    exp: "Living on bare rock is a consequence of the partnership described in the first sentence, so the transition must signal a result. 'For example' is the trap: the second sentence is not an instance of a partnership but an outcome of it.",
  },
  {
    d: "expression_ideas",
    s: "transitions",
    diff: "medium",
    type: "mc",
    passage:
      "Early electric cars of the 1900s were quiet, clean, and easy to start, and for a few years they outsold gasoline models in several American cities. _______ their short range and the spread of cheap gasoline soon pushed them out of the market.",
    prompt: "Which choice completes the text with the most logical transition?",
    choices: ["Therefore,", "However,", "In addition,", "Likewise,"],
    ans: "B",
    exp: "The first sentence lists advantages and early success; the second reports failure, so the relationship is contrast. 'Therefore' is the trap: being pushed out of the market is not a result of being quiet and clean.",
  },
  {
    d: "expression_ideas",
    s: "transitions",
    diff: "hard",
    type: "mc",
    passage:
      "The restorers had assumed that the painting's dark varnish was original. Chemical analysis showed that it had been applied two centuries after the artist's death; _______ removing it would not be altering the artist's work but recovering it.",
    prompt: "Which choice completes the text with the most logical transition?",
    choices: ["nevertheless,", "for instance,", "meanwhile,", "in other words,"],
    ans: "D",
    exp: "The final clause restates what the analysis means in practice, so it needs a transition that signals restatement. 'Nevertheless' would set the clause against the analysis, when it actually follows from it.",
  },
  {
    d: "expression_ideas",
    s: "rhetorical_synthesis",
    diff: "medium",
    type: "mc",
    passage:
      "While researching a topic, a student has taken the following notes:\n• Teff is a grain that was domesticated in the Ethiopian highlands thousands of years ago.\n• Its seeds are tiny: about 150 teff grains weigh as much as a single grain of wheat.\n• Teff is naturally gluten-free.\n• It is the main ingredient of injera, a fermented flatbread eaten daily in Ethiopia and Eritrea.\n• Since the 2010s, teff flour has been sold in health-food stores in Europe and North America.",
    prompt:
      "The student wants to emphasize the contrast between teff's long history in one region and its recent spread elsewhere. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      "Teff is naturally gluten-free and is the main ingredient of injera, a fermented flatbread.",
      "Domesticated in the Ethiopian highlands thousands of years ago, teff reached health-food stores in Europe and North America only in the 2010s.",
      "About 150 teff grains weigh as much as a single grain of wheat.",
      "Injera, a fermented flatbread made from teff, is eaten daily in Ethiopia and Eritrea.",
    ],
    ans: "B",
    exp: "The goal names two things, a long history in one place and a recent spread elsewhere, and only choice B puts both in one sentence with 'thousands of years ago' against 'only in the 2010s.' The others are true notes but address a single idea each.",
  },
  {
    d: "expression_ideas",
    s: "rhetorical_synthesis",
    diff: "hard",
    type: "mc",
    passage:
      "While researching a topic, a student has taken the following notes:\n• Hedy Lamarr was a Hollywood film star in the 1930s and 1940s.\n• In 1942 she and the composer George Antheil patented a 'frequency-hopping' system to keep radio-guided torpedoes from being jammed.\n• The US Navy did not adopt the system during World War II.\n• Decades later, frequency-hopping principles underpinned technologies such as Bluetooth and Wi-Fi.\n• Lamarr received an award from the Electronic Frontier Foundation in 1997.",
    prompt:
      "The student wants to explain why the invention's importance was not recognized at the time. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      "Hedy Lamarr, a Hollywood film star of the 1930s and 1940s, received an award from the Electronic Frontier Foundation in 1997.",
      "Frequency hopping, which Lamarr and Antheil patented in 1942, underpins Bluetooth and Wi-Fi.",
      "Although Lamarr and Antheil patented frequency hopping in 1942, the Navy did not adopt it during the war, and its value became clear only decades later, when the same principles underpinned Bluetooth and Wi-Fi.",
      "Lamarr and Antheil designed their system to keep radio-guided torpedoes from being jammed.",
    ],
    ans: "C",
    exp: "Explaining why importance went unrecognized requires both the rejection at the time (the Navy did not adopt it) and the late vindication (decades later). Choice B is the trap: it links the patent to Wi-Fi but says nothing about the delay or why it happened.",
  },
];

export const MOCK3_RW_2 = [
  // ================= Craft and Structure (8) =================
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "easy",
    type: "mc",
    passage:
      "Tardigrades, microscopic animals found in moss and pond sediment, are famously _______: individuals have survived being frozen, heated past the boiling point of water, and exposed to the vacuum of space.",
    prompt: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["elusive", "resilient", "abundant", "docile"],
    ans: "B",
    exp: "The colon lists extreme conditions the animals survived, so the blank must mean able to withstand hardship: resilient. 'Abundant' is the trap for a reader who seizes on 'found in moss and pond sediment,' but the list is about survival, not numbers.",
  },
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "medium",
    type: "mc",
    passage:
      "The treaty's central clause was so _______ that both governments announced the agreement as a victory, each reading the wording in its own favor and each sincerely believing the other had conceded.",
    prompt: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["rigid", "explicit", "ambiguous", "provisional"],
    ans: "C",
    exp: "A clause that two sides can read in opposite ways is ambiguous. 'Explicit' states the opposite of what the sentence describes, and 'provisional' (temporary) has nothing to do with how the wording was interpreted.",
  },
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "medium",
    type: "mc",
    passage:
      "Ibn Battuta's account of his fourteenth-century travels across Africa and Asia is _______ in places, since he describes a few cities he almost certainly never visited, yet it remains an irreplaceable record of the Islamic world of his day.",
    prompt: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["unreliable", "exhaustive", "concise", "impartial"],
    ans: "A",
    exp: "Describing cities he never saw makes parts of the account untrustworthy, and 'yet it remains irreplaceable' confirms the blank is a flaw being conceded. 'Exhaustive' would be praise, which clashes with 'yet.'",
  },
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "hard",
    type: "mc",
    passage:
      "The composer's late quartets were received coolly at their premieres, and even sympathetic critics found them _______; only a generation later did audiences begin to hear their strangeness as depth rather than confusion.",
    prompt: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["sentimental", "impenetrable", "derivative", "conventional"],
    ans: "B",
    exp: "The clue is 'strangeness' first heard as 'confusion,' so early listeners found the works impossible to understand: impenetrable. 'Conventional' and 'derivative' describe music that is too familiar, the opposite of strange.",
  },
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "hard",
    type: "mc",
    passage:
      "Rather than _______ the rival theory, the paper simply ignores it, which several reviewers found more troubling than an open disagreement would have been.",
    prompt: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["endorsing", "anticipating", "refuting", "publicizing"],
    ans: "C",
    exp: "The reviewers wanted 'an open disagreement' instead of silence, so the thing the paper failed to do is argue against the rival theory: refute it. 'Endorsing' is the trap set by 'rather than,' but endorsing a rival would not be a disagreement at all.",
  },
  {
    d: "craft_structure",
    s: "text_structure_purpose",
    diff: "medium",
    type: "mc",
    passage:
      "Sourdough starters are often said to belong to their city, as if a San Francisco loaf could not be made anywhere else. A 2020 study that sent identical flour and instructions to professional bakers on four continents found that the resulting starters did vary, but that the variation tracked the microbes on the bakers' hands and in their kitchens, not their location on the map. The terroir of sourdough, it seems, is personal rather than regional.",
    prompt: "Which choice best describes the function of the second sentence in the text as a whole?",
    choices: [
      "It provides evidence that supports the popular belief described in the first sentence.",
      "It presents research findings that undercut the popular belief described in the first sentence.",
      "It defines the term 'terroir' as it is used in the third sentence.",
      "It describes the steps required to make a sourdough starter at home.",
    ],
    ans: "B",
    exp: "The first sentence states a belief (starters belong to a city); the second reports a study showing location did not matter. Choice A reverses the relationship, a trap for a reader who notices that the starters 'did vary' without reading what the variation tracked.",
  },
  {
    d: "craft_structure",
    s: "text_structure_purpose",
    diff: "hard",
    type: "mc",
    passage:
      "She had learned the river the way one learns a language: first its nouns, the sandbar, the sunken barge, the eddy below the mill, and only later its grammar, the way a rise upstream would rearrange every one of them by morning. Visitors asked her how deep it was. She never knew how to answer. Deep where, she wanted to say. Deep when.",
    prompt: "Which choice best states the main purpose of the text?",
    choices: [
      "To warn visitors about the hidden hazards of the river",
      "To criticize visitors for asking questions they could answer themselves",
      "To convey that the narrator's knowledge of the river is intimate and ever-changing in a way a simple question cannot capture",
      "To describe the geography of the river in precise detail",
    ],
    ans: "C",
    exp: "The language comparison shows her knowledge as layered and alive, and 'Deep where... Deep when' shows why a single number cannot hold it. Choice B is the trap: she is not scornful of the visitors, only unable to compress what she knows into their question.",
  },
  {
    d: "craft_structure",
    s: "text_structure_purpose",
    diff: "hard",
    type: "mc",
    passage:
      "Supporters of a four-day school week point to lower costs and better teacher retention. Skeptics reply that the savings are small, since buildings still need heating, and that working parents must find childcare for the fifth day. The best evidence so far comes from rural districts, where the shorter week has coincided with modest gains in attendance but no measurable change in test scores. The debate remains unsettled, in other words, because the policy's costs and benefits fall on different people.",
    prompt: "Which choice best describes the overall structure of the text?",
    choices: [
      "A policy is proposed, and the reasons for rejecting it are listed.",
      "Two opposing positions are summarized, the available evidence is weighed, and a reason the disagreement persists is offered.",
      "The author argues for one side of a debate and then concedes a point to the other side.",
      "A prediction about a policy is made and then confirmed by data from rural districts.",
    ],
    ans: "B",
    exp: "Supporters, then skeptics, then the evidence, then a diagnosis of why no one is convinced: that is choice B step by step. Choice C is the trap; the author summarizes both sides without taking either.",
  },

  // ================= Information and Ideas (7) =================
  {
    d: "information_ideas",
    s: "central_ideas_details",
    diff: "medium",
    type: "mc",
    passage:
      "A Venus flytrap does not close on the first touch. Tiny hairs inside the trap must be bent twice within about twenty seconds before the lobes snap shut, and the plant does not begin producing digestive enzymes until the struggling insect has triggered the hairs several more times. This counting keeps the plant from wasting energy on raindrops or windblown debris, a crude but effective way of telling food from false alarms.",
    prompt: "Which choice best states the main idea of the text?",
    choices: [
      "The Venus flytrap's need for repeated triggering prevents it from closing on things that are not prey.",
      "The Venus flytrap closes faster than any other carnivorous plant.",
      "Insects can escape a Venus flytrap if they stop moving after the trap closes.",
      "The Venus flytrap produces digestive enzymes continuously.",
    ],
    ans: "A",
    exp: "The passage explains the counting mechanism and then states its purpose in the last sentence, which choice A restates. Choice C is a tempting inference, but the text never says what happens to an insect that stays still, so it cannot be the main idea.",
  },
  {
    d: "information_ideas",
    s: "central_ideas_details",
    diff: "hard",
    type: "mc",
    passage:
      "Every spring my father repainted the boat the same blue, and every spring he claimed it was a slightly different shade, truer, he said, closer to what the boat was supposed to be. I could never see the difference. It was years before I understood that the painting was not about the color at all, and that a person may spend a lifetime perfecting something precisely so that it can never be finished.",
    prompt: "Which choice best states the main idea of the text?",
    choices: [
      "The narrator doubted the father's ability to tell one shade of blue from another.",
      "The boat required repainting every year to protect it from the weather.",
      "The narrator came to see the father's annual repainting as a ritual whose value lay in the act itself, not in the result.",
      "The narrator regrets never having learned to paint the boat.",
    ],
    ans: "C",
    exp: "The final sentence delivers the realization: the painting 'was not about the color at all' but about an activity kept deliberately unfinished. Choice A is a detail from the middle of the passage that the ending reinterprets, not the main idea.",
  },
  {
    d: "information_ideas",
    s: "evidence_textual",
    diff: "easy",
    type: "mc",
    passage:
      "Archaeologists excavating a Bronze Age settlement found a clay loom weight in nearly every house, although no finished textiles survived in the soil. They hypothesize that the settlement produced cloth for exchange with neighboring communities rather than for household use alone.",
    prompt: "Which finding, if true, would most directly support the archaeologists' hypothesis?",
    choices: [
      "The number of loom weights in each house far exceeds what a single family would need to clothe itself.",
      "Textiles decay quickly in the region's damp soil.",
      "The houses in the settlement were built of mud brick.",
      "The loom weights are similar in shape to those found at other sites in the region.",
    ],
    ans: "A",
    exp: "Weaving capacity well beyond a household's own needs points to production for others, which is the hypothesis. Choice B is the trap: it explains why no cloth survived, but says nothing about who the cloth was made for.",
  },
  {
    d: "information_ideas",
    s: "evidence_textual",
    diff: "hard",
    type: "mc",
    passage:
      "Linguists have proposed that a cluster of rare words shared by two unrelated languages spoken on opposite sides of a mountain range is evidence of direct trade contact between the two peoples in the distant past.",
    prompt: "Which finding, if true, would most directly weaken the linguists' proposal?",
    choices: [
      "Historical records show that a third language, spoken by merchants who crossed the range, contained all of the shared words.",
      "The two languages have very different grammatical structures.",
      "Both languages are still spoken by sizable communities today.",
      "The mountain range has several passes that remain open throughout the year.",
    ],
    ans: "A",
    exp: "If a merchant language carried the words to both sides, the two peoples need never have met, so the evidence for direct contact collapses. Choice D is the trap: open passes make direct contact easier, which would support the proposal rather than weaken it.",
  },
  {
    d: "information_ideas",
    s: "evidence_quantitative",
    diff: "hard",
    type: "mc",
    passage:
      "A city compared ridership on two of its bus routes.\n\nRoute | Riders per day, 2019 | Riders per day, 2024\nRoute 5 | 4,000 | 5,200\nRoute 9 | 12,000 | 13,200\n\nA transit planner argues that Route 5 has grown faster than Route 9 and should receive the next additional bus.",
    prompt: "Which choice best describes data from the table that support the planner's argument?",
    choices: [
      "Route 5's ridership rose by 30 percent, while Route 9's rose by 10 percent.",
      "Route 9 gained more riders per day than Route 5 did between 2019 and 2024.",
      "Both routes gained exactly 1,200 riders per day between 2019 and 2024.",
      "Route 9 carried more riders than Route 5 in both years.",
    ],
    ans: "A",
    exp: "Both routes gained 1,200 riders, but 1,200 is 30 percent of 4,000 and only 10 percent of 12,000, so Route 5 grew faster in the sense the planner means. Choice C is the trap: it is true, yet equal gains do not support a claim about faster growth.",
  },
  {
    d: "information_ideas",
    s: "inferences",
    diff: "easy",
    type: "mc",
    passage:
      "In the 1990s a city planted thousands of street trees of a single fast-growing species, chosen for its uniform look. When a beetle that attacks only that species arrived two decades later, the city lost nearly half its tree canopy within five years. Planners in other cities have drawn a clear lesson from the episode: _______",
    prompt: "Which choice most logically completes the text?",
    choices: [
      "fast-growing trees should never be planted along city streets.",
      "a street canopy made up of many species is far less likely to be devastated by any single pest.",
      "beetles are the greatest threat facing urban trees.",
      "trees planted in the 1990s are now too old to be useful.",
    ],
    ans: "B",
    exp: "The disaster followed from planting one species, so the lesson is diversity. Choice A is the trap: the problem was uniformity, not growth speed, which the passage mentions only as the reason the species was chosen.",
  },
  {
    d: "information_ideas",
    s: "inferences",
    diff: "hard",
    type: "mc",
    passage:
      "In many languages the words for 'two' and 'three' are far older than the words for larger numbers, and such small-number words are rarely replaced over the centuries. Linguists who reconstruct ancient vocabularies therefore treat them as unusually stable anchors. When two languages have strikingly different words for 'two,' then, _______",
    prompt: "Which choice most logically completes the text?",
    choices: [
      "the two languages must have borrowed their number words from a third language.",
      "the two languages are probably either unrelated or separated by a very long period of divergence.",
      "the speakers of both languages most likely used a counting system based on ten.",
      "the two languages will also differ in their words for 'three.'",
    ],
    ans: "B",
    exp: "If a word almost never changes, two languages that differ in it have either never shared it or have been apart long enough for a rare change to occur. Choice D is the trap: stability of one word does not guarantee anything about another word.",
  },

  // ================= Standard English Conventions (7) =================
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "medium",
    type: "mc",
    passage:
      "The mill's original waterwheel was moved to a museum in _______ the millstones still grind flour for the village bakery every Saturday.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["1987, however,", "1987 however,", "1987. However,", "1987, however"],
    ans: "C",
    exp: "Both halves are complete sentences, and 'however' belongs to the second, so the second must start fresh after a period. 'However' never has the power to join two sentences on its own, which makes every comma-based choice a splice or a run-on.",
  },
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "medium",
    type: "mc",
    passage:
      "The main threat to the reef is not tourism _______ warming water, which bleaches the coral by driving out the algae it depends on.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["but:", "but;", "but", "but,"],
    ans: "C",
    exp: "'Not tourism but warming water' is a single contrast inside one clause, and no punctuation belongs between 'but' and the noun it introduces. The colon and semicolon in choices A and B both require a complete sentence before them, which 'The main threat is not tourism but' is not.",
  },
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "hard",
    type: "mc",
    passage:
      "The violinist, whose recordings from the 1950s are still in _______ never performed in public after the age of forty.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["print", "print;", "print,", "print —"],
    ans: "C",
    exp: "The clause 'whose recordings from the 1950s are still in print' is a non-essential aside that opened with a comma after 'violinist,' so it must close with a comma before the verb 'performed.' The dash in choice D mixes fence types, and choice A never closes the aside.",
  },
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "hard",
    type: "mc",
    passage:
      "The museum's three largest gifts came from a shipping family in Mumbai, _______ a retired schoolteacher in Lagos, Nigeria; and an anonymous donor who gave through a lawyer.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["India,", "India:", "India;", "India"],
    ans: "C",
    exp: "Because the list items contain commas of their own ('Mumbai, India'), the items must be separated by semicolons, and the '; and' before the last item confirms it. A comma at the blank would blur where the first donor ends and the second begins.",
  },
  {
    d: "standard_conventions",
    s: "form_structure_sense",
    diff: "medium",
    type: "mc",
    passage:
      "The variety of dialects spoken along the river's four hundred miles _______ linguists for more than a century.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["have intrigued", "intrigue", "has intrigued", "are intriguing"],
    ans: "C",
    exp: "Cross out the prepositional phrases and the subject is 'The variety,' which is singular: 'has intrigued.' 'Dialects' and 'miles' sit next to the blank to pull the ear toward a plural verb.",
  },
  {
    d: "standard_conventions",
    s: "form_structure_sense",
    diff: "medium",
    type: "mc",
    passage:
      "When a bank and a credit union merge, _______ customers usually keep their original account numbers for at least a year.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["its", "their", "it's", "there"],
    ans: "B",
    exp: "The customers belong to two institutions, 'a bank and a credit union,' a plural antecedent, so the pronoun is 'their.' 'Its' is the trap for a reader who hears 'merge' and imagines a single resulting company, but the sentence names two.",
  },
  {
    d: "standard_conventions",
    s: "form_structure_sense",
    diff: "hard",
    type: "mc",
    passage:
      "Astronomers announced that the comet, which last passed close to Earth in 1986, _______ again in 2061.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["returned", "has returned", "will return", "would have returned"],
    ans: "C",
    exp: "The time cue '2061' places the return in the future, so the verb is 'will return.' Choice A is the trap for a reader whose ear locks onto 'announced' and '1986,' both past, but the blank describes a different event with its own date.",
  },

  // ================= Expression of Ideas (5) =================
  {
    d: "expression_ideas",
    s: "transitions",
    diff: "easy",
    type: "mc",
    passage:
      "Recycling glass saves energy, since crushed glass melts at a lower temperature than the raw sand it replaces. _______ many cities have stopped collecting it, because the crushed glass is heavy to haul and sells for very little.",
    prompt: "Which choice completes the text with the most logical transition?",
    choices: ["Consequently,", "For example,", "Even so,", "Similarly,"],
    ans: "C",
    exp: "The first sentence gives a reason to recycle glass; the second says cities have stopped anyway, which is a concession. 'Consequently' is the trap: saving energy is not the reason cities stopped collecting.",
  },
  {
    d: "expression_ideas",
    s: "transitions",
    diff: "hard",
    type: "mc",
    passage:
      "The Dutch tulip craze of the 1630s is routinely cited as the first speculative bubble, complete with fortunes lost overnight. _______ historians who have examined the surviving contracts find that most trades were never settled, and that the famous ruin of thousands of investors is largely a later invention.",
    prompt: "Which choice completes the text with the most logical transition?",
    choices: ["Thus", "Yet", "Indeed", "Likewise"],
    ans: "B",
    exp: "The second sentence contradicts the familiar story in the first, so the transition must signal contrast. 'Indeed' is the trap: it would promise confirmation of the fortunes-lost story, when the historians are dismantling it.",
  },
  {
    d: "expression_ideas",
    s: "rhetorical_synthesis",
    diff: "medium",
    type: "mc",
    passage:
      "While researching a topic, a student has taken the following notes:\n• The axolotl is a salamander native to lakes near Mexico City.\n• It can regrow a lost limb, including bone, muscle, and nerves, within months.\n• Unlike most salamanders, it keeps larval features such as external gills for its whole life.\n• In the wild it is critically endangered because most of its lake habitat has been drained.\n• Hundreds of thousands of axolotls live in laboratories and aquariums around the world.",
    prompt:
      "The student wants to highlight a paradox in the axolotl's situation. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      "The axolotl, a salamander native to lakes near Mexico City, keeps its external gills for its whole life.",
      "Although the axolotl is critically endangered in the wild, hundreds of thousands live in laboratories and aquariums around the world.",
      "An axolotl can regrow a lost limb, including bone, muscle, and nerves, within months.",
      "Most of the axolotl's lake habitat near Mexico City has been drained.",
    ],
    ans: "B",
    exp: "A paradox needs two facts that seem to clash, and only choice B pairs them: nearly gone in the wild, yet numbering in the hundreds of thousands in captivity. The other choices each present one fact with nothing to contradict it.",
  },
  {
    d: "expression_ideas",
    s: "rhetorical_synthesis",
    diff: "medium",
    type: "mc",
    passage:
      "While researching a topic, a student has taken the following notes:\n• Dorothea Lange photographed displaced farm families for a US government agency during the 1930s.\n• Her 1936 photograph 'Migrant Mother' became one of the most reproduced images of the Great Depression.\n• The woman in the photograph, Florence Owens Thompson, was not publicly identified until 1978.\n• Thompson later said the photograph had brought her no benefit.\n• Lange's field notes recorded the family's circumstances but not Thompson's name.",
    prompt:
      "The student wants to emphasize the gap between the photograph's fame and its subject's obscurity. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      "Dorothea Lange photographed displaced farm families for a government agency during the 1930s.",
      "Lange's field notes recorded the family's circumstances.",
      "'Migrant Mother' was taken in 1936 by the photographer Dorothea Lange.",
      "Although 'Migrant Mother' became one of the most reproduced images of the Depression, the woman it shows was not publicly identified until 1978 and said the photograph brought her nothing.",
    ],
    ans: "D",
    exp: "The goal sets fame against obscurity, and choice D holds both: 'most reproduced' on one side, unnamed for four decades and unrewarded on the other. Choice C mentions the photograph's origin but nothing about its subject.",
  },
  {
    d: "expression_ideas",
    s: "rhetorical_synthesis",
    diff: "hard",
    type: "mc",
    passage:
      "While researching a topic, a student has taken the following notes:\n• A city is deciding whether to replace its sodium streetlights with LEDs.\n• LEDs use about half as much electricity as sodium lamps.\n• LEDs last roughly four times as long, which reduces maintenance.\n• Early LED streetlights gave off a bluish light that residents in several cities found harsh.\n• Warmer-toned LEDs are now available at a similar price.",
    prompt:
      "The student wants to acknowledge a common objection to LED streetlights and explain why it may no longer apply. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      "LEDs use about half as much electricity as sodium lamps and last roughly four times as long.",
      "Although early LED streetlights gave off a bluish light that many residents found harsh, warmer-toned LEDs are now available at a similar price.",
      "A city is deciding whether to replace its sodium streetlights with LEDs.",
      "Residents in several cities objected to the harsh bluish light of early LED streetlights.",
    ],
    ans: "B",
    exp: "The goal has two parts, state the objection and explain why it may be outdated, and choice B does both with 'Although... harsh' and 'now available.' Choice D is the trap: it states the objection and then stops.",
  },
];
