# 01 - Competency Model

## Purpose

This file defines the single merged competency model the assessment measures. It reconciles three conflicting level vocabularies into one ladder, defends the mapping from the seven spreadsheet columns to the six career-ladder levels, records which of the eight UX competencies from Travis and Hodgson the source model does not cover and what was done about each, lists every piece of content that is authored rather than sourced, and cites the external frameworks used to calibrate the result.

---

## 1. The 15 competencies in 4 clusters

Taken verbatim from sheet `En` (names) and sheet `فا` (Persian names). The `id` column is the key used everywhere in code.

| # | Cluster | id | English | Persian |
| :-- | :--- | :--- | :--- | :--- |
| 1 | Clarity & Trust | `complexity-translation` | Complexity Translation | ساده‌سازی منطق و پیچیدگی |
| 2 | Clarity & Trust | `problem-definition` | Problem Definition | تعریف مسئله |
| 3 | Clarity & Trust | `strategic-alignment` | Alignment / Strategic Alignment | هم‌سویی استراتژیک |
| 4 | Insight & Data | `product-thinking` | Product Thinking | تفکر محصولی |
| 5 | Insight & Data | `evidence-based-design` | Evidence-Based Design | طراحی مبتنی بر شواهد |
| 6 | Insight & Data | `discovery-execution` | Discovery Execution | اجرای فرایند کشف |
| 7 | Insight & Data | `solution-accountability` | Solution Accountability | مسئولیت‌پذیری در برابر راهکار |
| 8 | Consistency & Excellence | `craftsmanship` | Craftsmanship | استادی در اجرا |
| 9 | Consistency & Excellence | `system-stewardship` | System Stewardship | پاسداری از سیستم |
| 10 | Consistency & Excellence | `shipping-design` | Shipping Design | نهایی‌سازی و انتشار |
| 11 | Consistency & Excellence | `technical-velocity` | Technical Velocity | سرعت فنی و هوش مصنوعی |
| 12 | Growth & Ownership | `chapter-contribution` | Chapter Contribution | مشارکت در چپتر دیزاین |
| 13 | Growth & Ownership | `learning-growth` | Learning & Growth | یادگیری و رشد |
| 14 | Growth & Ownership | `adaptability` | Adaptability | سازگاری |
| 15 | Growth & Ownership | `mentorship` | Mentorship | مربی‌گری و انتقال دانش |

Cluster ids and Persian names:

| id | English | Persian | Competency count |
| :--- | :--- | :--- | :-- |
| `clarity-trust` | Clarity & Trust | شفافیت و اعتماد **(AUTHORED)** | 3 |
| `insight-data` | Insight & Data | بینش و داده | 4 |
| `consistency-excellence` | Consistency & Excellence | یکپارچگی و کیفیت | 4 |
| `growth-ownership` | Growth & Ownership | رشد و حس مالکیت | 4 |

**Decision:** the Persian name for the first cluster is authored. **Reason:** cell `فا!A2` in the source contains `گکهت۹ن`, which is keyboard-layout corruption, not Persian. `شفافیت و اعتماد` is the literal, natural translation of the English name the same sheet pair uses.

**Decision:** competency 3 is called `Strategic Alignment` / `هم‌سویی استراتژیک`, not `Alignment`. **Reason:** two of the three source sheets (`فا`, `Scoring`) use the longer name; only `En` shortens it, and the longer name is less ambiguous next to `strategic-alignment` behaviours that are explicitly about roadmap and organisation.

## 2. The level collision, and how it is resolved

### 2.1 What each source actually says

Three vocabularies describe the same ladder.

| Source | Level names, in column order |
| :--- | :--- |
| Sheet `En`, row 1 | Junior, Mid-Level 1, Mid-Level 2, Senior, Lead, Principal, Manager |
| Sheet `فا`, row 1 | Junior, Mid-Level, Senior, Staff, Lead, Principal, Manager |
| Sheet `Scoring`, weight table header | Junior, Mid-Level, Senior, Staff, Lead, Principal, Manager |
| `career_ladder_matrix.md` | Rising, Formed, Mature, Valiant, Heroic, Grandmaster |

The first two are not translations of each other. Column 4 holds the same behaviour in both sheets (`Experience Orchestration` / `ارکستراسیون تجربه`), but `En` calls that column **Mid-Level 2** and `فا` calls it **Senior**. Column 5 is **Senior** in `En` and **Staff** in `فا`. The `En` header row is off by one from column 4 onwards.

