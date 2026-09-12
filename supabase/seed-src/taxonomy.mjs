// Official SAT (digital) taxonomy: domains, weightings and skills.
export const DOMAINS = [
  { id: "craft_structure", section: "rw", name: "Craft and Structure", weight: 28, order: 1 },
  { id: "information_ideas", section: "rw", name: "Information and Ideas", weight: 26, order: 2 },
  {
    id: "standard_conventions",
    section: "rw",
    name: "Standard English Conventions",
    weight: 26,
    order: 3,
  },
  { id: "expression_ideas", section: "rw", name: "Expression of Ideas", weight: 20, order: 4 },
  { id: "algebra", section: "math", name: "Algebra", weight: 35, order: 5 },
  { id: "advanced_math", section: "math", name: "Advanced Math", weight: 35, order: 6 },
  { id: "psda", section: "math", name: "Problem-Solving and Data Analysis", weight: 15, order: 7 },
  { id: "geometry_trig", section: "math", name: "Geometry and Trigonometry", weight: 15, order: 8 },
];

export const SKILLS = [
  ["words_in_context", "craft_structure", "Words in Context"],
  ["text_structure_purpose", "craft_structure", "Text Structure and Purpose"],
  ["cross_text_connections", "craft_structure", "Cross-Text Connections"],
  ["central_ideas_details", "information_ideas", "Central Ideas and Details"],
  ["evidence_textual", "information_ideas", "Command of Evidence (Textual)"],
  ["evidence_quantitative", "information_ideas", "Command of Evidence (Quantitative)"],
  ["inferences", "information_ideas", "Inferences"],
  ["boundaries", "standard_conventions", "Boundaries"],
  ["form_structure_sense", "standard_conventions", "Form, Structure, and Sense"],
  ["rhetorical_synthesis", "expression_ideas", "Rhetorical Synthesis"],
  ["transitions", "expression_ideas", "Transitions"],
  ["linear_eq_one_var", "algebra", "Linear equations in one variable"],
  ["linear_eq_two_var", "algebra", "Linear equations in two variables"],
  ["linear_functions", "algebra", "Linear functions"],
  ["systems_two_linear", "algebra", "Systems of two linear equations"],
  ["linear_inequalities", "algebra", "Linear inequalities"],
  ["equivalent_expressions", "advanced_math", "Equivalent expressions"],
  ["nonlinear_eq_systems", "advanced_math", "Nonlinear equations and systems"],
  ["nonlinear_functions", "advanced_math", "Nonlinear functions"],
  ["ratios_rates_proportions", "psda", "Ratios, rates and proportions"],
  ["percentages", "psda", "Percentages"],
  ["one_var_data", "psda", "One-variable data"],
  ["two_var_data", "psda", "Two-variable data"],
  ["probability", "psda", "Probability"],
  ["sample_stats_moe", "psda", "Sample statistics and margin of error"],
  ["evaluating_claims", "psda", "Evaluating statistical claims"],
  ["area_volume", "geometry_trig", "Area and volume"],
  ["lines_angles_triangles", "geometry_trig", "Lines, angles and triangles"],
  ["right_triangles_trig", "geometry_trig", "Right triangles and trigonometry"],
  ["circles", "geometry_trig", "Circles"],
];

// Approximate raw -> scaled conversion. Roughly linear, slightly compressed at
// the top and the bottom (a smoothstep blended 25% into a straight line).
/**
 * Raw -> scaled conversion, derived from College Board's OFFICIAL scoring
 * guides for paper practice tests 4 through 11.
 *
 * Method: the lower and upper bound of every raw score was read from all eight
 * official guides and averaged, which smooths the real form-to-form variation
 * (20-60 points at the same raw score). The official tables cover 66 Reading
 * and Writing questions and 54 Math; our tests have 54 and 44, so each raw
 * score is mapped by PROPORTION correct onto the official curve and
 * interpolated. The stored value is the midpoint of the official band.
 *
 * This replaced a hand-invented smoothstep formula that was inflating scores
 * by up to 60 points per section in the middle of the range — precisely where
 * most students sit. It is still an estimate: these are linear tests, and the
 * real SAT is adaptive.
 *
 * Index = number of correct answers.
 */
export const RW_SCALE = [
  200, 210, 210, 210, 210, 220, 230, 240, 250, 260,
  270, 280, 300, 310, 330, 340, 350, 360, 370, 380,
  390, 400, 410, 420, 430, 440, 450, 460, 470, 480,
  490, 500, 510, 520, 530, 550, 560, 570, 580, 600,
  610, 620, 630, 650, 660, 670, 690, 700, 720, 730,
  740, 750, 770, 780, 800
];

export const MATH_SCALE = [
  200, 210, 210, 220, 220, 230, 250, 270, 300, 320,
  340, 350, 360, 370, 380, 380, 390, 400, 410, 420,
  430, 440, 460, 470, 490, 500, 510, 530, 540, 550,
  570, 580, 600, 610, 630, 640, 660, 680, 700, 720,
  740, 760, 780, 790, 800
];

export function scaleFor(raw, max) {
  const table = max === 54 ? RW_SCALE : MATH_SCALE;
  const i = Math.max(0, Math.min(raw, table.length - 1));
  return table[i];
}
