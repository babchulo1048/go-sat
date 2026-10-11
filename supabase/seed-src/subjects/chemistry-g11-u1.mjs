// Grade 11 Chemistry, Unit 1 — Atomic Structure and Periodic Properties.
// Study notes for her school exam (Tue 13 Oct 2026), written 11 Oct 2026 from
// her teacher's slides (by Tamiru): Part II (1.5.4–1.5.6) and Part III (1.6–1.8).
//
// These notes do NOT replace the book. They explain the ideas behind it, so
// that when she reads her own notes the definitions make sense instead of
// having to be memorized. Where the slides contain an error, the notes say so.
//
// Block kinds: heading, p, bullets, steps, formula, table, callout, example.
// Inline markup: **bold**, *italic*, `code`. Super/subscripts are Unicode.
// Section ids are append-only: never rename one, the app tracks "understood"
// against them.

export const SUBJECTS = [
  { id: "chemistry", name: "Chemistry", grade: "Grade 11", sort_order: 1 },
];

const yt = (id, title, channel, minutes) => ({
  url: `https://www.youtube.com/watch?v=${id}`,
  title,
  channel,
  minutes,
});

/* ======================================================================== */
/*  PART II — The Bohr model and wave–particle duality                      */
/* ======================================================================== */

const bohr = {
  id: "chem-g11-u1-bohr",
  subject_id: "chemistry",
  unit: "Unit 1 · Part II",
  title: "The Bohr model and wave–particle duality",
  source: "Teacher slides (Tamiru), Part II — sections 1.5.4 to 1.5.6",
  exam_date: "2026-10-13",
  sort_order: 1,
  intro:
    "One question runs through this whole chapter: **why does an atom only give out certain colors of light?** Bohr answered it with one bold idea — an electron can only have certain energies — and that idea explains the radius formula, the energy formula, and the hydrogen spectrum. Then de Broglie explained *why* the energies are fixed: electrons behave like waves. Understand the staircase picture in section 1 and everything else follows.",
  sections: [
    {
      id: "bohr-1-problem",
      title: "The problem Bohr solved",
      book_ref: "1.5.4",
      big_idea:
        "Energy inside an atom comes in fixed steps — like a staircase, not a ramp.",
      body: [
        {
          kind: "p",
          text: "Rutherford’s model had the electron circling the nucleus like a planet. But physics said a circling charge should **constantly lose energy as light**, spiral inward and crash into the nucleus in a fraction of a second. Atoms obviously don’t collapse — so the model was missing something.",
        },
        {
          kind: "p",
          text: "There was a second clue. When hydrogen gas is heated, it doesn’t glow with every color. It gives out only a few **sharp lines** of specific colors (its *line spectrum*). If the electron could have any energy, we would see every color.",
        },
        {
          kind: "callout",
          tone: "idea",
          title: "Bohr’s answer (1913)",
          text: "The electron can only have **certain energies**. It can stand on step 1, step 2, step 3… but never between steps. This is what **quantized** means. Light comes out only when the electron jumps down a step, so only certain amounts of energy — certain colors — ever appear.",
        },
        {
          kind: "table",
          head: ["Staircase picture", "In the atom"],
          rows: [
            ["Standing on a step", "Electron in an allowed orbit — no energy gained or lost"],
            ["Climbing up", "Electron absorbs exactly the right energy of light"],
            ["Stepping down", "Electron gives out light (a photon)"],
            ["Can’t stand between steps", "Energy is quantized"],
          ],
        },
      ],
      checks: [
        {
          q: "Why didn’t Rutherford’s atom work?",
          a: "A circling electron should keep losing energy as light and spiral into the nucleus. Real atoms are stable, so something was wrong.",
        },
        {
          q: "What does it mean that energy in an atom is *quantized*?",
          a: "The electron can only have certain specific energies, not any value in between — like standing only on the steps of a staircase.",
        },
      ],
      videos: [yt("au2HCVn9IJI", "Bohr Model of the Hydrogen Atom", "Professor Dave Explains", 5)],
    },
    {
      id: "bohr-2-assumptions",
      title: "Bohr’s assumptions — and why each one is there",
      book_ref: "1.5.4",
      big_idea:
        "Each assumption is a rule invented to make the atom stable and explain the line spectrum.",
      body: [
        {
          kind: "steps",
          items: [
            "**Circular orbits.** The electron moves around the nucleus in a circle. *(Simplest picture to start from.)*",
            "**Farther = more energy.** The farther the orbit from the nucleus, the higher the electron’s energy. *(Like height on the staircase.)*",
            "**Only some orbits are allowed** — the orbits are quantized. *(This is the big new idea.)*",
            "**Angular momentum is quantized:** mvr = n·h/2π, where n = 1, 2, 3… *(This is the mathematical rule that picks out which orbits are allowed.)*",
            "**No energy loss inside an orbit.** While the electron stays in one orbit it neither gains nor loses energy. *(This fixes the ‘atom collapses’ problem by declaring it can’t happen.)*",
            "**Jumps need exact light.** Moving up needs absorbed light; falling down gives out light. The photon’s energy **exactly equals** the difference between the two levels. *(This explains the sharp spectral lines.)*",
          ],
        },
        {
          kind: "callout",
          tone: "book",
          title: "About assumption 2 on the slide",
          text: "The slide says energy is *proportional* to distance. Take that as ‘more distance, more energy’. The real relationship is not a straight proportion: radius grows like n² while energy goes like −1/n² (sections 3 and 4).",
        },
      ],
      checks: [
        {
          q: "Which assumption explains why hydrogen gives sharp lines instead of a rainbow?",
          a: "Number 6: a photon’s energy exactly equals the gap between two allowed levels, and there are only a few gaps — so only a few colors.",
        },
        {
          q: "Which assumption ‘solves’ the collapse problem?",
          a: "Number 5: in an allowed orbit the electron does not lose energy, so it does not spiral inward.",
        },
      ],
      videos: [],
    },
    {
      id: "bohr-3-radius",
      title: "How big is each orbit? r = n² × 0.53 Å",
      book_ref: "1.5.4",
      big_idea:
        "Two ideas combined — force balance plus the quantum rule — give one simple result: orbit size grows with n².",
      body: [
        {
          kind: "p",
          text: "Bohr combined two conditions. You don’t need to reproduce every algebra step, but you should know **where each piece comes from**:",
        },
        {
          kind: "bullets",
          items: [
            "**Balance of forces** (a stable circle): the pull of the nucleus equals the force needed to keep moving in a circle → e²/r² = mv²/r.",
            "**The quantum rule:** mvr = nh/2π → solve for v = nh / (2πmr).",
            "Put that v into the first equation and solve for r. Everything except n is a constant.",
          ],
        },
        { kind: "formula", text: "r = n² · h² / (4π²me²) = n² × a₀", note: "a₀ = 0.53 Å, the Bohr radius" },
        {
          kind: "table",
          head: ["n", "Radius", "Compared with n = 1"],
          rows: [
            ["1", "0.53 Å", "1×"],
            ["2", "2.12 Å", "4×"],
            ["3", "4.76 Å", "9×"],
          ],
        },
        {
          kind: "callout",
          tone: "idea",
          text: "**n²** is the pattern to remember: double n and the orbit gets **four** times bigger, not two. (1 Å = 10⁻¹⁰ m.)",
        },
      ],
      checks: [
        {
          q: "What is the radius of the n = 4 orbit in hydrogen?",
          a: "r = 4² × 0.53 Å = 16 × 0.53 = 8.48 Å.",
        },
        {
          q: "Which two conditions did Bohr combine to get the radius formula?",
          a: "The balance of forces for a stable circular orbit, and the quantum condition mvr = nh/2π.",
        },
      ],
      videos: [yt("7Zin8hG9Nhw", "Bohr model energy levels (derivation using physics)", "Khan Academy", 12)],
    },
    {
      id: "bohr-4-energy",
      title: "Energy levels: why the energy is negative",
      book_ref: "1.5.4",
      big_idea:
        "Eₙ = −2.18 × 10⁻¹⁸ J / n². The minus sign means ‘trapped’: you must add energy to free the electron.",
      body: [
        { kind: "formula", text: "Eₙ = −R_H / n² = −2.18 × 10⁻¹⁸ J / n²", note: "R_H = 2.18 × 10⁻¹⁸ J (Rydberg constant, energy form)" },
        {
          kind: "p",
          text: "Zero energy is defined as an electron that is **completely free**, far away from the nucleus (n = ∞). A trapped electron has *less* energy than a free one, so its energy is **below zero — negative**.",
        },
        {
          kind: "table",
          head: ["Level", "Energy (J)", "Name"],
          rows: [
            ["n = 1", "−2.18 × 10⁻¹⁸", "Ground state — lowest, most stable"],
            ["n = 2", "−5.45 × 10⁻¹⁹", "Excited state"],
            ["n = 3", "−2.42 × 10⁻¹⁹", "Excited state"],
            ["n = ∞", "0", "Electron removed (ion formed)"],
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The confusing part",
          text: "Closer to the nucleus (smaller n) the energy is **more negative**, which means **lower** and **more stable**. ‘Bigger number’ after the minus sign = deeper in the well. Going up from n = 1 to n = 2, the energy *rises* from −2.18 to −0.545 (× 10⁻¹⁸ J).",
        },
        {
          kind: "p",
          text: "Useful consequence: removing the electron from the ground state needs exactly **2.18 × 10⁻¹⁸ J** per atom — hydrogen’s ionization energy (1312 kJ/mol).",
        },
      ],
      checks: [
        {
          q: "Is an electron at n = 1 higher or lower in energy than at n = 3?",
          a: "Lower. −2.18 × 10⁻¹⁸ J is more negative than −2.42 × 10⁻¹⁹ J, so n = 1 is the lowest, most stable level.",
        },
        {
          q: "What does E = 0 represent in the Bohr model?",
          a: "An electron that is completely free from the nucleus (n = ∞).",
        },
      ],
      videos: [yt("nJ-PtF14EFw", "Bohr model energy levels", "Khan Academy", 10)],
    },
    {
      id: "bohr-5-spectra",
      title: "Jumps between levels make the line spectrum",
      book_ref: "1.5.4",
      big_idea:
        "Every spectral line is one specific jump. Bigger drop → more energy → shorter wavelength.",
      body: [
        { kind: "formula", text: "ΔE = E_final − E_initial = −2.18 × 10⁻¹⁸ J (1/n_f² − 1/n_i²)" },
        {
          kind: "bullets",
          items: [
            "**ΔE positive → absorbed** (electron goes up, n_f > n_i).",
            "**ΔE negative → emitted** (electron falls, n_f < n_i). The light carries away |ΔE|.",
            "Link energy to light with **E = hν = hc/λ** (h = 6.626 × 10⁻³⁴ J·s, c = 3.00 × 10⁸ m/s).",
          ],
        },
        {
          kind: "example",
          title: "Worked example — the red line of hydrogen (n = 3 → n = 2)",
          steps: [
            "ΔE = −2.18 × 10⁻¹⁸ (1/2² − 1/3²) = −2.18 × 10⁻¹⁸ × 0.1389 = −3.03 × 10⁻¹⁹ J (negative: emitted).",
            "Energy of the photon = 3.03 × 10⁻¹⁹ J.",
            "λ = hc / E = (6.626 × 10⁻³⁴ × 3.00 × 10⁸) / 3.03 × 10⁻¹⁹ = 6.56 × 10⁻⁷ m.",
          ],
          answer: "λ = 656 nm — the red line in the hydrogen spectrum.",
        },
        {
          kind: "table",
          head: ["Series", "Electron falls to", "From", "Region"],
          rows: [
            ["Lyman", "n = 1", "2, 3, 4…", "Ultraviolet"],
            ["Balmer", "n = 2", "3, 4, 5…", "Visible (and near UV)"],
            ["Paschen", "n = 3", "4, 5, 6…", "Infrared"],
            ["Brackett", "n = 4", "5, 6, 7…", "Infrared"],
          ],
        },
        {
          kind: "callout",
          tone: "idea",
          title: "Remember the series by where the electron lands",
          text: "Lyman lands on 1, Balmer on 2, Paschen on 3, Brackett on 4. Landing on n = 1 is the biggest drop, so Lyman lines have the most energy — ultraviolet.",
        },
        {
          kind: "p",
          text: "Wavelength-form of the same idea (the Rydberg equation): **1/λ = R (1/n_low² − 1/n_high²)**, with R = 1.097 × 10⁷ m⁻¹.",
        },
      ],
      checks: [
        {
          q: "An electron falls from n = 4 to n = 2. Absorbed or emitted? Which series?",
          a: "Emitted (it falls). It lands on n = 2, so it is a Balmer line — visible light.",
        },
        {
          q: "Which emits light of shorter wavelength: 3 → 1 or 3 → 2?",
          a: "3 → 1. It is a bigger energy drop, and more energy means shorter wavelength.",
        },
      ],
      videos: [
        yt("mXxsT1ut35Q", "Bohr Model, Electron Transitions, Atomic Energy Levels (calculations)", "The Organic Chemistry Tutor", 22),
      ],
    },
    {
      id: "bohr-6-limitations",
      title: "Where the Bohr model fails",
      book_ref: "1.5.5",
      big_idea:
        "Bohr works only for one-electron atoms, and his exact orbits break Heisenberg’s principle.",
      body: [
        {
          kind: "steps",
          items: [
            "**Only one-electron atoms.** It works for H, He⁺ and Li²⁺, but cannot explain the spectra of atoms with more electrons, because it ignores electron–electron repulsion.",
            "**Cannot explain the Zeeman effect** — spectral lines splitting into several lines in a magnetic field (or in an electric field: the Stark effect).",
            "**Breaks the uncertainty principle.** A fixed orbit means knowing the electron’s exact position *and* speed at once, which Heisenberg showed is impossible (Part III).",
          ],
        },
        {
          kind: "p",
          text: "Also: Bohr *assumed* the fixed energy levels without a physical reason for them. de Broglie supplied the reason next.",
        },
      ],
      checks: [
        {
          q: "Name the three limitations of the Bohr model.",
          a: "Only works for one-electron atoms; can’t explain the Zeeman (and Stark) effect; violates Heisenberg’s uncertainty principle.",
        },
      ],
      videos: [],
    },
    {
      id: "bohr-7-de-broglie",
      title: "Wave–particle duality: λ = h / mv",
      book_ref: "1.5.6",
      big_idea:
        "Everything moving has a wavelength, but only for tiny things like electrons is it big enough to matter.",
      body: [
        {
          kind: "p",
          text: "Light was known to act like particles (photons). In 1924 **de Broglie** flipped the idea: maybe **particles act like waves**. An electron trapped around a nucleus would then behave like a vibrating guitar string — only certain waves fit, which is exactly why only certain energies are allowed.",
        },
        { kind: "formula", text: "λ = h / (m·v)", note: "m in kg, v in m/s, h = 6.626 × 10⁻³⁴ J·s → λ in metres" },
        {
          kind: "p",
          text: "The slide derives this by setting E = mc² equal to E = hc/λ and replacing c with v. Treat that as a memory aid for where the formula comes from.",
        },
        {
          kind: "table",
          head: ["Object", "Mass and speed", "Wavelength"],
          rows: [
            ["Electron", "9.11 × 10⁻³¹ kg at 2.2 × 10⁶ m/s", "≈ 0.33 nm — about the size of an atom, so wave behavior matters"],
            ["Baseball", "0.145 kg at 40 m/s", "≈ 1.1 × 10⁻³⁴ m — far too small to ever notice"],
          ],
        },
        {
          kind: "callout",
          tone: "idea",
          text: "Because m is on the bottom, **heavier or faster → shorter wavelength**. That’s why wave behavior only shows up at the atomic scale: this dual nature is called **wave–particle duality**.",
        },
      ],
      checks: [
        {
          q: "A proton and an electron move at the same speed. Which has the longer de Broglie wavelength?",
          a: "The electron. It has much less mass, and λ = h/mv, so smaller m gives larger λ.",
        },
        {
          q: "How did de Broglie’s idea explain Bohr’s fixed energy levels?",
          a: "If the electron is a wave, only waves that fit around the orbit are allowed, so only certain orbits and energies exist.",
        },
      ],
      videos: [yt("cYyFPFU6s_A", "De Broglie Wavelength Problems In Chemistry", "The Organic Chemistry Tutor", 11)],
    },
    {
      id: "bohr-8-practice",
      title: "Your slide’s practice questions — worked",
      book_ref: "Content-checking questions",
      big_idea:
        "Three formulas cover all six: c = λν, E = hν = hc/λ, and λ = h/mv.",
      body: [
        {
          kind: "callout",
          tone: "warn",
          title: "Try first",
          text: "Cover each solution and attempt the question yourself before reading it. Constants: h = 6.626 × 10⁻³⁴ J·s · c = 3.00 × 10⁸ m/s · Nₐ = 6.022 × 10²³ · electron mass 9.109 × 10⁻³¹ kg.",
        },
        {
          kind: "example",
          title: "1. Radio station at 992 kHz — wavelength?",
          steps: ["Convert: 992 kHz = 9.92 × 10⁵ s⁻¹.", "λ = c/ν = 3.00 × 10⁸ / 9.92 × 10⁵."],
          answer: "λ ≈ 302 m",
        },
        {
          kind: "example",
          title: "2. Energy per photon at ν = 3.73 × 10¹⁴ s⁻¹",
          steps: ["E = hν = 6.626 × 10⁻³⁴ × 3.73 × 10¹⁴."],
          answer: "E ≈ 2.47 × 10⁻¹⁹ J per photon",
        },
        {
          kind: "example",
          title: "3. Microwave at λ = 1.20 cm — per photon and per mole",
          steps: [
            "Convert: 1.20 cm = 0.0120 m.",
            "(a) E = hc/λ = (6.626 × 10⁻³⁴ × 3.00 × 10⁸) / 0.0120 = 1.66 × 10⁻²³ J per photon.",
            "(b) Multiply by Avogadro’s number: 1.66 × 10⁻²³ × 6.022 × 10²³ = 9.97 J/mol, then divide by 1000.",
          ],
          answer: "(a) 1.66 × 10⁻²³ J/photon · (b) 9.97 × 10⁻³ kJ/mol",
        },
        {
          kind: "example",
          title: "4. Frequency emitted when hydrogen’s electron falls (a) 3 → 2 (b) 4 → 1",
          steps: [
            "|ΔE| = 2.18 × 10⁻¹⁸ (1/n_f² − 1/n_i²), then ν = |ΔE| / h.",
            "(a) 2.18 × 10⁻¹⁸ (1/4 − 1/9) = 3.03 × 10⁻¹⁹ J → ν = 3.03 × 10⁻¹⁹ / 6.626 × 10⁻³⁴.",
            "(b) 2.18 × 10⁻¹⁸ (1/1 − 1/16) = 2.04 × 10⁻¹⁸ J → ν = 2.04 × 10⁻¹⁸ / 6.626 × 10⁻³⁴.",
          ],
          answer: "(a) 4.57 × 10¹⁴ s⁻¹ · (b) 3.08 × 10¹⁵ s⁻¹",
        },
        {
          kind: "example",
          title: "5. Electrons with λ = 84.4 nm — what speed?",
          steps: ["Rearrange λ = h/mv to v = h/(mλ).", "v = 6.626 × 10⁻³⁴ / (9.109 × 10⁻³¹ × 84.4 × 10⁻⁹)."],
          answer: "v ≈ 8.62 × 10³ m/s",
        },
        {
          kind: "example",
          title: "6. Proton (1.67 × 10⁻²⁷ kg) at 2.55 × 10⁶ m/s — wavelength in nm?",
          steps: ["λ = h/mv = 6.626 × 10⁻³⁴ / (1.67 × 10⁻²⁷ × 2.55 × 10⁶) = 1.56 × 10⁻¹³ m.", "1 m = 10⁹ nm."],
          answer: "λ ≈ 1.56 × 10⁻⁴ nm",
        },
        {
          kind: "callout",
          tone: "book",
          text: "Your slide numbers two questions as ‘5’. The second one is question 6 here.",
        },
      ],
      checks: [],
      videos: [],
    },
  ],
};

/* ======================================================================== */
/*  PART III — Quantum model, electron configuration, periodic properties  */
/* ======================================================================== */

const quantum = {
  id: "chem-g11-u1-quantum",
  subject_id: "chemistry",
  unit: "Unit 1 · Part III",
  title: "Quantum model, electron configurations and periodic trends",
  source: "Teacher slides (Tamiru), Part III — sections 1.6 to 1.8.3",
  exam_date: "2026-10-13",
  sort_order: 2,
  intro:
    "This chapter replaces Bohr’s neat orbits with **clouds of probability**, then gives every electron an *address* (four quantum numbers), fills atoms up electron by electron, and finally shows that the periodic table is simply a map of those addresses. One idea — **effective nuclear charge** — then explains the trends. If you understand the address idea (section 3) and Z_eff (section 8), most exam questions become reasoning instead of memory.",
  sections: [
    {
      id: "qm-1-heisenberg",
      title: "Heisenberg: you can’t pin an electron down",
      book_ref: "1.6.1",
      big_idea:
        "Measuring an electron’s position disturbs its momentum, so we can never know both exactly.",
      body: [
        { kind: "formula", text: "Δx · Δp ≥ h / 4π", note: "Δx = uncertainty in position, Δp = uncertainty in momentum (p = mv)" },
        {
          kind: "p",
          text: "To *see* an electron you must hit it with light. To locate it precisely you need short-wavelength, high-energy light — which knocks the electron and changes its speed. Gentler, long-wavelength light leaves the speed alone but blurs the position. **Better position ↔ worse momentum.** This is a law of nature, not a weakness of our instruments.",
        },
        {
          kind: "callout",
          tone: "idea",
          title: "Why it matters",
          text: "Bohr’s orbit claims an exact path — exact position and exact speed at every moment. Heisenberg says that’s impossible, so we stop describing paths and start describing **probabilities**: where the electron is *likely* to be.",
        },
        {
          kind: "callout",
          tone: "book",
          title: "Slide error",
          text: "The slide says **1827**. Heisenberg proposed the principle in **1927**. (In 1827 he hadn’t been born.)",
        },
      ],
      checks: [
        {
          q: "State Heisenberg’s uncertainty principle in one sentence.",
          a: "It is impossible to know both the exact position and the exact momentum of an electron at the same time.",
        },
        {
          q: "Why does the uncertainty principle undermine Bohr’s model?",
          a: "Bohr’s fixed orbits assume we know the electron’s exact position and speed together, which the principle forbids.",
        },
      ],
      videos: [yt("TQKELOE9eY4", "What is the Heisenberg Uncertainty Principle?", "TED-Ed", 5)],
    },
    {
      id: "qm-2-orbitals",
      title: "Schrödinger, ψ, and the orbital",
      book_ref: "1.6",
      big_idea:
        "An orbital is not a path — it is the region where the electron is found about 90% of the time.",
      body: [
        {
          kind: "bullets",
          items: [
            "**Schrödinger (1926)** described the electron as a wave with an equation. Its solution is the **wave function ψ** (psi).",
            "**ψ² = probability density** — how likely the electron is to be found at each point.",
            "Plotting many likely positions gives a fuzzy **electron cloud**, dense where the electron is often found.",
            "An **orbital** is the region that contains about **90%** of that probability. Its outline is drawn as a *boundary surface*.",
          ],
        },
        {
          kind: "table",
          head: ["Bohr ‘orbit’", "Quantum ‘orbital’"],
          rows: [
            ["Exact circular path", "Region of probability"],
            ["Position known exactly", "Only the likely location is known"],
            ["Flat circle", "3-D shape (sphere, dumbbell, …)"],
          ],
        },
        {
          kind: "callout",
          tone: "book",
          text: "The equation printed on the slide is garbled and you will not be asked to reproduce it. Know the ideas: ψ is the wave function, ψ² gives probability, and solving it gives the quantum numbers. Schrödinger published in **1926** (the slide says 1927).",
        },
      ],
      checks: [
        {
          q: "What is the difference between an orbit and an orbital?",
          a: "An orbit is Bohr’s exact circular path. An orbital is a 3-D region where the electron is likely to be found (about 90% probability).",
        },
        { q: "What does ψ² tell us?", a: "The probability of finding the electron at a given point in space." },
      ],
      videos: [],
    },
    {
      id: "qm-3-quantum-numbers",
      title: "The four quantum numbers: an electron’s address",
      book_ref: "1.6.2",
      big_idea:
        "n = which floor · l = which kind of room · mₗ = which room · mₛ = which of the two occupants.",
      body: [
        {
          kind: "table",
          head: ["Number", "Tells you", "Allowed values"],
          rows: [
            ["n — principal", "Shell: size and energy (the floor)", "1, 2, 3, …"],
            ["l — angular momentum", "Subshell: shape (the kind of room: s, p, d, f)", "0 to n − 1"],
            ["mₗ — magnetic", "Orbital: orientation (which room)", "−l to +l"],
            ["mₛ — spin", "Spin direction (which of the two occupants)", "+½ or −½"],
          ],
        },
        {
          kind: "table",
          head: ["l value", "0", "1", "2", "3"],
          rows: [["Letter", "s", "p", "d", "f"], ["Orbitals (2l + 1)", "1", "3", "5", "7"], ["Max electrons", "2", "6", "10", "14"]],
        },
        {
          kind: "callout",
          tone: "idea",
          title: "The rules chain together",
          text: "**n limits l, and l limits mₗ.** Pick n; then l can be 0 up to n − 1; then mₗ runs from −l to +l. Each orbital holds 2 electrons (spin up and spin down). So a shell holds **n² orbitals** and **2n² electrons**.",
        },
        {
          kind: "example",
          title: "Worked example — all orbitals with n = 2",
          steps: [
            "l can be 0 or 1 (from 0 to n − 1).",
            "l = 0 → 2s → mₗ = 0 → 1 orbital.",
            "l = 1 → 2p → mₗ = −1, 0, +1 → 3 orbitals.",
            "Total 4 orbitals (= 2²), each with mₛ = +½ or −½ → 8 electrons (= 2 × 2²).",
          ],
          answer: "n = 2 has 4 orbitals and holds 8 electrons.",
        },
        {
          kind: "example",
          title: "Spotting an impossible set",
          steps: [
            "(n, l, mₗ, mₛ) = (2, 2, 0, +½): l must be less than n, and 2 is not less than 2 → impossible.",
            "(3, 1, −2, −½): mₗ can only be −1, 0, +1 when l = 1 → impossible.",
            "(3, 2, −1, +½): l = 2 < 3, mₗ = −1 is within −2…+2, mₛ is ±½ → allowed (a 3d electron).",
          ],
          answer: "Check l < n first, then |mₗ| ≤ l, then mₛ = ±½.",
        },
      ],
      checks: [
        {
          q: "How many orbitals and electrons fit in the n = 3 shell?",
          a: "n² = 9 orbitals (one 3s, three 3p, five 3d) and 2n² = 18 electrons.",
        },
        {
          q: "Is (1, 1, 0, +½) a possible set of quantum numbers?",
          a: "No. When n = 1, l can only be 0.",
        },
        {
          q: "What does each quantum number describe?",
          a: "n — shell (size and energy); l — subshell shape; mₗ — orbital orientation; mₛ — electron spin.",
        },
      ],
      videos: [
        yt("Aoi4j8es4gQ", "Quantum Numbers, Atomic Orbitals, and Electron Configurations", "Professor Dave Explains", 9),
        yt("eRIN9CPDrpo", "Quantum Numbers", "The Organic Chemistry Tutor", 12),
      ],
    },
    {
      id: "qm-4-shapes",
      title: "Shapes of s, p and d orbitals",
      book_ref: "1.6.3",
      big_idea:
        "s is a sphere, p is a dumbbell along an axis, d is mostly a four-leaf clover — and the number of orientations is 2l + 1.",
      body: [
        {
          kind: "table",
          head: ["Type", "Shape", "How many", "First appears"],
          rows: [
            ["s (l = 0)", "Sphere around the nucleus", "1", "n = 1"],
            ["p (l = 1)", "Dumbbell: two lobes, nucleus between", "3 — p_x, p_y, p_z", "n = 2"],
            ["d (l = 2)", "Four-leaf clover (d_{z²} is a dumbbell with a ring)", "5", "n = 3"],
            ["f (l = 3)", "Complex", "7", "n = 4"],
          ],
        },
        {
          kind: "bullets",
          items: [
            "**s orbitals get bigger as n increases**: 1s < 2s < 3s, but all are spheres.",
            "The three p orbitals point along the **x, y and z axes**, at right angles to each other. They have the **same energy** — they are *degenerate*.",
            "Each p orbital has a **nodal plane** through the nucleus where the electron is never found (for p_x it is the yz plane).",
            "The five d orbitals: d_{xy}, d_{yz}, d_{xz}, d_{x²−y²} and d_{z²}.",
          ],
        },
      ],
      checks: [
        { q: "Why is there no 1p or 2d orbital?", a: "l must be less than n. For n = 1, l = 0 only (s); for n = 2, l = 0 or 1 (s and p), so d (l = 2) first appears at n = 3." },
        { q: "What does ‘degenerate’ mean for the three 2p orbitals?", a: "They have the same energy; they differ only in direction." },
      ],
      videos: [yt("K-jNgq16jEY", "Electron Orbitals - s, p & d", "Anna Tanczos", 2)],
    },
    {
      id: "qm-5-configuration",
      title: "Writing electron configurations: three rules",
      book_ref: "1.7",
      big_idea:
        "Fill the lowest energy first (Aufbau), at most two per orbital with opposite spins (Pauli), and spread out before pairing (Hund).",
      body: [
        {
          kind: "p",
          text: "Notation: **nlᵉ** — shell number, subshell letter, number of electrons as a superscript. Example: 1s² 2s² 2p³ is nitrogen (7 electrons).",
        },
        {
          kind: "steps",
          items: [
            "**Aufbau principle** — fill from lowest energy upward: 1s 2s 2p 3s 3p **4s 3d** 4p 5s 4d 5p 6s 4f 5d 6p… Note 4s fills *before* 3d.",
            "**Pauli exclusion principle** — an orbital holds at most **2 electrons**, with **opposite spins** (↑↓). No two electrons in an atom share all four quantum numbers.",
            "**Hund’s rule** — in orbitals of equal energy (like the three 2p), put **one electron in each first**, all with the same spin, before pairing. Electrons repel, so they spread out.",
          ],
        },
        {
          kind: "callout",
          tone: "idea",
          title: "Shortcut for the filling order",
          text: "Fill in order of increasing **n + l**; if two tie, the one with smaller n goes first. 4s: 4 + 0 = 4; 3d: 3 + 2 = 5 → 4s first.",
        },
        {
          kind: "table",
          head: ["Element", "Z", "Configuration", "Orbital diagram (2p)"],
          rows: [
            ["C", "6", "1s² 2s² 2p²", "↑ ↑ _"],
            ["N", "7", "1s² 2s² 2p³", "↑ ↑ ↑"],
            ["O", "8", "1s² 2s² 2p⁴", "↑↓ ↑ ↑"],
            ["Ne", "10", "1s² 2s² 2p⁶", "↑↓ ↑↓ ↑↓"],
          ],
        },
        {
          kind: "p",
          text: "**Noble-gas shorthand:** write the previous noble gas in brackets, then the rest. Iron (Z = 26) = [Ar] 4s² 3d⁶, where [Ar] = 1s² 2s² 2p⁶ 3s² 3p⁶.",
        },
      ],
      checks: [
        { q: "Write the configuration of sulfur (Z = 16).", a: "1s² 2s² 2p⁶ 3s² 3p⁴, or [Ne] 3s² 3p⁴." },
        { q: "Why does nitrogen have three unpaired 2p electrons instead of one pair and one single?", a: "Hund’s rule: electrons occupy equal-energy orbitals singly first, because they repel each other." },
        { q: "Why does 4s fill before 3d?", a: "4s has the lower energy (n + l = 4 versus 5 for 3d)." },
      ],
      videos: [yt("C6afrc1QS6Y", "Aufbau’s Principle, Hund’s Rule & Pauli’s Exclusion Principle", "The Organic Chemistry Tutor", 5)],
    },
    {
      id: "qm-6-exceptions",
      title: "The exceptions: chromium and copper",
      book_ref: "1.7",
      big_idea:
        "A half-full (d⁵) or completely full (d¹⁰) d subshell is extra stable, so one 4s electron moves into 3d.",
      body: [
        {
          kind: "table",
          head: ["", "Expected", "Actual", "Why"],
          rows: [
            ["Cr (24)", "[Ar] 4s² 3d⁴", "[Ar] 4s¹ 3d⁵", "Half-full 3d⁵ is more stable"],
            ["Cu (29)", "[Ar] 4s² 3d⁹", "[Ar] 4s¹ 3d¹⁰", "Full 3d¹⁰ is more stable"],
          ],
        },
        {
          kind: "p",
          text: "Why is this even possible? 4s and 3d are **very close in energy**, so moving one electron costs almost nothing — and a half-full or full set of d orbitals lowers the atom’s total energy (less repulsion, more symmetry). The atom simply picks the lowest-energy arrangement.",
        },
        {
          kind: "p",
          text: "The same thing happens lower in the table, where the energy gaps are even smaller: Mo [Kr] 5s¹ 4d⁵ · Ag [Kr] 5s¹ 4d¹⁰ · Pd [Kr] 4d¹⁰ · Au [Xe] 4f¹⁴ 5d¹⁰ 6s¹.",
        },
      ],
      checks: [
        { q: "Write the actual configuration of copper and explain it.", a: "[Ar] 4s¹ 3d¹⁰. A completely filled 3d subshell is more stable, and 4s and 3d are close enough in energy for one electron to move." },
      ],
      videos: [yt("Ur2PuzJ7KWs", "Electron Configuration Exceptions - Chromium & Copper", "The Organic Chemistry Tutor", 6)],
    },
    {
      id: "qm-7-periodic-table",
      title: "The periodic table is a map of configurations",
      book_ref: "1.8.1 – 1.8.2",
      big_idea:
        "Period = outermost shell (n). Group = number of valence electrons. Block = the subshell being filled.",
      body: [
        {
          kind: "p",
          text: "**Periodic law:** properties repeat periodically when elements are arranged by increasing **atomic number** (Mendeleev arranged by atomic *mass*; that is the key difference from today’s table). 7 periods, 18 groups.",
        },
        {
          kind: "table",
          head: ["Block", "Filling", "Where", "Type"],
          rows: [
            ["s", "s orbital", "Groups 1–2 (+ He)", "Main group"],
            ["p", "p orbitals", "Groups 13–18", "Main group"],
            ["d", "d orbitals", "Groups 3–12", "Transition"],
            ["f", "f orbitals", "Lanthanides, actinides", "Inner transition"],
          ],
        },
        {
          kind: "p",
          text: "Main-group elements are also called **representative** elements.",
        },
        {
          kind: "callout",
          tone: "idea",
          title: "Why same group = similar chemistry",
          text: "Chemistry is done by the **outer (valence) electrons**. Elements in a group have the same valence arrangement (all of group 1 end in s¹), so they react alike.",
        },
        {
          kind: "example",
          title: "Revision question 4 — 1s² 2s² 2p⁶ 3s² 3p⁵, without the table",
          steps: [
            "Highest shell is n = 3 → **period 3**.",
            "Valence electrons: 3s² 3p⁵ = **7** → p-block, **group 17**.",
            "One electron short of a full shell → strongly **nonmetallic**, tends to **gain 1 electron**.",
          ],
          answer: "Period 3, group 17, 7 valence electrons, nonmetal, gains one electron — it is chlorine.",
        },
      ],
      checks: [
        { q: "How is today’s periodic table different from Mendeleev’s?", a: "Today’s is ordered by atomic number; Mendeleev ordered by atomic mass." },
        { q: "Two elements are in the same group but different periods. Similar properties?", a: "Similar, not identical. They share the same valence configuration, but the lower one has more shells, so its size and reactivity differ." },
      ],
      videos: [],
    },
    {
      id: "qm-8-zeff",
      title: "Effective nuclear charge: the key to every trend",
      book_ref: "1.8.3",
      big_idea:
        "Z_eff = Z − S: the real pull an outer electron feels after the inner electrons shield it.",
      body: [
        { kind: "formula", text: "Z_eff = Z − S", note: "Z = protons, S = shielding by electrons between the nucleus and the electron" },
        {
          kind: "p",
          text: "Inner electrons sit between the nucleus and the outer electrons and cancel part of the nucleus’s pull. Sodium: Z = 11, its 10 inner electrons shield, so the outer 3s electron feels about **11 − 10 = +1**.",
        },
        {
          kind: "table",
          head: ["", "Across a period →", "Down a group ↓"],
          rows: [
            ["What changes", "One more proton each step, same shell", "One more shell each step"],
            ["Z_eff", "Increases (shielding barely changes)", "Roughly the same"],
            ["Distance of outer electrons", "About the same", "Increases"],
          ],
        },
        {
          kind: "callout",
          tone: "idea",
          text: "Every trend in section 9 comes from these two facts: **across a period, pull (Z_eff) increases; down a group, distance increases.**",
        },
      ],
      checks: [
        { q: "What is the approximate Z_eff felt by the 3s electron of magnesium (Z = 12)?", a: "12 − 10 = +2." },
      ],
      videos: [yt("MVEgoVJFg7E", "Nuclear Charge, Shielding Effect & Effective Nuclear Charge", "Gradefruit", 2)],
    },
    {
      id: "qm-9-trends",
      title: "Atomic radius and ionization energy",
      book_ref: "1.8.3",
      big_idea:
        "Across a period: atoms shrink and hold electrons tighter. Down a group: atoms grow and hold electrons looser.",
      body: [
        { kind: "heading", text: "Atomic radius" },
        {
          kind: "bullets",
          items: [
            "Defined as **half the distance between two bonded nuclei** (r = d/2) — an isolated atom has no sharp edge.",
            "**Decreases across a period**: Z_eff grows, pulling the same shell in tighter.",
            "**Increases down a group**: each step adds a whole new shell.",
            "**Cations are smaller** than their atom (lost electrons, often a whole shell): Na⁺ < Na.",
            "**Anions are larger** than their atom (extra electron, more repulsion): Cl⁻ > Cl.",
            "**Transition metals stay nearly the same size** across a period: the new electrons go into an *inner* d subshell, shielding the outer 4s electrons and cancelling the extra protons.",
          ],
        },
        {
          kind: "example",
          title: "Exercise 1.12 Q3 — why is Na → Mg a big drop (186 → 160 pm) but Cr → Mn tiny (125 → 124 pm)?",
          steps: [
            "Na → Mg: the extra electron goes into the **same outer shell** (3s), which shields poorly, so Z_eff jumps and the atom shrinks a lot.",
            "Cr → Mn: the extra electron goes into the **inner 3d** subshell. It shields the outer 4s electrons and cancels the extra proton, so Z_eff barely changes.",
          ],
          answer: "Main-group: the electron added to the outer shell shields poorly. Transition: the electron added to the inner d shields well.",
        },
        {
          kind: "example",
          title: "Exercise 1.12 Q2 — decreasing atomic size",
          steps: [
            "(a) Sr > Ca > Mg — same group, more shells going down.",
            "(b) K > Ca > Ga — same period (4), shrinking left to right.",
            "(c) Rb > Br > Kr — Rb is in period 5; Br and Kr in period 4, Kr further right.",
            "(d) Rb > Sr > Ca — Rb and Sr in period 5 (Rb further left); Ca is a period higher.",
          ],
          answer: "Down a group → bigger. Across a period → smaller.",
        },
        { kind: "heading", text: "Ionization energy (IE)" },
        {
          kind: "p",
          text: "The energy needed to **remove the outermost electron** from a gaseous atom: X(g) → X⁺(g) + e⁻. It is the opposite of atomic size:",
        },
        {
          kind: "bullets",
          items: [
            "**Increases across a period** — stronger pull (higher Z_eff), smaller atom.",
            "**Decreases down a group** — the outer electron is farther away and better shielded.",
            "**Each further electron is harder to remove** (IE₁ < IE₂ < IE₃…): the ion left behind is more positive. There is a huge jump when you start removing from a full inner shell.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Usually asked as reasoning",
          text: "Don’t memorize a list of rankings. Ask two questions: *how far is the outer electron* (shells), and *how strongly is it pulled* (Z_eff). Size and IE always move in opposite directions.",
        },
      ],
      checks: [
        { q: "Which is larger: Mg or Mg²⁺? Why?", a: "Mg. Mg²⁺ has lost both 3s electrons — its whole outer shell — and the remaining electrons are pulled in by the same nucleus." },
        { q: "Which has the higher first ionization energy, Na or Cl?", a: "Cl. It is in the same period but further right, so it has a higher Z_eff and a smaller radius." },
        { q: "Why do atomic radii decrease across a period even though electrons are added?", a: "The electrons go into the same shell while protons are added, so Z_eff increases and the cloud is pulled closer." },
      ],
      videos: [
        yt("hePb00CqvP0", "The Periodic Table: Atomic Radius, Ionization Energy, and Electronegativity", "Professor Dave Explains", 8),
        yt("4Url0pjbcuU", "Atomic Radius - Basic Introduction - Periodic Table Trends", "The Organic Chemistry Tutor", 14),
      ],
    },
    {
      id: "qm-10-other-trends",
      title: "The other trends listed in your objectives",
      book_ref: "1.8.3 (objectives)",
      big_idea:
        "Electron affinity, electronegativity and nonmetallic character follow ionization energy: up across a period, down a group.",
      body: [
        {
          kind: "callout",
          tone: "book",
          text: "Your slides end at the ionization energy heading, but the section objectives also list these. Read this in case they appear on the exam; confirm with your teacher what is included.",
        },
        {
          kind: "bullets",
          items: [
            "**Electron affinity** — the energy change when an atom *gains* an electron.",
            "**Electronegativity** — how strongly an atom pulls shared electrons in a bond.",
            "**Metallic character** — how easily an atom *loses* electrons.",
          ],
        },
        {
          kind: "table",
          head: ["Property", "Across →", "Down ↓"],
          rows: [
            ["Electron affinity", "More favorable (generally)", "Less favorable (generally)"],
            ["Electro­negativity", "Increases", "Decreases"],
            ["Metallic character", "Decreases", "Increases"],
          ],
        },
        {
          kind: "p",
          text: "Same two reasons as before: across a period, higher Z_eff means a stronger grip on electrons (less metallic, more electronegative); down a group, electrons are farther away and easier to lose (more metallic). Fluorine is the most electronegative element; the most metallic are at the bottom left (Cs, Fr).",
        },
      ],
      checks: [
        { q: "Where in the periodic table are the most metallic elements, and why?", a: "Bottom left. Their outer electrons are far from the nucleus and weakly held, so they are lost easily." },
      ],
      videos: [],
    },
  ],
};

export const CHAPTERS = [bohr, quantum];
