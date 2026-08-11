// Eight focused drill sets, one per SAT domain, 8 original questions each.
// Untimed by default in the app; a suggested duration is stored on the part.

const rwCraft = [
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "easy",
    type: "mc",
    passage:
      "The engineer's proposal was praised for its candour: it listed every assumption that might fail and estimated what each failure would cost.",
    prompt: 'As used in the text, what does the word "candour" most nearly mean?',
    choices: ["Ambition", "Frankness", "Elegance", "Caution"],
    ans: "B",
    exp: "The colon explains the praise by describing a proposal that openly names its own weak points, which is frankness. 'Caution' describes the subject matter of the list rather than the quality of speech being praised.",
  },
  {
    d: "craft_structure",
    s: "text_structure_purpose",
    diff: "easy",
    type: "mc",
    passage:
      "Cities plant trees for shade, and shade lowers street temperatures. But young trees provide almost none, and a newly planted street may take fifteen years to cool measurably. Planning that ignores this delay overpromises relief.",
    prompt: "What is the main purpose of the text?",
    choices: [
      "To explain how trees lower street temperatures",
      "To caution that the benefit of tree planting arrives only after a long delay",
      "To argue that cities should stop planting street trees",
      "To compare young trees with mature trees in several cities",
    ],
    ans: "B",
    exp: "The passage grants the benefit and then focuses on the fifteen-year lag and the planning error it causes. Choice C overstates the point; the text criticises the timing of expectations, not the planting itself.",
  },
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "medium",
    type: "mc",
    passage:
      "Later editors treated the poet's punctuation as _______, silently replacing her dashes with commas. Manuscript study has since shown the dashes to be systematic and semantic.",
    prompt:
      "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["incidental", "unlawful", "conventional", "elaborate"],
    ans: "A",
    exp: "Editors who silently replace marks must regard them as unimportant, and the following sentence corrects that by showing the dashes carried meaning. 'Conventional' would suggest the dashes were ordinary, which gives no reason to replace them.",
  },
  {
    d: "craft_structure",
    s: "text_structure_purpose",
    diff: "medium",
    type: "mc",
    passage:
      "The following is adapted from a novel. Ama arranged the shop window as she did every Monday: the imported tins at eye level, the local soap below them, the sun-faded boxes she could not sell pushed to the back, where they would stay.",
    prompt: "What is the main effect of the final clause, 'where they would stay'?",
    choices: [
      "It suggests that Ama expects no change in the shop's fortunes.",
      "It shows that Ama intends to reorder the boxes soon.",
      "It reveals that the shop is unusually well stocked.",
      "It implies that customers prefer local soap to imported tins.",
    ],
    ans: "A",
    exp: "The clause converts a weekly arrangement into a permanent condition, quietly signalling resignation. Choice B reverses the meaning of 'would stay', which forecloses rather than promises change.",
  },
  {
    d: "craft_structure",
    s: "cross_text_connections",
    diff: "medium",
    type: "mc",
    passage:
      "Text 1: The critic argues that translations age faster than originals because each generation's idea of natural English changes.\n\nText 2: A 1611 translation of a Greek historian is still read for pleasure, while three twentieth-century versions of the same work are out of print.",
    prompt:
      "How does the example in Text 2 relate to the claim in Text 1?",
    choices: [
      "It illustrates the claim with a clear case.",
      "It complicates the claim by showing an older translation outlasting newer ones.",
      "It restates the claim in different terms.",
      "It shows that the claim applies only to Greek texts.",
    ],
    ans: "B",
    exp: "If translations aged fastest, the 1611 version should be the deadest, yet it is the one still read, so the example cuts against the rule. Choice A gets the direction backwards.",
  },
  {
    d: "craft_structure",
    s: "words_in_context",
    diff: "hard",
    type: "mc",
    passage:
      "The report's recommendations are _______: they name no agency, no budget line, and no date by which anything must happen.",
    prompt:
      "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["unenforceable", "controversial", "unprecedented", "expensive"],
    ans: "A",
    exp: "The listed absences — no responsible body, no money, no deadline — are precisely what would be needed to compel action, so the recommendations cannot be enforced. 'Controversial' is unsupported: the text says nothing about disagreement.",
  },
  {
    d: "craft_structure",
    s: "cross_text_connections",
    diff: "hard",
    type: "mc",
    passage:
      "Text 1: Because gut bacteria differ so much between individuals, the author argues that dietary advice should be personalised rather than universal.\n\nText 2: In a trial of 800 adults, blood-sugar responses to identical meals varied widely, but 90 percent of that variation was predicted by sleep, activity and meal timing rather than by microbiome composition.",
    prompt:
      "Based on Text 2, the author of Text 2 would most likely argue that Text 1's recommendation is",
    choices: [
      "correct, but for reasons other than the ones Text 1 gives.",
      "incorrect, because responses to food do not in fact vary.",
      "correct, and best supported by microbiome data.",
      "impossible to evaluate without a larger sample.",
    ],
    ans: "A",
    exp: "Text 2 confirms wide individual variation, which supports personalisation, but attributes almost all of it to behaviour rather than to bacteria, undercutting Text 1's stated reason. Choice B contradicts the trial, which found responses varied widely.",
  },
  {
    d: "craft_structure",
    s: "text_structure_purpose",
    diff: "hard",
    type: "mc",
    passage:
      "Museum labels usually give an object's date, material, and place of origin. For looted objects, that format performs a quiet trick: 'Benin, 16th century, brass' locates the work in space and time while leaving out the only date most visitors would find startling, which is the year it arrived in the case.",
    prompt: "What is the main purpose of the text?",
    choices: [
      "To recommend that museums display more brass objects",
      "To show how a standard labelling convention conceals an object's recent history",
      "To question whether the object was made in the sixteenth century",
      "To describe how visitors typically move through museum galleries",
    ],
    ans: "B",
    exp: "The text sets out the usual label format and then identifies the fact that format omits — the date of acquisition. Choice C misreads the example, which uses the sixteenth-century date as accurate but incomplete.",
  },
];