**Decision:** the `فا` and `Scoring` vocabulary is canonical; the `En` header row is treated as an error. **Reason, three-part:** (a) the weight table in `Scoring` is keyed to Junior / Mid-Level / Senior / Staff / Lead / Principal / Manager, so the scoring algorithm literally cannot run against the `En` labels; (b) `فا` is the product-facing language; (c) the canonical set matches the public industry pattern, where Senior is followed by Staff on the IC track, as in the [BuzzFeed Product Design Roles v2.0](https://github.com/buzzfeed/design/blob/master/product-design-roles.md) ladder of Associate, Product Designer, Senior, Staff, Principal.

### 2.2 The seven columns are not seven rungs

Sheet `Scoring`, cells K15 to O19, contains a small structural diagram that the rest of the workbook does not repeat:

```
                  Junior | Mid-level | Senior
IC Track                             |  Staff  | Principal
Management Track                     |  Lead   | Manager
```

So the seven columns are **five rungs with a fork after Senior**, not a linear seven:

```
Junior -> Mid-Level -> Senior -+-> Staff -> Principal      (IC)
                               +-> Lead  -> Manager        (Management)
```

This is the key that dissolves the 7-versus-6 problem. It is also the standard shape in public frameworks: BuzzFeed forks into 5 IC levels and 4 manager levels, [Dropbox](https://dropbox.github.io/dbx-career-framework/) into IC1 to IC7 and M3 to M7, and the practice is catalogued across dozens of published frameworks on [progression.fyi](https://progression.fyi/).

### 2.3 The mapping table

Five matrix rungs against six career-ladder levels.

| Career ladder level | Matrix rung | IC column | Management column | Weight column used | Defence |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Rising** | 1 | Junior | Junior | `Junior` | Ladder: "does basic and simple tasks independently", "work defined by following process, structure and instructions", tasks of one day to one month. Matrix Junior: "uses standard UI patterns", "Assisted Execution", "Component Adoption: uses the library 100% correctly". Both describe execution inside a defined frame. |
| **Formed** | 2 | Mid-Level | Mid-Level | `Mid-Level` | Ladder: "maintains one small coherent domain with a clear framework", "recognises unusual and complex problems and needs to research to find a solution". Matrix Mid-Level: "Assumption Testing: digs below the surface", "Independent Discovery: plans and conducts moderated interviews start to finish", "Component Creation". Both describe independence inside a bounded domain. |
| **Mature** | 3 | Senior | Senior | `Senior` | Ladder: "drives the domain strategy and its key results", "can mentor others", "plans and decides for improving or designing a domain over six months to a year". Matrix Senior: "Framing & Scoping: leads the definition of large-scale problems within their product vertical", "Post-Launch Iteration Strategy: owns the health of a full product vertical", "Direct Mentoring". The strongest match in the table: domain ownership plus mentoring, in both. |
| **Valiant** | 4 | Staff | Lead | `Staff` (IC) or `Lead` (Mgmt) | Ladder: "leads decisions and strategy that guarantee success across a large part of the organisation". Matrix Staff: "Cross-Vertical Architecture", "Meta-Problem Identification", "Ecosystem Health" (a large part of the org, reached through platforms). Matrix Lead: "Quality & Craft Mentorship", "Operational Alignment", "Chapter Health & Ritual Governance" (a large part of the org, reached through people). Same scope, two mechanisms, which is exactly the fork. |
| **Heroic** | 5 | Principal | Manager | `Principal` (IC) or `Manager` (Mgmt) | Ladder: "improves the performance of several domains with their expert knowledge", "shapes the future rounds of the organisation in one specialism or several departments". Matrix Principal: "Strategic Foresight", "keeps design two years ahead", "Pioneering New Paradigms". Matrix Manager: "Organizational Advocacy", "Organizational Design", "Strategic ROI", "Succession Planning". Both are org-wide and multi-year. |
| **Grandmaster** | none | none | none | none | Ladder: "oversees global initiatives", "sets the organisation's global vision", "strategic oversight across several global organisations", annotated *(VP of Design)*, salary ceiling open. The matrix's most senior column tops out at the Design Chapter of one company. **No matrix column describes this scope, so no mapping is asserted.** |

**Decision:** Grandmaster gets no matrix column and no invented one. **Reason:** the constraint forbids authoring behaviour where the source is silent, and the source is silent by a full step of scope, not by a detail.

### 2.4 The assessable range is Rising to Valiant

The instrument has four options per question. Four options anchor to four adjacent matrix columns. This sets a hard ceiling.

**Decision:** the assessment resolves Rising, Formed, Mature and Valiant. Heroic and Grandmaster are displayed on the result ladder as out of range, greyed, with a one-line explanation. **Reason, three-part:** (a) four options measure four rungs, and stretching them to six would mean an option gap of 1.5 rungs, which no respondent could answer honestly; (b) the career ladder defines Heroic and Grandmaster by organisational facts (improving several departments, global oversight, VP title) that a self-administered questionnaire cannot evidence and that would be trivially gameable; (c) every public framework surveyed treats the top rungs as committee-reviewed against evidence rather than self-reported. This limitation is stated on the result screen in Persian and is the honest hook for the paid mock interview in [06](06-checklist.md) and the copy in section 6 of this set.

**Decision:** the respondent picks IC or Management before starting, and the choice only changes the weight column at Valiant. **Reason:** below Valiant the two tracks share a column, so the question is a no-op there; at Valiant the Staff and Lead weight vectors differ materially (Consistency and Excellence 0.20 versus 0.10, Growth and Ownership 0.25 versus 0.35), so guessing would distort the result. One tap is cheaper than a second inference layer. If the respondent picks "not sure", the app uses IC and labels the result accordingly.

## 3. Cross-check against the eight UX competencies

Travis and Hodgson list eight core technical competencies of a UX practitioner (*Think Like a UX Researcher*, p. 288): user needs research, usability evaluation, information architecture, interaction design, visual design, technical writing, user interface prototyping, user experience leadership.

| Book competency | Covered by | Verdict | Reason |
| :--- | :--- | :--- | :--- |
| User needs research | `discovery-execution` (moderated interviews, longitudinal study), `evidence-based-design` | Covered | The matrix separates generative research execution from the epistemics of using it, which is finer-grained than the book. |
| Usability evaluation | `discovery-execution` (5-second tests, unmoderated usability tasks, tree test) | Covered | Named explicitly in the Junior, Mid-Level and Senior cells. |
| Information architecture | Nothing owns it. It appears twice, incidentally: `evidence-based-design` Mid-Level mentions "a conceptual redesign of the information architecture", `discovery-execution` Senior mentions a tree test. | **Gap, folded in** | IA is structuring information to reduce cognitive load, which is `complexity-translation`'s own stated definition. Folded in as an explicit facet with one dedicated question (SA02). |
| Interaction design | `craftsmanship` Mid-Level: "Interaction & Refinement: masters micro-interactions, states (hover, error, active)" | Covered | Named explicitly. |
| Visual design | `craftsmanship` Junior and Senior: "Visual Fundamentals", "Visual Storytelling & Polish" | Covered | Named explicitly. |
| Technical writing | Nothing owns it. It appears three times as someone else's job: `complexity-translation` Lead runs a "Jargon-Busting" session, `strategic-alignment` Manager advocates hiring a "UX Writer", `learning-growth` Junior takes a UX Writing course. | **Gap, folded in** | The matrix treats writing as a thing to negotiate or hire for, never as a craft the designer executes. Folded into `craftsmanship` as an explicit facet with one dedicated question (SA16). |
| User interface prototyping | `technical-velocity` (AI prototyping, "Vibe Coding"), `discovery-execution` (Wizard of Oz), `strategic-alignment` (Vision Prototype) | Covered, heavily | Three competencies touch it, which is arguably over-coverage rather than a gap. |
| UX leadership | `mentorship`, `chapter-contribution`, `strategic-alignment`, plus the whole Lead and Manager columns | Covered | The matrix is stronger here than the book, since it splits leadership into people, process and organisational alignment. |

**Decision:** neither gap becomes a 16th or 17th competency. **Reason:** a new competency would require authoring 7 behavioural cells each from nothing, which the constraints forbid, and would break the cluster weights, which are defined for exactly these four clusters. Folding each gap into the competency whose own source definition already contains it adds the coverage without inventing a level ladder.

**Third gap, not from the book: accessibility.** The matrix mentions it three times and always in passing (`craftsmanship` Mid-Level "accessible to diverse users", `craftsmanship` Staff "global accessibility frameworks", `mentorship` Mid-Level "why the color fails accessibility standards"). **Decision:** surface it inside `craftsmanship` through the scenario question SC07 rather than creating a competency. **Reason:** the source already places accessibility under craft, and a scenario is the honest way to measure something the source never leveled.

## 4. Everything in this project that is authored rather than sourced

Marked here once so no reader has to guess.

| Item | Where used | Status |
| :--- | :--- | :--- |
| Persian cluster name `شفافیت و اعتماد` | UI, config | AUTHORED. Source cell is corrupted. |
| The IA facet of `complexity-translation` | Question SA02 | AUTHORED facet. Behaviour derived by extension from the competency's own sourced definition, not from a new level ladder. |
| The technical-writing facet of `craftsmanship` | Question SA16 | AUTHORED facet, same basis. |
| The level-determination layer (F to level bands) | [02](02-scoring-model.md) | AUTHORED. The source has no level-determination step at all; it assumes the level is already known and scores relative to it. |
| The IC / Management track question | Onboarding | AUTHORED. The fork is sourced; asking the respondent about it is not. |
| The Valiant ceiling and the out-of-range treatment of Heroic and Grandmaster | Result screen | AUTHORED. |
| All 40 questions and 160 options | [03](03-question-bank.md) | AUTHORED wording, sourced behaviour. Each option is a first-person or situational rewrite of a specific matrix cell, generalised out of the source company's domain. The mapping is given per option in 03. |
| Result screen copy and the call to action | [05](05-build-plan.md) | AUTHORED. |
| The divergence threshold and its explanation copy | [02](02-scoring-model.md) | AUTHORED, derived from the band geometry, justified against external literature in section 5. |

**Decision:** every option is generalised out of the source company's domain. **Reason:** the source matrix is saturated with that company's product and domain specifics, down to named products and pricing mechanics. A public tool that asked those questions would only be answerable by that company's designers. The behaviour is preserved; the domain is removed.

**Note on cells with no source:** the spreadsheet was checked programmatically for empty cells across all 15 competencies and all 7 levels in both the `En` and `فا` sheets. There are none. The matrix is complete, so no behavioural cell had to be authored to fill a hole. The only authored behaviour is the two folded facets above.

## 5. External sources and what each contributed

| Source | What it contributed |
| :--- | :--- |
| [BuzzFeed, Product Design Roles v2.0](https://github.com/buzzfeed/design/blob/master/product-design-roles.md) | Confirmed the Senior to Staff to Principal IC sequence and the separate manager sequence, which validated reading the `Scoring` sheet's fork as an IC/Management split rather than a linear ladder. Its Associate-level line, "work with guidance while actively seeking mentorship", calibrated the Rising anchors. |
| [Dropbox Engineering Career Framework](https://dropbox.github.io/dbx-career-framework/) | Level expectations defined as scope, collaborative reach and levers for impact. This is the axis the career-ladder file also uses (ownership, complexity, scope), and it justified mapping the two ladders on scope rather than on job title. Also the source of the explicit warning, reproduced on the result screen, that a framework is "not a promotion checklist". |
| [NN/g, The 5 Stages of UX-Career Progression](https://www.nngroup.com/articles/stages-of-ux-career-progression/) | Novice, Contributor, Practitioner, Specialist, Visionary, with autonomy, scope and influence increasing independently. Used as a third opinion on where the Mature/Valiant boundary sits: the shift from working independently to having "a seat at the table for strategy" lands between the matrix Senior and Staff columns, which is where the career ladder also puts the Mature to Valiant step. |
| [progression.fyi](https://progression.fyi/) | The corpus of public frameworks (Intercom, Clearleft, Zendesk, dxw, Lyst and others) used to check that a 5-to-6 rung ladder with an IC/manager fork is the norm rather than an outlier. |
| [McDaniel et al., *Use of situational judgment tests to predict job performance*, J. Appl. Psych. 2001](https://pubmed.ncbi.nlm.nih.gov/11519656/) | Meta-analysis over 102 coefficients and 10,640 people, corrected validity rho = .34 for predicting job performance. This is the empirical warrant for including 10 scenario questions at all, and for weighting them equally with self-report rather than treating them as a novelty. |
| [Mabe and West, *Validity of self-evaluation of ability*, J. Appl. Psych. 1982](https://doi.org/10.1037/0021-9010.67.3.280) | Meta-analysis of 55 studies, mean r = .29 between self-evaluation and measured performance. This is the warrant for running two independent scores instead of one, and for treating a self-versus-scenario gap as the expected case rather than an error. |
| [Kruger and Dunning, *Unskilled and Unaware of It*, J. Pers. Soc. Psych. 1999](https://pubmed.ncbi.nlm.nih.gov/10626367/) | The direction of the bias: low performers overestimate, high performers slightly underestimate. This is what the two directions of the divergence explanation say in plain Persian. |
| [Behaviorally anchored rating scales](https://en.wikipedia.org/wiki/Behaviorally_anchored_rating_scales) | The reason all 160 options are concrete observable behaviours rather than agreement statements. BARS reduce halo and leniency error relative to graphic rating scales by giving raters common concrete reference points. |
