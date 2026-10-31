// Grade 11 Chemistry, Unit 2 — Chemical Bonding.
// Study notes written 30 Oct 2026 from her textbook (Grade 11, new
// curriculum), pages 66–143 (PDF pages 81–158). Same approach as Unit 1:
// explain the ideas so the book makes sense, don't replace it, and say so
// where the book itself is wrong or confusing.
//
// Page numbers given to her are the PRINTED page numbers in the book.
// Section ids are append-only.

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
/*  A — Why atoms bond, and ionic bonding (2.1–2.2, pp. 67–82)              */
/* ======================================================================== */

const ionic = {
  id: "chem-g11-u2-ionic",
  subject_id: "chemistry",
  unit: "Unit 2 · Part A",
  title: "Why atoms bond, and ionic bonding",
  source: "Textbook sections 2.1–2.2 (pages 67–82)",
  exam_date: null,
  sort_order: 3,
  intro:
    "Everything in this unit answers one question: **what holds particles together, and how does that decide a substance’s properties?** Atoms bond because the bonded arrangement has **lower energy** than the separate atoms. Part A covers the first way to do it — one atom *gives* electrons to another, and the opposite charges stick. Watch for the surprise in section 3: making the ions actually *costs* energy, and the payoff comes afterwards.",
  sections: [
    {
      id: "u2a-1-why-bond",
      title: "Why atoms bond at all",
      book_ref: "2.1 · p. 67–68",
      big_idea: "Atoms bond to reach a lower-energy, more stable arrangement — usually 8 outer electrons, like a noble gas.",
      body: [
        {
          kind: "p",
          text: "A **chemical bond** is the attractive force that holds atoms, ions or molecules together. Atoms don’t bond to be ‘happy’ — they bond because the bonded state has **lower energy** than the separate atoms, and nature always slides toward lower energy.",
        },
        {
          kind: "callout",
          tone: "idea",
          title: "The octet rule",
          text: "Noble gases (ns² np⁶) barely react: their 8 outer electrons are a very stable arrangement. Other atoms tend to **gain, lose or share electrons until they also have 8 in their outer shell**. (Hydrogen, lithium, beryllium and boron aim for 2, like helium.)",
        },
        {
          kind: "table",
          head: ["Atoms involved", "What happens", "Bond"],
          rows: [
            ["Metal + non-metal", "Electrons are **transferred**", "Ionic"],
            ["Non-metal + non-metal", "Electrons are **shared**", "Covalent"],
            ["Metal + metal", "Electrons are **pooled** in a ‘sea’", "Metallic"],
          ],
        },
        {
          kind: "p",
          text: "Why this pattern? Metals (left of the table) hold their outer electrons loosely and lose them easily; non-metals (right) pull electrons strongly. Opposites transfer; two strong pullers can only share; two weak holders pool.",
        },
      ],
      checks: [
        { q: "What type of bond forms between magnesium and oxygen? Between nitrogen and fluorine?", a: "Mg + O: metal + non-metal → ionic. N + F: two non-metals → covalent." },
        { q: "Why are noble gases unreactive?", a: "They already have a full outer shell (ns² np⁶), a very stable, low-energy arrangement — high ionization energy and no tendency to gain electrons." },
      ],
      videos: [yt("S_k0kr2eZSQ", "Introduction to Ionic Bonding and Covalent Bonding", "The Organic Chemistry Tutor", 13)],
    },
    {
      id: "u2a-2-ionic-lewis",
      title: "How an ionic bond forms — and Lewis symbols",
      book_ref: "2.2 · p. 69–71",
      big_idea: "The metal gives its outer electrons to the non-metal; the resulting + and − ions attract each other.",
      body: [
        {
          kind: "example",
          title: "Sodium chloride, step by step",
          steps: [
            "Na ([Ne] 3s¹) loses its one outer electron → Na⁺ ([Ne]).",
            "Cl ([Ne] 3s² 3p⁵) gains that electron → Cl⁻ ([Ar]).",
            "Na⁺ and Cl⁻ attract each other electrostatically → NaCl.",
          ],
          answer: "Both ions end with a noble-gas configuration; the bond is the attraction between them.",
        },
        {
          kind: "p",
          text: "A **Lewis symbol** is the element symbol with one dot for each **valence electron**: Na has 1 dot, Cl has 7. To show ionic bonding, move the dots: Na loses its dot and becomes [Na]⁺; Cl gets an eighth dot and becomes [Cl]⁻ in brackets.",
        },
        {
          kind: "callout",
          tone: "idea",
          title: "Working out the formula",
          text: "The charges must cancel. Ca gives away **2** electrons but each Cl takes only **1**, so you need two Cl: **CaCl₂**. Al gives 3 and O takes 2 → the smallest numbers that balance are 2 Al (+6) and 3 O (−6): **Al₂O₃**.",
        },
        {
          kind: "p",
          text: "Ions don’t form isolated pairs. Each ion attracts as many opposite ions as possible, so millions of them stack into a regular **crystal lattice** — which is why ionic compounds are solids.",
        },
      ],
      checks: [
        { q: "Use the electron-transfer idea to give the formula of the compound of lithium and oxygen.", a: "Li gives 1 electron, O needs 2, so two Li are needed: Li₂O." },
        { q: "Why does Na⁺ not react the way a sodium atom does?", a: "Na⁺ has already lost its outer electron and has the stable [Ne] configuration; the reactive 3s electron is gone." },
      ],
      videos: [yt("Qf07-8Jhhpc", "Ionic Bonding Introduction", "Tyler DeWitt", 7)],
    },
    {
      id: "u2a-3-lattice-energy",
      title: "The energy puzzle: lattice energy and the Born–Haber cycle",
      book_ref: "2.2 · p. 72–73",
      big_idea: "Making ions costs energy; the huge energy released when the ions pack into a crystal pays for it.",
      body: [
        {
          kind: "p",
          text: "Surprise: transferring the electron **absorbs** energy. For LiF, removing Li’s electron costs +520 kJ and F gaining it releases only 328 kJ, so the transfer alone costs **+192 kJ**. Yet LiF forms readily. Why?",
        },
        {
          kind: "callout",
          tone: "idea",
          text: "Because when the gaseous ions come together into a solid, a **huge** amount of energy is released (about 1050 kJ for LiF). That release — the **lattice energy** — is far bigger than the cost of making the ions. **Ionic solids exist only because the lattice energy beats the cost of electron transfer.**",
        },
        {
          kind: "p",
          text: "**Lattice energy (U):** the energy needed to separate 1 mol of an ionic solid into gaseous ions. It can’t be measured directly, so we calculate it with **Hess’s law**: the total energy change is the same whichever route you take.",
        },
        {
          kind: "example",
          title: "Born–Haber cycle for NaCl (the book’s example)",
          steps: [
            "Route 1 (direct): Na(s) + ½Cl₂(g) → NaCl(s), ΔH_f = −411 kJ.",
            "Route 2, step by step: vaporize Na +108 · break ½Cl₂ +120 · ionize Na +496 · Cl gains e⁻ −349 · ions form the solid = ?",
            "Both routes must total −411: −411 = 108 + 120 + 496 − 349 + (ions → solid).",
            "Ions → solid = −411 − 375 = −786 kJ.",
          ],
          answer: "Forming the solid from ions releases 786 kJ, so the lattice energy of NaCl is 786 kJ/mol.",
        },
        {
          kind: "callout",
          tone: "book",
          title: "About the sign in your book",
          text: "The book defines lattice energy as the energy to **separate** the solid (a positive number), but its worked answer is written as **−786**. That −786 is the energy of **forming** the solid from ions. Same size, opposite direction. If an exam asks for the lattice energy, 786 kJ/mol is the magnitude; follow your teacher’s sign convention.",
        },
      ],
      checks: [
        { q: "If electron transfer absorbs energy, why do ionic compounds form?", a: "The lattice energy released when the ions pack into a solid is much larger than the energy needed to make the ions, so the overall process releases energy." },
        { q: "What law lets us calculate lattice energy indirectly?", a: "Hess’s law: the enthalpy change is the same by any route, so the unknown step equals the direct ΔH_f minus the sum of the other steps." },
      ],
      videos: [yt("DI-bwx8r3r8", "Born Haber Cycle, Basic Introduction, Lattice Energy, Hess Law", "The Organic Chemistry Tutor", 10)],
    },
    {
      id: "u2a-4-lattice-factors",
      title: "What makes an ionic bond strong",
      book_ref: "2.2 · p. 74–75",
      big_idea: "U ∝ (q₁ × q₂) / r — bigger charges and smaller ions give a stronger ionic bond.",
      body: [
        { kind: "formula", text: "U ∝ (q₁ × q₂) / r", note: "q = charges on the ions, r = distance between their centres" },
        {
          kind: "bullets",
          items: [
            "**Charge matters most.** Mg²⁺O²⁻ (2 × 2 = 4) has a far larger lattice energy than Na⁺F⁻ (1 × 1 = 1).",
            "**Then size.** Smaller ions sit closer together (smaller r), so they attract more strongly.",
            "Ionic bonds also form more easily when the metal has a **low ionization energy** and the non-metal a **high electron affinity**.",
          ],
        },
        {
          kind: "example",
          title: "Exercise 2.3 Q6 — which has the LOWER lattice energy?",
          steps: [
            "CaS or BaS → **BaS**: Ba²⁺ is bigger than Ca²⁺ (same charges).",
            "NaF or MgO → **NaF**: charges 1 × 1 versus 2 × 2.",
            "LiCl or CsCl → **CsCl**: Cs⁺ is much bigger than Li⁺.",
            "BaS or CsCl → **CsCl**: charges 1 × 1 versus 2 × 2.",
          ],
          answer: "Check charges first; if they are equal, the larger ions give the lower lattice energy.",
        },
        {
          kind: "p",
          text: "Activity 2.7: **MgO** has stronger ionic bonding than LiF (similar sizes, double charges). **NaCl** is stronger than KCl (Na⁺ is smaller than K⁺: 102 vs 138 pm).",
        },
      ],
      checks: [
        { q: "Which has the higher melting point, NaCl or MgO? Why?", a: "MgO. Its ions carry 2+ and 2− charges, so the lattice energy (and the attraction to overcome on melting) is much larger." },
      ],
      videos: [yt("I61-N0GuSx8", "Lattice Energy of Ionic Compounds — Charge vs Ion Size", "The Organic Chemistry Tutor", 14)],
    },
    {
      id: "u2a-5-ion-exceptions",
      title: "Ions that don’t end with an octet",
      book_ref: "2.2 · p. 76–78",
      big_idea: "Small atoms copy helium (2 electrons); transition-metal ions often have no noble-gas arrangement at all.",
      body: [
        {
          kind: "bullets",
          items: [
            "**Fewer than 8 (a ‘duet’):** H⁻, Li⁺, Be²⁺ and B³⁺ end with 2 electrons, like helium.",
            "**Transition metals lose their 4s electrons first**, even though 4s filled before 3d. Fe = [Ar] 4s² 3d⁶ → Fe²⁺ = [Ar] 3d⁶ → Fe³⁺ = [Ar] 3d⁵. Neither iron ion looks like a noble gas, yet both are stable.",
            "**Zn²⁺ = [Ar] 3d¹⁰ and Ga³⁺ = [Ar] 3d¹⁰:** a full outer set ns² np⁶ nd¹⁰ (18 electrons) — sometimes called a ‘pseudo-noble-gas’ configuration.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The rule that catches people",
          text: "When an atom becomes a positive ion, it loses electrons from the **highest n first** — 4s before 3d, and for gallium 4p then 4s. Write the atom’s configuration, then remove from the outermost shell.",
        },
        {
          kind: "p",
          text: "Why does Fe³⁺ form so readily? 3d⁵ is half-filled — the same extra stability you met with chromium in Unit 1.",
        },
      ],
      checks: [
        { q: "Write the configurations of Sn, Sn²⁺ and Sn⁴⁺ (Sn = [Kr] 5s² 4d¹⁰ 5p²).", a: "Sn²⁺ = [Kr] 5s² 4d¹⁰ (loses 5p first); Sn⁴⁺ = [Kr] 4d¹⁰ (then 5s). Neither is isoelectronic with a noble gas." },
      ],
      videos: [],
    },
    {
      id: "u2a-6-ionic-properties",
      title: "Properties of ionic compounds — and why",
      book_ref: "2.2 · p. 78–82 (experiments)",
      big_idea: "Every ionic property comes from strong attractions between fixed, charged ions in a lattice.",
      body: [
        {
          kind: "table",
          head: ["Property", "Reason"],
          rows: [
            ["High melting points", "Strong attractions between ions in every direction must be overcome"],
            ["Hard but brittle", "A blow shifts a layer; like charges line up, repel, and the crystal cracks"],
            ["Don’t conduct as solids", "Ions are locked in place — nothing can move"],
            ["Conduct when molten or dissolved", "Ions are free to move and carry charge"],
            ["Often soluble in water, not in non-polar solvents", "Polar water molecules surround and pull ions out of the lattice"],
          ],
        },
        {
          kind: "callout",
          tone: "idea",
          text: "This is exactly what the book’s experiments (PbI₂, NaCl, CuCl₂) are designed to show: the solid doesn’t conduct, the melt and the solution do.",
        },
      ],
      checks: [
        { q: "Why does solid NaCl not conduct electricity, but molten NaCl does?", a: "Conduction needs moving charges. In the solid, the ions are fixed in the lattice; when molten, they can move." },
      ],
      videos: [yt("zpaHPXVR8WU", "What are Ionic Bonds? Properties of Matter", "FuseSchool", 3)],
    },
  ],
};

/* ======================================================================== */
/*  B — Covalent bonds, shapes and forces between molecules (2.3)           */
/* ======================================================================== */

const covalent = {
  id: "chem-g11-u2-covalent",
  subject_id: "chemistry",
  unit: "Unit 2 · Part B",
  title: "Covalent bonds, molecular shapes and intermolecular forces",
  source: "Textbook section 2.3 (pages 83–110)",
  exam_date: null,
  sort_order: 4,
  intro:
    "Two non-metals both want electrons, so neither gives — they **share**. Part B follows one chain of reasoning: draw the **Lewis structure** → count electron groups to get the **shape** (VSEPR) → combine shape and bond polarity to see whether the molecule is **polar** → polarity decides the **forces between molecules** → those forces decide boiling point, melting point and solubility. Learn the chain and you can answer questions you have never seen.",
  sections: [
    {
      id: "u2b-1-covalent-bond",
      title: "What a covalent bond is",
      book_ref: "2.3 · p. 83–85",
      big_idea: "A shared pair of electrons is attracted to both nuclei at once — that shared attraction is the bond.",
      body: [
        {
          kind: "p",
          text: "As two H atoms approach, each nucleus attracts **both** electrons. Nuclei repel each other and electrons repel each other, but at the right distance the attractions win. The energy is lowest at **74 pm** — the H–H **bond length**.",
        },
        {
          kind: "bullets",
          items: [
            "Too far apart: little attraction, no bond.",
            "Too close: the nuclei repel strongly, energy shoots up.",
            "At the bond length: maximum net attraction, lowest energy, most stable.",
          ],
        },
        {
          kind: "table",
          head: ["Bond", "Shared pairs", "Example"],
          rows: [
            ["Single", "1", "H–H, F–F"],
            ["Double", "2", "O=O"],
            ["Triple", "3", "N≡N"],
          ],
        },
        {
          kind: "p",
          text: "Shared pairs are **bonding pairs**; pairs that stay on one atom are **lone pairs** (non-bonding pairs). More shared pairs → shorter, stronger bond.",
        },
      ],
      checks: [
        { q: "Why doesn’t hydrogen form an ionic bond by losing its electron?", a: "Its ionization energy is high and H⁺ would be a bare proton; sharing gives it the stable 1s² arrangement without that cost." },
      ],
      videos: [],
    },
    {
      id: "u2b-2-lewis",
      title: "Drawing Lewis structures in four steps",
      book_ref: "2.3 · p. 86–89",
      big_idea: "Count all valence electrons, connect the atoms, complete the outer atoms, then fix the centre with multiple bonds.",
      body: [
        {
          kind: "steps",
          items: [
            "**Count valence electrons** for all atoms. Add one per negative charge; subtract one per positive charge.",
            "**Skeleton:** the least electronegative atom goes in the centre (never H — it is always on the outside). Connect with single bonds.",
            "**Complete octets on the outer atoms** with lone pairs. Put any leftover electrons on the central atom.",
            "**Central atom short of 8?** Move a lone pair from an outer atom into a double (or triple) bond.",
          ],
        },
        {
          kind: "example",
          title: "NF₃ (book example 2.2)",
          steps: ["Electrons: 5 + 3 × 7 = 26.", "N in the centre, three N–F bonds (6 electrons used).", "Each F gets 3 lone pairs (18 more → 24). The last 2 go on N as a lone pair."],
          answer: "N has 3 bonds + 1 lone pair; every atom has an octet.",
        },
        {
          kind: "example",
          title: "Carbonate ion, CO₃²⁻ (book example 2.3)",
          steps: ["Electrons: 4 + 3 × 6 + 2 = 24.", "C in the centre with three C–O bonds; complete each O → all 24 used.", "C has only 6 electrons, so move one O lone pair into a C=O double bond."],
          answer: "One C=O and two C–O, with brackets and a 2− charge on the whole ion.",
        },
        {
          kind: "callout",
          tone: "warn",
          text: "Always **check your total** at the end: the electrons drawn must equal the number you counted in step 1. Most wrong Lewis structures have the wrong number of electrons.",
        },
      ],
      checks: [
        { q: "How many valence electrons are in the NH₄⁺ ion?", a: "5 + 4 × 1 − 1 = 8." },
        { q: "Draw (describe) the Lewis structure of CO₂.", a: "16 electrons: O=C=O with two lone pairs on each O; carbon has two double bonds and no lone pairs." },
      ],
      videos: [yt("1ZlnzyHahvo", "How to Draw Lewis Structures: Five Easy Steps", "Wayne Breslyn", 6)],
    },
    {
      id: "u2b-3-coordinate-resonance",
      title: "Coordinate bonds and resonance",
      book_ref: "2.3 · p. 90–92",
      big_idea: "A coordinate bond has both shared electrons from one atom; resonance means the real molecule is a blend of several drawings.",
      body: [
        { kind: "heading", text: "Coordinate (dative) covalent bonds" },
        {
          kind: "p",
          text: "Usually each atom gives one electron to a bond. In a **coordinate bond**, one atom gives **both** — a lone pair — to an atom with an empty orbital. NH₃ + H⁺ → NH₄⁺: nitrogen’s lone pair bonds to the bare H⁺. Once formed, it is identical to the other N–H bonds.",
        },
        {
          kind: "p",
          text: "Examples: NH₄⁺, H₃O⁺ (water’s lone pair + H⁺), AlCl₄⁻ (Cl⁻ donates to AlCl₃), and the addition compound H₃N→BCl₃ (NH₃’s lone pair fills boron’s empty orbital).",
        },
        {
          kind: "callout",
          tone: "book",
          title: "Correction to the book’s list",
          text: "The book lists **NH₃** and **BCl₃** as containing coordinate bonds. On their own they don’t: NH₃ is the *donor* and BCl₃ the *acceptor*. The coordinate bond only appears when they **combine**: H₃N→BCl₃.",
        },
        { kind: "heading", text: "Resonance" },
        {
          kind: "p",
          text: "Ozone (O₃) can be drawn with the double bond on the left **or** on the right. But measurements show both O–O bonds are **identical** (1.278 Å), halfway between single and double. Neither drawing is the real molecule: the real one is a **resonance hybrid**, an average of both. The electrons are **delocalized** — spread over both bonds.",
        },
        {
          kind: "callout",
          tone: "warn",
          text: "The ↔ arrow does **not** mean the molecule flips back and forth. There is one ozone molecule, all the time, with two 1½ bonds. Same for NO₂⁻ and CO₃²⁻.",
        },
      ],
      checks: [
        { q: "How is a coordinate bond different from an ordinary covalent bond once formed?", a: "It isn’t — only its origin differs (both electrons came from one atom). In NH₄⁺ all four N–H bonds are identical." },
        { q: "Why do we need resonance structures for O₃?", a: "Both O–O bonds are identical in length, but no single Lewis structure shows that; the real molecule is the average of the two drawings." },
      ],
      videos: [yt("9B5FGPDwX_E", "Resonance Structures, Basic Introduction", "The Organic Chemistry Tutor", 11)],
    },
    {
      id: "u2b-4-octet-exceptions",
      title: "Covalent molecules that break the octet rule",
      book_ref: "2.3 · p. 93–94",
      big_idea: "Some central atoms have fewer than 8, some have more than 8, and some molecules have an odd number of electrons.",
      body: [
        {
          kind: "table",
          head: ["Type", "Examples", "Why"],
          rows: [
            ["Fewer than 8", "BeCl₂ (4), BF₃ (6), AlCl₃ (6)", "Be, B, Al have only 2–3 valence electrons to share"],
            ["More than 8 (expanded)", "PCl₅ (10), SF₆ (12), XeF₄ (12)", "Period 3 and below: bigger atoms with empty d orbitals"],
            ["Odd number", "NO (11), NO₂ (17), ClO₂ (19)", "One electron must be unpaired (a free radical)"],
          ],
        },
        {
          kind: "callout",
          tone: "idea",
          text: "**Why can’t nitrogen make NCl₅ when phosphorus makes PCl₅?** Nitrogen is in period 2: it has no d orbitals and is too small to fit five atoms around it. Only period-3-and-below atoms can expand their octet.",
        },
        {
          kind: "p",
          text: "Electron-deficient molecules like BF₃ grab a lone pair when they can: BF₃ + F⁻ → BF₄⁻ (a coordinate bond completes boron’s octet).",
        },
      ],
      checks: [
        { q: "In PCl₃, PCl₅, OF₂, BF₃ and SiF₄, which central atoms do NOT obey the octet rule?", a: "P in PCl₅ (10 electrons) and B in BF₃ (6). The others have exactly 8." },
      ],
      videos: [yt("96L6_IwyHRM", "Exceptions To The Octet Rule", "The Organic Chemistry Tutor", 13)],
    },
    {
      id: "u2b-5-vsepr",
      title: "VSEPR: predicting the shape of a molecule",
      book_ref: "2.3 · p. 99–103",
      big_idea: "Electron groups around the central atom push as far apart as possible; lone pairs push hardest.",
      body: [
        {
          kind: "steps",
          items: [
            "Draw the Lewis structure.",
            "Count **electron groups** on the central atom: each bond (single, double or triple counts as **one**) plus each lone pair.",
            "The number of groups gives the **arrangement**; the number of **atoms** gives the **shape**.",
            "Lone pairs squeeze bond angles: **lone–lone > lone–bond > bond–bond** repulsion.",
          ],
        },
        {
          kind: "table",
          head: ["Groups", "Lone pairs", "Shape (example)", "Angle"],
          rows: [
            ["2", "0", "Linear (BeCl₂, CO₂)", "180°"],
            ["3", "0", "Trigonal planar (BF₃)", "120°"],
            ["3", "1", "Bent (SO₂)", "< 120°"],
            ["4", "0", "Tetrahedral (CH₄)", "109.5°"],
            ["4", "1", "Trigonal pyramidal (NH₃)", "107°"],
            ["4", "2", "Bent (H₂O)", "104.5°"],
            ["5", "0", "Trigonal bipyramidal (PCl₅)", "90°, 120°"],
            ["5", "1", "Seesaw (SF₄)", "—"],
            ["6", "0", "Octahedral (SF₆)", "90°"],
            ["6", "1", "Square pyramidal (IF₅)", "≈ 90°"],
            ["6", "2", "Square planar (XeF₄)", "90°"],
          ],
        },
        {
          kind: "callout",
          tone: "idea",
          title: "Why the angles shrink",
          text: "CH₄, NH₃ and H₂O all have 4 electron groups — a tetrahedral **arrangement**. But each lone pair takes up more room than a bond, so the angle drops: **109.5° → 107° → 104.5°** as lone pairs go 0 → 1 → 2.",
        },
        {
          kind: "p",
          text: "Why is SF₄’s lone pair in the middle ring (equatorial), not at the top? There it has only two neighbours at 90° instead of three — less repulsion.",
        },
      ],
      checks: [
        { q: "Predict the shape of PF₃.", a: "P has 3 bonds + 1 lone pair = 4 groups → trigonal pyramidal (like NH₃)." },
        { q: "CO₂ has two double bonds. How many electron groups does carbon have, and what is the shape?", a: "Two (each double bond counts as one group), so it is linear, 180°." },
      ],
      videos: [yt("Q9-JjyAEqnU", "VSEPR Theory and Molecular Geometry", "Professor Dave Explains", 7)],
    },
    {
      id: "u2b-6-polarity",
      title: "Polar bonds and polar molecules",
      book_ref: "2.3 · p. 103–106",
      big_idea: "A molecule is polar only if its bond dipoles don’t cancel — and whether they cancel depends on its shape.",
      body: [
        {
          kind: "p",
          text: "In a bond between different atoms, the more **electronegative** atom pulls the shared electrons closer and gets a partial negative charge (δ−); the other gets δ+. That is a **polar bond**. Identical atoms (H₂, Cl₂) share equally — **non-polar**.",
        },
        {
          kind: "p",
          text: "A **dipole moment** (μ, in debye D) measures how unevenly charge is spread across the whole molecule. μ = 0 means non-polar.",
        },
        {
          kind: "table",
          head: ["Molecule", "Bonds", "Shape", "Result"],
          rows: [
            ["CO₂", "Polar C=O", "Linear — pulls opposite", "Cancel → non-polar (μ = 0)"],
            ["H₂O", "Polar O–H", "Bent — pulls don’t oppose", "Polar (μ = 1.87 D)"],
            ["CCl₄", "Polar C–Cl", "Tetrahedral, all the same", "Cancel → non-polar"],
            ["CHCl₃", "One C–H swapped in", "Tetrahedral, unbalanced", "Polar"],
          ],
        },
        {
          kind: "callout",
          tone: "idea",
          title: "Think of it as a tug-of-war",
          text: "Each polar bond is a rope pulling toward its negative end. If identical ropes pull in perfectly opposite or symmetric directions, nothing moves (non-polar). If the shape is lopsided, there is a net pull (polar).",
        },
        {
          kind: "p",
          text: "cis-1,2-dichloroethene (both Cl on the same side) is polar, μ = 1.89 D; trans (opposite sides) is non-polar, μ = 0 — same atoms, different arrangement.",
        },
        {
          kind: "callout",
          tone: "book",
          text: "The book calls cis- and trans-dichloroethene ‘constitutional isomers’. They are **geometric (cis–trans) isomers**: same atoms bonded in the same order, arranged differently in space.",
        },
      ],
      checks: [
        { q: "Is NH₃ polar? Explain.", a: "Yes. The N–H bonds are polar and the pyramidal shape (with a lone pair on top) means their pulls don’t cancel." },
        { q: "Water’s dipole moment is 1.87 D. Why does this prove water is bent?", a: "If it were linear like CO₂, the two O–H dipoles would cancel to zero. A non-zero dipole means they don’t cancel, so the molecule must be bent." },
      ],
      videos: [yt("ds5HXmBkO0Y", "Bond Polarity, Electronegativity and Dipole Moment", "The Organic Chemistry Tutor", 11)],
    },
    {
      id: "u2b-7-imf",
      title: "Forces between molecules",
      book_ref: "2.3 · p. 107–110",
      big_idea: "Intermolecular forces are weak attractions BETWEEN molecules; they decide boiling and melting points.",
      body: [
        {
          kind: "callout",
          tone: "warn",
          title: "Don’t mix these up",
          text: "**Intra**molecular = the covalent bonds **inside** a molecule (strong). **Inter**molecular = attractions **between** molecules (weak). Boiling water separates the molecules (intermolecular); it does **not** break O–H bonds.",
        },
        {
          kind: "table",
          head: ["Force", "Between", "Strength"],
          rows: [
            ["London (dispersion)", "All molecules — temporary dipoles", "Weakest per contact; grows with size"],
            ["Dipole–dipole", "Polar molecules — δ+ attracts δ−", "Medium"],
            ["Hydrogen bond", "H on N, O or F … lone pair on N, O or F", "Strongest of the three"],
          ],
        },
        {
          kind: "bullets",
          items: [
            "**London forces** arise because electrons move: for an instant one side of a molecule has more electrons, making a temporary dipole that induces one in the neighbour. Bigger molecules (more electrons) → stronger London forces → higher boiling point.",
            "**Shape matters too:** n-pentane (long chain, more contact) boils at 36 °C; its compact isomer 2,2-dimethylpropane at 9.5 °C.",
            "**Hydrogen bonds** need H attached **directly** to N, O or F. That H is almost a bare proton, so it is strongly attracted to a lone pair on a neighbouring N, O or F.",
            "‘Van der Waals forces’ is the umbrella term for dipole–dipole and London forces.",
          ],
        },
        {
          kind: "example",
          title: "Why is H₂O a liquid but CH₄ a gas at room temperature?",
          steps: ["Both are small molecules of similar mass.", "CH₄ is non-polar: only weak London forces.", "H₂O is polar and has hydrogen bonds (O–H … O)."],
          answer: "Hydrogen bonds hold water molecules together far more strongly, so water needs much more energy to boil.",
        },
        {
          kind: "p",
          text: "Ice floats because hydrogen bonds lock the molecules into an open hexagonal pattern that takes up **more** space than liquid water. One water molecule can form up to **4** hydrogen bonds (2 through its H atoms, 2 through its lone pairs).",
        },
      ],
      checks: [
        { q: "Which has the higher boiling point, cis- or trans-1,2-dichloroethene? Why?", a: "cis. It is polar, so it has dipole–dipole forces in addition to London forces; trans is non-polar." },
        { q: "Can CH₄ form hydrogen bonds? Why or why not?", a: "No. Its hydrogens are bonded to carbon, not to N, O or F." },
      ],
      videos: [yt("XSRa9P-xJl0", "Intermolecular Forces — Hydrogen Bonding, Dipole Dipole, London", "The Organic Chemistry Tutor", 11)],
    },
    {
      id: "u2b-8-covalent-properties",
      title: "Properties of covalent (molecular) substances",
      book_ref: "2.3 · p. 96–99",
      big_idea: "Strong bonds inside the molecules, weak forces between them — so they melt and boil easily.",
      body: [
        {
          kind: "table",
          head: ["Property", "Reason"],
          rows: [
            ["Low melting and boiling points; often gases or liquids", "Only weak intermolecular forces hold the molecules together"],
            ["Don’t conduct, even when melted", "Neutral molecules — no ions or free electrons"],
            ["Usually dissolve in non-polar solvents", "‘Like dissolves like’: similar intermolecular forces mix"],
            ["Polar ones (ethanol, sugar, NH₃) can dissolve in water", "They hydrogen-bond or dipole-bond with water"],
          ],
        },
        {
          kind: "p",
          text: "That last row is why NH₃ dissolves in water while CH₄ doesn’t: NH₃ hydrogen-bonds with water; CH₄ can’t.",
        },
      ],
      checks: [
        { q: "Why doesn’t molten sugar or liquid methane conduct electricity, when molten salt does?", a: "They are made of neutral molecules; there are no ions or free electrons to carry charge." },
      ],
      videos: [],
    },
  ],
};

/* ======================================================================== */
/*  C — Metallic bonding, bonding theories and crystals (2.4–2.6)          */
/* ======================================================================== */

const theories = {
  id: "chem-g11-u2-theories",
  subject_id: "chemistry",
  unit: "Unit 2 · Part C",
  title: "Metallic bonding, bonding theories and crystals",
  source: "Textbook sections 2.4–2.6 and the review exercise (pages 111–143)",
  exam_date: null,
  sort_order: 5,
  intro:
    "Lewis dots and VSEPR tell you *what* shape a molecule has, but not *why* bonds form where they do. Part C gives two deeper pictures: **valence bond theory** (orbitals overlap; hybrid orbitals explain the angles) and **molecular orbital theory** (electrons spread over the whole molecule — the only model that explains why O₂ is magnetic). It opens with metallic bonding and finishes by sorting every solid into four crystal types.",
  sections: [
    {
      id: "u2c-1-metallic",
      title: "Metallic bonding: the electron sea",
      book_ref: "2.4 · p. 111–113",
      big_idea: "Metal ions sit in a ‘sea’ of shared, free-moving valence electrons — and that sea explains every metal property.",
      body: [
        {
          kind: "p",
          text: "Each metal atom releases its valence electrons into a pool shared by the whole piece. What’s left is a regular array of **positive metal ions** in a **sea of delocalized electrons**. The bond is the attraction between the ions and the sea.",
        },
        {
          kind: "table",
          head: ["Property", "Why"],
          rows: [
            ["Conduct electricity and heat, even solid", "The electrons move freely through the metal"],
            ["Malleable and ductile", "Layers of ions can slide; the electron sea moves with them, so nothing breaks"],
            ["Shiny", "Free electrons reflect light"],
            ["High boiling points", "Each ion must be torn away from the electron sea"],
          ],
        },
        {
          kind: "callout",
          tone: "idea",
          title: "Metal vs ionic solid under a hammer",
          text: "Hit an ionic crystal and like charges line up and repel: it **shatters**. Hit a metal and the layers slide while the electron sea keeps holding them: it **bends**.",
        },
        {
          kind: "example",
          title: "The book’s activity — explain the numbers",
          steps: [
            "Li melts at 180 °C but boils at 1317 °C: melting only loosens the array; boiling must pull each ion out of the electron sea.",
            "Be melts at 1287 °C, Li at 180 °C: Be gives 2 electrons to the sea and forms a smaller 2+ ion — much stronger attraction.",
            "Na melts at 98 °C, K at 63 °C: K⁺ is bigger, so the sea is farther from its centre and attraction is weaker.",
          ],
          answer: "More delocalized electrons, higher ion charge and smaller ions → stronger metallic bonding.",
        },
        {
          kind: "callout",
          tone: "book",
          text: "The book gives sodium’s melting point as 89 °C in one place; the accepted value is about **98 °C**. The comparison with potassium (63 °C) works either way.",
        },
      ],
      checks: [
        { q: "Why are Group 2 metals harder and higher-melting than Group 1 metals?", a: "They contribute two electrons each to the electron sea and form 2+ ions, so the attraction between ions and electrons is stronger." },
      ],
      videos: [yt("S08qdOTd0w0", "What Are Metallic Bonds? Properties of Matter", "FuseSchool", 4)],
    },
    {
      id: "u2c-2-vb-sigma-pi",
      title: "Valence bond theory: overlap, σ and π bonds",
      book_ref: "2.5 · p. 114–118",
      big_idea: "A covalent bond forms where two half-filled orbitals overlap; head-on overlap gives σ, side-by-side gives π.",
      body: [
        {
          kind: "p",
          text: "Valence bond theory says: a bond forms when an orbital from each atom **overlaps**, and the overlap region holds a pair of electrons with opposite spins. More overlap → stronger bond.",
        },
        {
          kind: "table",
          head: ["", "Sigma (σ)", "Pi (π)"],
          rows: [
            ["Overlap", "Head-on, along the line between nuclei", "Side-by-side, above and below that line"],
            ["Formed from", "s–s, s–p, p–p (end-on), hybrids", "Only parallel p orbitals"],
            ["Strength", "Stronger (more overlap)", "Weaker"],
            ["Rotation", "Free", "Prevents rotation"],
          ],
        },
        {
          kind: "callout",
          tone: "idea",
          title: "Counting σ and π",
          text: "**Single = 1σ · Double = 1σ + 1π · Triple = 1σ + 2π.** Every bond starts with exactly one σ; extra pairs are π. Bonds involving an s orbital are always σ.",
        },
      ],
      checks: [
        { q: "True or false: a double bond consists of two σ bonds.", a: "False. A double bond is one σ and one π." },
        { q: "How many σ and π bonds are in N₂?", a: "N≡N: one σ and two π." },
      ],
      videos: [yt("pT8nrBrTOm4", "Sigma and Pi Bonds Explained", "The Organic Chemistry Tutor", 6)],
    },
    {
      id: "u2c-3-hybridization",
      title: "Hybridization: sp, sp² and sp³",
      book_ref: "2.5 · p. 119–123",
      big_idea: "An atom mixes its s and p orbitals into identical hybrid orbitals that point toward the corners of the VSEPR shape.",
      body: [
        {
          kind: "p",
          text: "**The puzzle:** ground-state carbon (2s² 2p²) has only 2 unpaired electrons, so it ‘should’ form CH₂. But it forms **CH₄**, with four identical bonds at 109.5°. Hybridization explains it: one 2s electron is promoted to 2p (4 unpaired), then the 2s and three 2p orbitals **mix** into four identical **sp³** orbitals.",
        },
        {
          kind: "table",
          head: ["Hybrid", "Mixes", "Geometry, angle", "Example"],
          rows: [
            ["sp", "1 s + 1 p", "Linear, 180°", "BeCl₂"],
            ["sp²", "1 s + 2 p", "Trigonal planar, 120°", "BCl₃"],
            ["sp³", "1 s + 3 p", "Tetrahedral, 109.5°", "CH₄"],
          ],
        },
        {
          kind: "callout",
          tone: "idea",
          title: "Shortcut",
          text: "**Number of hybrid orbitals = number of electron groups on the atom.** 2 groups → sp, 3 → sp², 4 → sp³. Count groups exactly as in VSEPR.",
        },
        {
          kind: "p",
          text: "**NH₃ and H₂O are sp³ too** — they have 4 electron groups. One (NH₃) or two (H₂O) hybrid orbitals hold lone pairs, which squeeze the angle to 107° and 104.5°.",
        },
        {
          kind: "p",
          text: "s-character: sp = 50%, sp² = 33%, sp³ = 25% (one s out of 2, 3 or 4 orbitals mixed).",
        },
      ],
      checks: [
        { q: "What is the hybridization of N in NH₃?", a: "sp³: 3 bonds + 1 lone pair = 4 electron groups." },
        { q: "Why is the H–O–H angle smaller than the H–N–H angle?", a: "Both atoms are sp³, but O has two lone pairs and N only one. More lone-pair repulsion squeezes the bonds closer together." },
      ],
      videos: [yt("pdJeQUd2g_4", "Hybridization of Atomic Orbitals — Sigma & Pi Bonds — sp sp2 sp3", "The Organic Chemistry Tutor", 11)],
    },
    {
      id: "u2c-4-d-hybrids",
      title: "Hybrids with d orbitals: sp³d and sp³d²",
      book_ref: "2.5 · p. 123–127",
      big_idea: "Period-3-and-below atoms can mix in d orbitals to make 5 or 6 hybrids — matching 5 or 6 electron groups.",
      body: [
        {
          kind: "table",
          head: ["Groups", "Hybrid", "Arrangement", "Example"],
          rows: [
            ["5", "sp³d", "Trigonal bipyramidal", "PCl₅"],
            ["6", "sp³d²", "Octahedral", "SF₆, IF₅"],
          ],
        },
        {
          kind: "bullets",
          items: [
            "**PCl₅:** 3 equatorial bonds at 120° and 2 axial at 90° to that plane. The axial bonds feel more repulsion, so they are slightly longer and weaker.",
            "**SF₆:** six identical S–F bonds pointing to the corners of an octahedron.",
            "**IF₅:** six groups (5 bonds + 1 lone pair) → sp³d² → square pyramidal.",
          ],
        },
        {
          kind: "steps",
          items: [
            "Draw a reasonable Lewis structure.",
            "Use VSEPR to get the electron-group arrangement.",
            "Pick the hybrid with the same number of orbitals as groups.",
            "Describe what each hybrid overlaps with.",
          ],
        },
      ],
      checks: [{ q: "Give the hybridization and shape of XeF₄ (4 bonds, 2 lone pairs on Xe).", a: "6 groups → sp³d²; with 2 lone pairs opposite each other the shape is square planar." }],
      videos: [],
    },
    {
      id: "u2c-5-multiple-bonds",
      title: "Hybridization in double and triple bonds",
      book_ref: "2.5 · p. 128–130",
      big_idea: "Hybrid orbitals make the σ bonds; the leftover, unhybridized p orbitals make the π bonds.",
      body: [
        {
          kind: "table",
          head: ["Molecule", "C hybrid", "Shape", "Bonds"],
          rows: [
            ["Ethane C₂H₆", "sp³", "Tetrahedral at each C", "7 σ"],
            ["Ethene C₂H₄", "sp²", "Planar, 120°", "5 σ + 1 π"],
            ["Ethyne C₂H₂", "sp", "Linear, 180°", "3 σ + 2 π"],
          ],
        },
        {
          kind: "p",
          text: "In **ethene**, each carbon uses three sp² hybrids for σ bonds (two to H, one to the other C). Its one leftover p orbital stands perpendicular to the plane; the two leftover p orbitals overlap side-by-side to form the **π bond**. That is why all six atoms lie flat.",
        },
        {
          kind: "callout",
          tone: "idea",
          title: "Why there’s no rotation about a double bond",
          text: "Twisting one carbon would turn its p orbital away from the other one and break the π overlap. A single (σ) bond is symmetric around the axis, so it can spin freely.",
        },
      ],
      checks: [{ q: "How many σ and π bonds are in ethyne, H–C≡C–H?", a: "3 σ (two C–H, one C–C) and 2 π (in the triple bond)." }],
      videos: [],
    },
    {
      id: "u2c-6-mo-theory",
      title: "Molecular orbital theory and bond order",
      book_ref: "2.5 · p. 131–132",
      big_idea: "Atomic orbitals combine into bonding MOs (lower energy) and antibonding MOs (higher energy); bond order = (bonding − antibonding) ÷ 2.",
      body: [
        {
          kind: "p",
          text: "MO theory treats the molecule as one unit. **Two atomic orbitals always make two molecular orbitals**: a **bonding** MO (electron density between the nuclei — lower energy, holds atoms together) and an **antibonding** MO, marked ∗ (a node between the nuclei — higher energy, pushes atoms apart).",
        },
        { kind: "formula", text: "Bond order = ½ (electrons in bonding MOs − electrons in antibonding MOs)" },
        {
          kind: "table",
          head: ["Species", "Configuration", "Bond order", "Exists?"],
          rows: [
            ["H₂", "(σ1s)²", "1", "Yes"],
            ["H₂⁺", "(σ1s)¹", "½", "Yes"],
            ["He₂⁺", "(σ1s)² (σ∗1s)¹", "½", "Yes (observed)"],
            ["He₂", "(σ1s)² (σ∗1s)²", "0", "No"],
            ["Li₂", "(σ1s)² (σ∗1s)² (σ2s)²", "1", "Yes"],
          ],
        },
        {
          kind: "callout",
          tone: "idea",
          text: "**Bond order > 0 → the molecule can exist; 0 → it falls apart.** Higher bond order → stronger, shorter bond. He₂ doesn’t exist because its antibonding electrons cancel its bonding ones exactly.",
        },
      ],
      checks: [{ q: "Why does He₂ not exist but He₂⁺ does?", a: "He₂ has 2 bonding and 2 antibonding electrons (bond order 0). He₂⁺ has 2 bonding and 1 antibonding (bond order ½), so there is a net bond." }],
      videos: [yt("6tB6E6R_XpQ", "Molecular Orbital Theory — Bonding & Antibonding MO — Bond Order", "The Organic Chemistry Tutor", 22)],
    },
    {
      id: "u2c-7-mo-diatomics",
      title: "MO diagrams for N₂, O₂ and F₂ — and why O₂ is magnetic",
      book_ref: "2.5 · p. 133–134",
      big_idea: "Fill MOs like atomic orbitals (Aufbau, Pauli, Hund); unpaired electrons make a molecule paramagnetic.",
      body: [
        {
          kind: "table",
          head: ["Total electrons", "Order of filling"],
          rows: [
            ["14 or fewer (up to N₂)", "σ1s σ∗1s σ2s σ∗2s **π2p** σ2p π∗2p σ∗2p"],
            ["More than 14 (O₂, F₂)", "σ1s σ∗1s σ2s σ∗2s **σ2p** π2p π∗2p σ∗2p"],
          ],
        },
        {
          kind: "p",
          text: "The only difference is whether **π2p or σ2p** comes first. The two π2p orbitals have equal energy (degenerate), and so do the two π∗2p orbitals.",
        },
        {
          kind: "table",
          head: ["Molecule", "Bond order", "Unpaired e⁻", "Magnetism"],
          rows: [
            ["N₂", "3", "0", "Diamagnetic"],
            ["O₂", "2", "2 (in π∗)", "Paramagnetic"],
            ["F₂", "1", "0", "Diamagnetic"],
          ],
        },
        {
          kind: "example",
          title: "O₂, 16 electrons",
          steps: [
            "Fill: σ1s² σ∗1s² σ2s² σ∗2s² σ2p² π2p⁴ — that uses 14.",
            "The last 2 go into the two π∗2p orbitals — **one each, same spin** (Hund’s rule).",
            "Bonding = 2 + 2 + 2 + 4 = 10; antibonding = 2 + 2 + 2 = 6; bond order = (10 − 6)/2.",
          ],
          answer: "Bond order 2 (a double bond) with 2 unpaired electrons → paramagnetic.",
        },
        {
          kind: "callout",
          tone: "idea",
          title: "Why MO theory wins here",
          text: "The Lewis structure O=O shows every electron paired, so it predicts O₂ is **not** magnetic. But liquid oxygen sticks to a magnet. Only MO theory, with its two unpaired π∗ electrons, explains this.",
        },
        {
          kind: "p",
          text: "**Paramagnetic** = has unpaired electrons, attracted to a magnet. **Diamagnetic** = all paired, slightly repelled.",
        },
      ],
      checks: [
        { q: "Find the bond order of O₂⁺ and say whether it is stronger than O₂.", a: "Remove one π∗ electron: (10 − 5)/2 = 2.5. Higher than O₂’s 2, so the bond is stronger and shorter." },
        { q: "Which would VB/Lewis theory get wrong about O₂?", a: "Its magnetism. The Lewis structure has all electrons paired, but O₂ is paramagnetic because of two unpaired π∗ electrons." },
      ],
      videos: [yt("nTujP4jCbsg", "Valence Bond Theory, Hybrid Orbitals, and Molecular Orbital Theory", "Professor Dave Explains", 8)],
    },
    {
      id: "u2c-8-crystals",
      title: "Four types of crystalline solid",
      book_ref: "2.6 · p. 135–139",
      big_idea: "What the particles are and what holds them together decides how a solid behaves.",
      body: [
        {
          kind: "p",
          text: "A **crystalline** solid has particles in a regular, repeating 3-D pattern (salt, sugar, metals) and melts at a sharp temperature. An **amorphous** solid (glass, butter) is disordered and softens over a range.",
        },
        {
          kind: "table",
          head: ["Type", "Particles and force", "Typical properties"],
          rows: [
            ["Ionic (NaCl)", "Ions, ionic bonds", "Hard, brittle, high mp; conducts only melted or dissolved"],
            ["Molecular (ice, I₂, sugar)", "Molecules, intermolecular forces", "Soft, low mp, non-conductors"],
            ["Covalent network (diamond, SiO₂)", "Atoms, covalent bonds throughout", "Very hard, very high mp; usually non-conductors"],
            ["Metallic (Cu, Fe)", "Metal ions in electron sea", "Shiny, malleable, conduct; mp varies"],
          ],
        },
        {
          kind: "callout",
          tone: "idea",
          title: "Diamond vs graphite — same atoms, different networks",
          text: "Diamond: every C bonded to 4 others in 3-D — the hardest natural substance, no free electrons, doesn’t conduct. Graphite: C bonded to 3 others in flat sheets with one electron per atom delocalized — the sheets slide (soft, slippery) and it **conducts**.",
        },
        {
          kind: "example",
          title: "The book’s X, Y, Z exercise",
          steps: [
            "X — brittle, white, mp 800 °C, conducts only if melted/dissolved, soluble → **ionic**.",
            "Y — shiny, malleable, mp 1100 °C, high conductivity → **metallic**.",
            "Z — hard, colorless, mp 3550 °C, doesn’t conduct, insoluble → **covalent network**.",
          ],
          answer: "Conductivity is the fastest clue: only when molten = ionic; always = metallic; never + very high mp = network.",
        },
      ],
      checks: [{ q: "Why do molecular crystals melt at much lower temperatures than ionic or network solids?", a: "Melting a molecular solid only overcomes weak intermolecular forces; the strong bonds inside the molecules stay intact." }],
      videos: [yt("HqV5r9uJ7gY", "How to Identify Types of Solid (Ionic, Metallic, Molecular, Network)", "Conquer Chemistry", 5)],
    },
    {
      id: "u2c-9-review",
      title: "Review exercise — multiple choice, worked",
      book_ref: "Review exercise · p. 141–142",
      big_idea: "Each answer below names the idea it tests, so a wrong answer tells you which section to reread.",
      body: [
        {
          kind: "callout",
          tone: "warn",
          title: "Try first",
          text: "Answer the book’s questions 1–11 on paper before reading these.",
        },
        {
          kind: "table",
          head: ["Q", "Answer", "Why"],
          rows: [
            ["1", "c — sharing electrons", "Ionic bonds transfer electrons; sharing is covalent"],
            ["2", "d — AsF₅", "As has 10 electrons around it (expanded octet)"],
            ["3", "d — sideways p overlap", "That is the definition of a π bond"],
            ["4", "d — 4", "2 through its H atoms + 2 through its lone pairs"],
            ["5", "a — NO₃⁻", "3 groups, no lone pair → trigonal planar; the others are pyramidal"],
            ["6", "b — acetonitrile + acetone", "Both polar, no O–H/N–H to hydrogen-bond"],
            ["7", "d — no bond", "pₓ and p_y are perpendicular: no net overlap"],
            ["8", "a — pentagonal bipyramid", "7 bonding groups, no lone pairs"],
            ["9", "b — O₃", "Commonly drawn with a coordinate O→O bond"],
            ["10", "c — SiF₄", "Every atom has 8; in the others H has 2 or I has 14"],
            ["11", "c — van der Waals", "Molecules in a crystal are held by intermolecular forces"],
          ],
        },
      ],
      checks: [],
      videos: [],
    },
  ],
};

export const CHAPTERS = [ionic, covalent, theories];