const rwInfo = [
  {
    d: "information_ideas",
    s: "central_ideas_details",
    diff: "easy",
    type: "mc",
    passage:
      "Emperor penguins huddle in colonies of thousands during the Antarctic winter. Birds on the windward edge lose heat fastest, so the huddle continually rotates, moving outer birds inward in slow waves. No individual leads the movement; it emerges from each bird taking small steps toward warmth.",
    prompt: "Which choice best states the main idea of the text?",
    choices: [
      "Emperor penguins choose leaders to organise their huddles.",
      "Huddle rotation is an unplanned result of individual birds seeking warmth.",
      "Penguins on the outside of a huddle rarely survive the winter.",
      "Antarctic winters are colder than the penguins can tolerate.",
    ],
    ans: "B",
    exp: "The final sentence explicitly denies leadership and attributes the wave to individual steps toward warmth. Choice C invents a mortality claim the text never makes.",
  },
  {
    d: "information_ideas",
    s: "evidence_textual",
    diff: "easy",
    type: "mc",
    passage:
      "A student claims that the invention of cheap window glass changed domestic architecture more than any decorative fashion of the period did.",
    prompt: "Which finding, if true, would most directly support the claim?",
    choices: [
      "Glassmakers' guilds grew rapidly during the period.",
      "Room layouts across many house types shifted toward the exterior walls once glass prices fell.",
      "Decorative plasterwork remained popular throughout the period.",
      "Window taxes were introduced in several countries.",
    ],
    ans: "B",
    exp: "A change in how rooms are arranged, occurring across house types and tied to the price drop, is direct architectural consequence. Choice A shows the industry grew but says nothing about how buildings were designed.",
  },
  {
    d: "information_ideas",
    s: "inferences",
    diff: "medium",
    type: "mc",
    passage:
      "Certain desert plants open their stomata only at night, taking in carbon dioxide and storing it as an acid until daylight. Photosynthesis then proceeds behind closed pores. Because water loss through stomata rises steeply with temperature, this timing suggests that for these plants _______",
    prompt: "Which choice most logically completes the text?",
    choices: [
      "conserving water outweighs the cost of a more complex chemical pathway.",
      "carbon dioxide is more abundant at night than during the day.",
      "photosynthesis cannot occur while stomata are closed.",
      "growth rates exceed those of plants in wetter habitats.",
    ],
    ans: "A",
    exp: "The plants accept an extra storage step in order to open their pores only when evaporation is lowest, which is a trade of complexity for water. Choice C contradicts the passage, which states photosynthesis proceeds with the pores shut.",
  },
  {
    d: "information_ideas",
    s: "evidence_quantitative",
    diff: "medium",
    type: "mc",
    passage:
      "A library recorded loans of physical books before and after adding a self-service kiosk. Loans at the staffed desk fell from 4,200 to 2,600 per month, while kiosk loans reached 2,900. Total monthly loans went from 4,200 to 5,500.",
    prompt:
      "Which choice best uses the data to evaluate the claim that the kiosk merely shifted existing loans rather than adding new ones?",
    choices: [
      "Desk loans fell by 1,600, showing that borrowers moved to the kiosk.",
      "Total loans rose by 1,300, more than can be explained by shifting alone.",
      "Kiosk loans (2,900) exceeded remaining desk loans (2,600).",
      "Desk loans remained above 2,000 per month.",
    ],
    ans: "B",
    exp: "Pure substitution would leave the total unchanged, so the 1,300 increase in total loans is the figure that tests the claim. Choice A is consistent with both explanations and therefore cannot distinguish between them.",
  },
  {
    d: "information_ideas",
    s: "central_ideas_details",
    diff: "medium",
    type: "mc",
    passage:
      "Scholars once assumed the great earthworks of the Amazon were built after European contact, since early accounts described sparse populations. Radiocarbon dates now place many of them between 500 and 1200 CE, and the sparse populations of the accounts are increasingly read as the aftermath of introduced epidemics.",
    prompt: "According to the text, why has the earlier assumption been revised?",
    choices: [
      "New dating places the earthworks centuries before contact, and the sparse populations are reinterpreted.",
      "The early accounts have been shown to be forgeries.",
      "Archaeologists have found no earthworks older than 1200 CE.",
      "Epidemics are now thought to have had little demographic effect.",
    ],
    ans: "A",
    exp: "Two things changed: the radiocarbon dates and the reading of the population reports as post-epidemic. Choice D reverses the passage, which relies on epidemics having had a large effect.",
  },
  {
    d: "information_ideas",
    s: "evidence_quantitative",
    diff: "hard",
    type: "mc",
    passage:
      "In a study of 1,200 patients, a screening test identified 95 percent of those who had the condition. However, only 8 percent of people who tested positive actually had it, because the condition occurs in fewer than 1 in 500 people.",
    prompt: "Which statement about the test is best supported by the text?",
    choices: [
      "The test is inaccurate at detecting the condition when it is present.",
      "A positive result is weak evidence of the condition because the condition is rare.",
      "The test should be abandoned because 92 percent of its results are wrong.",
      "Increasing the number of patients tested would improve the positive predictive value.",
    ],
    ans: "B",
    exp: "The test detects 95 percent of true cases, so its sensitivity is high; the low 8 percent figure follows from the small base rate producing many false positives. Choice C misstates the data, since the 92 percent applies only to positive results, not to all results.",
  },
  {
    d: "information_ideas",
    s: "inferences",
    diff: "hard",
    type: "mc",
    passage:
      "Two neighbouring valleys share a climate and a soil type, but only one has terraced fields dating to the fifteenth century. Both have the same crop remains in the archaeological record, and both show the same population estimates for that century. The valley without terraces, however, has a gentler slope throughout. This suggests the terraces _______",
    prompt: "Which choice most logically completes the text?",
    choices: [
      "were a response to steep terrain rather than to crop choice or population size.",
      "supported crops that could not be grown on flat ground.",
      "indicate a larger population than the estimates suggest.",
      "were built long after the fifteenth century.",
    ],
    ans: "A",
    exp: "Climate, soil, crops and population are held constant across the two valleys, leaving slope as the only difference that can explain the terraces. Choice B is ruled out by the identical crop remains at both sites.",
  },
  {
    d: "information_ideas",
    s: "evidence_textual",
    diff: "hard",
    type: "mc",
    passage:
      "A researcher hypothesises that the poet composed the sequence for oral performance rather than for print.",
    prompt:
      "Which finding, if true, would most directly support the hypothesis?",
    choices: [
      "The poems were first printed in an expensive folio edition.",
      "The poems use a repeating refrain and stress patterns that reset after every eight lines, features that aid memorisation.",
      "The poet's letters mention meeting with a printer.",
      "The poems are shorter on average than the poet's earlier work.",
    ],
    ans: "B",
    exp: "Mnemonic structure — refrains and regular resetting stress patterns — is evidence of design for voice and memory. Choice A points toward print production, and choice D is neutral because length alone implies nothing about medium.",
  },
];

const rwConventions = [
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "easy",
    type: "mc",
    passage:
      "The bridge was closed for repairs in June _______ it reopened to traffic in October.",
    prompt:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [", and", ", ", " and,", "and, "],
    ans: "A",
    exp: "Two independent clauses joined by 'and' take a comma before the conjunction. Choice B leaves a comma splice, and choices C and D place the comma after the conjunction, where it does not belong.",
  },
  {
    d: "standard_conventions",
    s: "form_structure_sense",
    diff: "easy",
    type: "mc",
    passage:
      "The collection of letters, photographs, and railway tickets _______ kept in a single cardboard box for forty years.",
    prompt:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["were", "was", "have", "are"],
    ans: "B",
    exp: "The subject is the singular 'collection'; the plural nouns sit inside a prepositional phrase and do not control the verb. Choice A is the trap created by the three plural nouns immediately before the blank.",
  },
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "easy",
    type: "mc",
    passage:
      "Because the ferry runs only twice a day _______ visitors usually stay overnight.",
    prompt:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [", ", "; ", ": ", " "],
    ans: "A",
    exp: "A dependent clause beginning with 'Because' is separated from the main clause by a comma. A semicolon or colon would require an independent clause before it, which the 'Because' clause is not.",
  },
  {
    d: "standard_conventions",
    s: "form_structure_sense",
    diff: "medium",
    type: "mc",
    passage:
      "The novel's narrator describes the harbour as it looked before the war, when fishing boats _______ the entire quay.",
    prompt:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["fill", "filled", "will fill", "have filled"],
    ans: "B",
    exp: "The clause describes a past state before the war, so the simple past 'filled' matches the time frame set by 'as it looked before'. Choice D's present perfect would connect the action to the present, which contradicts the past setting.",
  },
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "medium",
    type: "mc",
    passage:
      "The geologist identified the rock immediately _______ basalt, formed from lava that cooled at the surface.",
    prompt:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [": ", "; ", " and ", ", and "],
    ans: "A",
    exp: "A colon after a complete clause introduces the identification that follows. A semicolon would need a full independent clause after it, and 'basalt, formed from lava...' is a noun phrase.",
  },
  {
    d: "standard_conventions",
    s: "form_structure_sense",
    diff: "medium",
    type: "mc",
    passage: "Walking home along the canal, _______",
    prompt:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      "the herons were visible on the far bank.",
      "there were herons on the far bank.",
      "Rania counted six herons on the far bank.",
      "six herons had gathered on the far bank.",
    ],
    ans: "C",
    exp: "The opening participial phrase must describe the person doing the walking, so the main clause has to start with a person — Rania. The other options attach the walking to herons or to nothing, leaving a dangling modifier.",
  },
  {
    d: "standard_conventions",
    s: "boundaries",
    diff: "hard",
    type: "mc",
    passage:
      "The archive contains three unpublished scores _______ a string quartet from 1931, a set of piano preludes, and an unfinished opera.",
    prompt:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [", ", ": ", "; ", ", and "],
    ans: "B",
    exp: "A complete clause precedes a list naming its items, and a colon is the mark for that. A comma would be too weak to introduce a full list, and a semicolon signals a second independent clause that never arrives.",
  },
  {
    d: "standard_conventions",
    s: "form_structure_sense",
    diff: "hard",
    type: "mc",
    passage:
      "The training programme improved reaction time, reduced error rates, and _______",
    prompt:
      "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      "confidence among trainees was increased.",
      "increased confidence among trainees.",
      "there was an increase in trainee confidence.",
      "trainees became more confident as a result.",
    ],
    ans: "B",
    exp: "The first two items are past-tense verbs with objects, so the third must match: 'increased confidence'. The other options switch to full clauses and break the parallel series.",
  },
];

const rwExpression = [
  {
    d: "expression_ideas",
    s: "transitions",
    diff: "easy",
    type: "mc",
    passage:
      "Bamboo can grow nearly a metre in a single day. _______ it is increasingly used as a construction material where fast-growing timber is scarce.",
    prompt: "Which choice completes the text with the most logical transition?",
    choices: ["However,", "For this reason,", "In contrast,", "Admittedly,"],
    ans: "B",
    exp: "The second sentence states a consequence of the growth rate described in the first, so a causal transition is needed. 'However' would falsely mark the sentences as opposed.",
  },
  {
    d: "expression_ideas",
    s: "transitions",
    diff: "easy",
    type: "mc",
    passage:
      "The 1970 expedition returned with hundreds of soil samples. _______ almost none were catalogued, and most were discarded within a decade.",
    prompt: "Which choice completes the text with the most logical transition?",
    choices: ["Accordingly,", "Yet", "Likewise,", "In summary,"],
    ans: "B",
    exp: "Collecting hundreds of samples and then discarding them is a contrast, which 'Yet' marks. 'Accordingly' would present the loss as the natural result of collecting, which makes no sense.",
  },
  {
    d: "expression_ideas",
    s: "rhetorical_synthesis",
    diff: "medium",
    type: "mc",
    passage:
      "While researching, a student took these notes:\n• Kente cloth is woven in narrow strips on a horizontal loom.\n• Strips are cut and sewn edge to edge to make a full cloth.\n• Patterns carry names and meanings.\n• The technique allows a large cloth to be made on a small loom.\n\nThe student wants to explain the practical advantage of the strip-weaving method.",
    prompt:
      "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      "Kente patterns carry names and meanings recognised by weavers and wearers.",
      "Because kente is woven in narrow strips that are later sewn together, a large cloth can be produced on a small loom.",
      "Kente cloth is woven on a horizontal loom in narrow strips.",
      "Kente strips are cut and sewn edge to edge.",
      ],
    ans: "B",
    exp: "The question asks for the practical advantage, so the answer must connect the strip method to the outcome it makes possible. Choices C and D describe the method without naming any benefit.",
  },
  {
    d: "expression_ideas",
    s: "transitions",
    diff: "medium",
    type: "mc",
    passage:
      "Lead pipes were installed in millions of homes because lead is soft and easy to bend. _______ that same softness means the metal dissolves readily into water that sits in the pipe.",
    prompt: "Which choice completes the text with the most logical transition?",
    choices: ["Unfortunately,", "Therefore,", "For example,", "Similarly,"],
    ans: "A",
    exp: "The property that made lead attractive is now presented as a hazard, so a contrastive-evaluative transition fits. 'Therefore' would suggest the dissolving is a benefit following from ease of installation.",
  },
  {
    d: "expression_ideas",
    s: "rhetorical_synthesis",
    diff: "medium",
    type: "mc",
    passage:
      "While researching, a student took these notes:\n• The Aral Sea was the fourth largest lake in the world in 1960.\n• Rivers feeding it were diverted for cotton irrigation.\n• By 2010 it had lost about 90 percent of its volume.\n• A dam completed in 2005 has partly restored the northern portion.\n\nThe student wants to emphasise the scale of the loss.",
    prompt:
      "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      "Once the world's fourth largest lake, the Aral Sea had lost roughly 90 percent of its volume by 2010.",
      "A dam completed in 2005 has partly restored the northern Aral Sea.",
      "Rivers feeding the Aral Sea were diverted to irrigate cotton.",
      "The Aral Sea has changed considerably since 1960.",
    ],
    ans: "A",
    exp: "Scale needs both the former standing and the measured proportion lost, which only choice A supplies. Choice D gestures at change without any figure to convey magnitude.",
  },
  {
    d: "expression_ideas",
    s: "transitions",
    diff: "hard",
    type: "mc",
    passage:
      "Most accounts credit the 1928 discovery of penicillin with the arrival of antibiotics. The mould's effect had, however, been noticed and published by other researchers decades earlier. _______ what distinguished 1928 was not the observation but the decade of work that turned it into a usable drug.",
    prompt: "Which choice completes the text with the most logical transition?",
    choices: ["Consequently,", "In short,", "By contrast,", "Instead,"],
    ans: "B",
    exp: "The final sentence condenses the preceding correction into a summary judgement, which is what 'In short' signals. 'Consequently' would claim the summary is caused by the earlier publications rather than drawn from them.",
  },
  {
    d: "expression_ideas",
    s: "rhetorical_synthesis",
    diff: "hard",
    type: "mc",
    passage:
      "While researching, a student took these notes:\n• Coral reefs cover less than 0.1 percent of the ocean floor.\n• About 25 percent of marine species depend on them at some stage of life.\n• Reef fish supply protein to hundreds of millions of coastal people.\n• Bleaching events have become five times more frequent since 1980.\n\nThe student wants to argue that reef loss is a problem out of proportion to the area involved.",
    prompt:
      "Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      "Bleaching events have become five times more frequent since 1980.",
      "Coral reefs cover less than 0.1 percent of the ocean floor yet about a quarter of marine species depend on them.",
      "Reef fish supply protein to hundreds of millions of coastal people.",
      "Coral reefs are found in shallow tropical waters around the world.",
    ],
    ans: "B",
    exp: "The argument turns on a mismatch between tiny area and large dependence, and only choice B places both figures side by side. Choice C shows importance but gives no measure of area to contrast it with.",
  },
  {
    d: "expression_ideas",
    s: "transitions",
    diff: "hard",
    type: "mc",
    passage:
      "Adding a lane to a congested motorway usually reduces travel time at first. Within a few years, however, traffic volumes rise until delays return to roughly their previous level. _______ the capacity was not absorbed by existing drivers but by trips that were not previously made.",
    prompt: "Which choice completes the text with the most logical transition?",
    choices: ["Even so,", "That is,", "Nevertheless,", "Otherwise,"],
    ans: "B",
    exp: "The final sentence explains the mechanism behind the rebound just described, so a clarifying restatement connector is required. 'Even so' and 'Nevertheless' would wrongly frame the explanation as an objection to the data it explains.",
  },
];

const mathAlgebra = [
  {
    d: "algebra",
    s: "linear_eq_one_var",
    diff: "easy",
    type: "mc",
    prompt: "If 4x − 9 = 15, what is the value of x?",
    choices: ["1.5", "6", "24", "3"],
    ans: "B",
    exp: "Adding 9 gives 4x = 24, so x = 6. Choice C stops after adding 9 and forgets to divide by the coefficient.",
  },
  {
    d: "algebra",
    s: "linear_functions",
    diff: "easy",
    type: "spr",
    prompt: "The function f is defined by f(x) = 5x − 3. What is the value of f(4)?",
    ans: "17",
    alt: ["17.0"],
    exp: "Substituting 4 gives 5(4) − 3 = 20 − 3 = 17. Answering 23 adds 3 rather than subtracting it.",
  },
  {
    d: "algebra",
    s: "linear_eq_two_var",
    diff: "medium",
    type: "mc",
    prompt: "What is the x-intercept of the line 4x − 5y = 20?",
    choices: ["(0, −4)", "(5, 0)", "(4, 0)", "(0, 5)"],
    ans: "B",
    exp: "The x-intercept has y = 0, so 4x = 20 and x = 5, giving (5, 0). Choice A is the y-intercept, found by setting x = 0 instead.",
  },
  {
    d: "algebra",
    s: "linear_inequalities",
    diff: "medium",
    type: "mc",
    prompt:
      "A delivery van weighs 1,800 kg empty and each crate weighs 45 kg. The loaded van must not exceed 3,000 kg. What is the greatest number of crates it can carry?",
    choices: ["25", "26", "27", "66"],
    ans: "B",
    exp: "The available load is 3,000 − 1,800 = 1,200 kg, and 1,200 ÷ 45 = 26.67, so 26 whole crates fit. Choice C rounds up and would exceed the limit by 15 kg.",
  },
  {
    d: "algebra",
    s: "systems_two_linear",
    diff: "medium",
    type: "spr",
    prompt:
      "If 3x + 2y = 19 and x = y + 2, what is the value of y?",
    ans: "2.6",
    alt: ["13/5", "2.60"],
    exp: "Substituting gives 3(y + 2) + 2y = 19, so 5y + 6 = 19 and y = 13/5 = 2.6. Checking, x = 4.6 and 3(4.6) + 2(2.6) = 13.8 + 5.2 = 19.",
  },
  {
    d: "algebra",
    s: "linear_functions",
    diff: "hard",
    type: "mc",
    prompt:
      "A tank is drained at a constant rate. After 3 minutes it holds 84 litres, and after 8 minutes it holds 54 litres. How many litres did it hold at the start?",
    choices: ["96", "100", "102", "108"],
    ans: "C",
    exp: "The rate is (54 − 84)/(8 − 3) = −6 litres per minute, so at t = 0 the volume was 84 + 3(6) = 102 litres. Choice A applies the drop for only two minutes instead of three.",
  },
  {
    d: "algebra",
    s: "linear_eq_one_var",
    diff: "hard",
    type: "mc",
    prompt:
      "For what value of a does the equation 2(3x − a) = 6x + 8 have infinitely many solutions?",
    choices: ["a = −4", "a = 4", "a = 8", "a = −8"],
    ans: "A",
    exp: "Expanding the left side gives 6x − 2a, and since the 6x terms match, the equation holds for every x only when the constants match: −2a = 8, so a = −4. Choice B is the sign error made by solving 2a = 8 and forgetting the minus sign, and any other value of a makes the equation false for every x.",
  },
  {
    d: "algebra",
    s: "linear_inequalities",
    diff: "hard",
    type: "spr",
    prompt:
      "What is the least integer value of n that satisfies 7 − 2n < n − 8?",
    ans: "6",
    alt: ["6.0"],
    exp: "Adding 2n and 8 to both sides gives 15 < 3n, so n > 5 and the least integer is 6. Answering 5 ignores that the inequality is strict, and n = 5 gives −3 < −3, which is false.",
  },
];

const mathAdvanced = [
  {
    d: "advanced_math",
    s: "equivalent_expressions",
    diff: "easy",
    type: "mc",
    prompt: "Which expression is equivalent to (2x + 5)(x − 1)?",
    choices: ["2x² + 3x − 5", "2x² + 5x − 5", "2x² − 3x − 5", "2x² + 3x + 5"],
    ans: "A",
    exp: "Expanding gives 2x² − 2x + 5x − 5 = 2x² + 3x − 5. Choice B forgets the −2x term produced by multiplying 2x by −1.",
  },
  {
    d: "advanced_math",
    s: "nonlinear_functions",
    diff: "easy",
    type: "spr",
    prompt: "If g(x) = x² + 2x, what is the value of g(5)?",
    ans: "35",
    alt: ["35.0"],
    exp: "Substituting gives 25 + 10 = 35. Answering 49 treats the expression as (x + 2)² by adding before squaring.",
  },
  {
    d: "advanced_math",
    s: "nonlinear_eq_systems",
    diff: "medium",
    type: "mc",
    prompt: "What is the sum of the solutions to x² − 5x − 14 = 0?",
    choices: ["−5", "2", "5", "14"],
    ans: "C",
    exp: "The expression factors as (x − 7)(x + 2), giving roots 7 and −2 whose sum is 5, which also matches the rule that the sum of roots equals −b/a. Choice A takes b directly without changing its sign.",
  },
  {
    d: "advanced_math",
    s: "nonlinear_functions",
    diff: "medium",
    type: "mc",
    prompt:
      "The parabola y = −(x + 2)² + 9 has its vertex at which point?",
    choices: ["(2, 9)", "(−2, 9)", "(−2, −9)", "(9, −2)"],
    ans: "B",
    exp: "In vertex form y = a(x − h)² + k the vertex is (h, k), and x + 2 means h = −2, so the vertex is (−2, 9). Choice A drops the sign flip that the plus inside the bracket requires.",
  },
  {
    d: "advanced_math",
    s: "equivalent_expressions",
    diff: "medium",
    type: "spr",
    prompt: "If 3^(2x) = 81, what is the value of x?",
    ans: "2",
    alt: ["2.0"],
    exp: "Since 81 = 3⁴, the exponents match: 2x = 4, so x = 2. Answering 4 solves for the exponent rather than for x.",
  },
  {
    d: "advanced_math",
    s: "nonlinear_functions",
    diff: "hard",
    type: "mc",
    prompt:
      "A quantity decays so that it halves every 4 years. If it starts at 240 units, what is the amount after 12 years?",
    choices: ["15", "30", "60", "80"],
    ans: "B",
    exp: "Twelve years is three halvings, so the amount is 240 ÷ 2³ = 30. Choice C stops after two halvings, treating 12 years as 8.",
  },
  {
    d: "advanced_math",
    s: "nonlinear_eq_systems",
    diff: "hard",
    type: "mc",
    prompt:
      "For what value of c does x² + 6x + c = 0 have exactly one real solution?",
    choices: ["3", "6", "9", "36"],
    ans: "C",
    exp: "One real solution requires the discriminant 36 − 4c to be zero, so c = 9 and the equation becomes (x + 3)². Choice A halves the 6 without squaring it.",
  },
  {
    d: "advanced_math",
    s: "equivalent_expressions",
    diff: "hard",
    type: "mc",
    prompt: "Which expression is equivalent to (x⁵y²)³ / (x²y)²?",
    choices: ["x¹¹y⁴", "x¹³y⁴", "x¹¹y⁵", "x⁷y⁴"],
    ans: "A",
    exp: "The numerator becomes x¹⁵y⁶ and the denominator x⁴y², so subtracting exponents gives x¹¹y⁴. Choice B subtracts only 2 from the x exponent, forgetting that the denominator is also squared.",
  },
];

const mathPsda = [
  {
    d: "psda",
    s: "percentages",
    diff: "easy",
    type: "mc",
    prompt: "What is 35 percent of 240?",
    choices: ["70", "84", "96", "104"],
    ans: "B",
    exp: "Multiplying gives 0.35 × 240 = 84. Choice A is 35 percent of 200, which comes from rounding the base rather than computing it exactly.",
  },
  {
    d: "psda",
    s: "ratios_rates_proportions",
    diff: "easy",
    type: "spr",
    prompt:
      "A printer produces 18 pages per minute. How many minutes does it take to print 486 pages?",
    ans: "27",
    alt: ["27.0"],
    exp: "Dividing gives 486 ÷ 18 = 27 minutes. Multiplying instead of dividing would give an implausible 8,748, a useful check that the operation was chosen correctly.",
  },
  {
    d: "psda",
    s: "one_var_data",
    diff: "medium",
    type: "mc",
    prompt:
      "The mean of five test scores is 82. Four of the scores are 78, 85, 90, and 76. What is the fifth score?",
    choices: ["79", "81", "82", "84"],
    ans: "B",
    exp: "The total must be 5 × 82 = 410, and the four known scores sum to 329, so the fifth is 81. Choice C assumes the missing value equals the mean, which is only true when the other scores balance exactly.",
  },
  {
    d: "psda",
    s: "two_var_data",
    diff: "medium",
    type: "mc",
    prompt:
      "A scatterplot of study hours and exam scores for 40 students shows a line of best fit with slope 4.2 and intercept 51. What does the slope indicate?",
    choices: [
      "A student who does not study is predicted to score 4.2.",
      "Each additional hour of study is associated with a predicted increase of about 4.2 points.",
      "The average exam score is 4.2 points.",
      "Studying causes scores to rise by exactly 4.2 points.",
    ],
    ans: "B",
    exp: "The slope of a line of best fit gives the predicted change in the response for a one-unit change in the predictor. Choice D overreaches by claiming causation from an observational scatterplot, and choice A describes the intercept.",
  },
  {
    d: "psda",
    s: "probability",
    diff: "medium",
    type: "spr",
    prompt:
      "A survey of 200 commuters found that 130 take the bus and 45 of those bus riders also cycle. If one bus rider is chosen at random, what is the probability that the person also cycles? Give your answer as a decimal rounded to the nearest hundredth.",
    ans: "0.35",
    alt: [".35", "9/26", "0.346"],
    exp: "The relevant denominator is the 130 bus riders, not all 200 commuters, so the probability is 45/130 ≈ 0.35. Using 200 as the denominator gives 0.225, which answers a different question.",
  },
  {
    d: "psda",
    s: "percentages",
    diff: "hard",
    type: "mc",
    prompt:
      "A population grows by 10 percent one year and then falls by 10 percent the next. Compared with the start, the population after two years is",
    choices: ["unchanged.", "1 percent lower.", "1 percent higher.", "10 percent lower."],
    ans: "B",
    exp: "Multiplying by 1.1 and then 0.9 gives 0.99, so the population is 1 percent below its starting value. Choice A assumes the percentages cancel, but the second one is taken from a larger base.",
  },
  {
    d: "psda",
    s: "evaluating_claims",
    diff: "hard",
    type: "mc",
    prompt:
      "A company emails a satisfaction survey to all customers and reports that 88 percent of respondents are satisfied. Which is the strongest objection to generalising this figure to all customers?",
    choices: [
      "The sample is too small to be meaningful.",
      "Customers who respond voluntarily may differ systematically from those who do not.",
      "Satisfaction cannot be measured numerically.",
      "The survey should have been conducted by telephone.",
    ],
    ans: "B",
    exp: "Voluntary response produces self-selection bias, which is a problem of who answers rather than of how many. Choice A misses the point because even a very large voluntary sample stays biased.",
  },
  {
    d: "psda",
    s: "sample_stats_moe",
    diff: "hard",
    type: "mc",
    prompt:
      "Two polls estimate the same quantity. Poll A surveys 400 people and Poll B surveys 1,600, both by simple random sampling. Compared with Poll A, Poll B's margin of error is approximately",
    choices: ["four times as large.", "twice as large.", "half as large.", "one quarter as large."],
    ans: "C",
    exp: "Margin of error scales with 1/√n, so quadrupling the sample size halves it. Choice D assumes a direct inverse relationship with n rather than with its square root.",
  },
];

const mathGeometry = [
  {
    d: "geometry_trig",
    s: "lines_angles_triangles",
    diff: "easy",
    type: "mc",
    prompt:
      "Two angles are supplementary. If one measures 118°, what is the measure of the other?",
    choices: ["28°", "62°", "72°", "242°"],
    ans: "B",
    exp: "Supplementary angles sum to 180°, so the other is 180 − 118 = 62°. Choice A uses 90° and answers the complementary question instead.",
  },
  {
    d: "geometry_trig",
    s: "area_volume",
    diff: "easy",
    type: "spr",
    prompt:
      "A triangle has a base of 14 cm and a height of 9 cm. What is its area, in square centimetres?",
    ans: "63",
    alt: ["63.0"],
    exp: "Area is ½ × base × height = ½ × 14 × 9 = 63. Answering 126 omits the factor of one half and gives the area of the enclosing rectangle.",
  },
  {
    d: "geometry_trig",
    s: "circles",
    diff: "medium",
    type: "mc",
    prompt:
      "A circle in the xy-plane has equation (x − 3)² + (y + 1)² = 25. What are its centre and radius?",
    choices: [
      "Centre (3, −1), radius 5",
      "Centre (−3, 1), radius 5",
      "Centre (3, −1), radius 25",
      "Centre (−3, 1), radius 25",
    ],
    ans: "A",
    exp: "In standard form (x − h)² + (y − k)² = r², the centre is (h, k) and the radius is √25 = 5, so the centre is (3, −1). Choice C reports r² instead of taking its square root.",
  },
  {
    d: "geometry_trig",
    s: "right_triangles_trig",
    diff: "medium",
    type: "mc",
    prompt:
      "In a right triangle, one leg measures 5 and the hypotenuse measures 13. What is the length of the other leg?",
    choices: ["8", "12", "14", "18"],
    ans: "B",
    exp: "By the Pythagorean theorem, the missing leg is √(169 − 25) = √144 = 12. Choice A subtracts the side lengths directly instead of their squares.",
  },
  {
    d: "geometry_trig",
    s: "lines_angles_triangles",
    diff: "medium",
    type: "spr",
    prompt:
      "Triangle ABC is similar to triangle DEF. AB = 6, BC = 9, and DE = 10. What is the length of EF?",
    ans: "15",
    alt: ["15.0"],
    exp: "The scale factor is 10/6 = 5/3, so EF = 9 × 5/3 = 15. Answering 13 adds the difference of 4 rather than applying the ratio, which similar figures require.",
  },
  {
    d: "geometry_trig",
    s: "area_volume",
    diff: "hard",
    type: "mc",
    prompt:
      "A cylinder has radius 4 cm and height 10 cm. If the radius is doubled and the height is unchanged, the volume is multiplied by",
    choices: ["2", "4", "8", "10"],
    ans: "B",
    exp: "Volume is πr²h, and squaring a doubled radius multiplies the volume by 2² = 4. Choice A applies the doubling directly, ignoring that the radius is squared in the formula.",
  },
  {
    d: "geometry_trig",
    s: "right_triangles_trig",
    diff: "hard",
    type: "mc",
    prompt:
      "In right triangle PQR, angle R = 90° and tan P = 3/4. What is the value of sin P?",
    choices: ["3/5", "4/5", "3/4", "5/3"],
    ans: "A",
    exp: "A tangent of 3/4 gives legs of 3 and 4 and a hypotenuse of 5, so sin P = opposite/hypotenuse = 3/5. Choice B is cos P, using the adjacent leg instead.",
  },
  {
    d: "geometry_trig",
    s: "circles",
    diff: "hard",
    type: "spr",
    prompt:
      "A sector of a circle of radius 6 has an area of 12π. What is the measure of its central angle, in degrees?",
    ans: "120",
    alt: ["120.0"],
    exp: "The full circle has area 36π, so the sector is 12π/36π = 1/3 of it, and one third of 360° is 120°. Answering 60 comes from comparing the sector to a semicircle rather than to the whole circle.",
  },
];

export const DRILLS = [
  {
    file: "20_drill_rw_craft_structure",
    slug: "drill-rw-craft-structure",
    title: "Reading: Craft and Structure",
    subtitle: "Words in context, purpose, cross-text connections",
    section: "rw",
    focus: "craft_structure",
    description:
      "A short, mixed-difficulty set focused on vocabulary in context, the purpose of a text or a part of it, and comparisons between paired texts.",
    sort: 10,
    questions: rwCraft,
  },
  {
    file: "21_drill_rw_information_ideas",
    slug: "drill-rw-information-ideas",
    title: "Reading: Information and Ideas",
    subtitle: "Central ideas, evidence, inferences",
    section: "rw",
    focus: "information_ideas",
    description:
      "Practice finding main ideas, choosing the evidence that actually supports a claim, reading data, and completing inferences.",
    sort: 11,
    questions: rwInfo,
  },
  {
    file: "22_drill_rw_conventions",
    slug: "drill-rw-conventions",
    title: "Grammar: Standard English Conventions",
    subtitle: "Boundaries, agreement, modifiers, parallelism",
    section: "rw",
    focus: "standard_conventions",
    description:
      "Sentence boundaries and punctuation, subject-verb agreement, verb tense, dangling modifiers and parallel structure.",
    sort: 12,
    questions: rwConventions,
  },
  {
    file: "23_drill_rw_expression",
    slug: "drill-rw-expression",
    title: "Writing: Expression of Ideas",
    subtitle: "Transitions and rhetorical synthesis",
    section: "rw",
    focus: "expression_ideas",
    description:
      "Choosing logical transitions and selecting the notes that best accomplish a stated rhetorical goal.",
    sort: 13,
    questions: rwExpression,
  },
  {
    file: "30_drill_math_algebra",
    slug: "drill-math-algebra",
    title: "Math: Algebra",
    subtitle: "Linear equations, functions, systems, inequalities",
    section: "math",
    focus: "algebra",
    description:
      "Linear equations in one and two variables, linear functions, systems and inequalities, including word problems.",
    sort: 20,
    questions: mathAlgebra,
  },
  {
    file: "31_drill_math_advanced",
    slug: "drill-math-advanced",
    title: "Math: Advanced Math",
    subtitle: "Equivalent expressions, quadratics, exponentials",
    section: "math",
    focus: "advanced_math",
    description:
      "Factoring and simplifying, quadratic and radical equations, exponent rules and exponential models.",
    sort: 21,
    questions: mathAdvanced,
  },
  {
    file: "32_drill_math_psda",
    slug: "drill-math-psda",
    title: "Math: Problem-Solving and Data",
    subtitle: "Ratios, percentages, statistics, probability",
    section: "math",
    focus: "psda",
    description:
      "Rates and proportions, percentage change, one- and two-variable data, probability, sampling and statistical claims.",
    sort: 22,
    questions: mathPsda,
  },
  {
    file: "33_drill_math_geometry_trig",
    slug: "drill-math-geometry-trig",
    title: "Math: Geometry and Trigonometry",
    subtitle: "Angles, area and volume, right triangles, circles",
    section: "math",
    focus: "geometry_trig",
    description:
      "Angle relationships, similar triangles, area and volume, right-triangle trigonometry and circle equations and sectors.",
    sort: 23,
    questions: mathGeometry,
  },
];
