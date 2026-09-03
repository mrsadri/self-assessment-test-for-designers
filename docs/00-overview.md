# 00 - Overview

## Purpose

This file is the entry point to the documentation set for a public, open-source, static web app that assesses a product designer against a merged competency model and returns a career level, a sub-level, a competency breakdown and a salary range in Toman. It states the problem, the scope, the explicit non-goals, the source files and their authority, and how the seven documents fit together. Read this first; every other file assumes the reconciliation decisions recorded here.

---

## 1. Problem

A product designer in the Iranian market has no self-serve way to answer two linked questions: *what level am I actually at* and *what should I be paid for it*. Public levelling frameworks exist but are English, company-specific, and stop short of compensation. Internal frameworks that do include compensation are confidential.

This project turns one company's internal competency matrix plus one internal salary ladder into a public instrument: 40 questions, no login, no backend, result computed in the browser.

## 2. Scope

| In scope | Out of scope |
| :--- | :--- |
| Persian-only UI, RTL | Any other language, i18n framework |
| 40 multiple-choice questions, 4 options each | Free text, file upload, portfolio review |
| 3 modes: scenario only, self-assessment only, both | Adaptive or branching question order |
| Level + sub-level + cluster and competency breakdown | Peer or manager 360 input |
| Salary range in Toman from a versioned config | Currency conversion, live market data, negotiation advice |
| Divergence report when the two instruments disagree | Longitudinal tracking across sessions |
| Static build on GitHub Pages | Server, database, accounts, analytics on answers |

## 3. Non-goals, stated as hard constraints

1. **No server-side persistence of any answer or result.** There is no backend at all. Anything persistent is `localStorage`, opt in, and clearable from the UI.
2. **No invented salary figures.** Every number comes from `career_ladder_matrix.md` and lives in `salary.config.ts` in Toman.
3. **No invented behavioural descriptions.** Where the spreadsheet is silent, the content is either omitted or marked `AUTHORED` in [01-competency-model.md](01-competency-model.md).
4. **Not a hiring tool.** The result screen says so. Public frameworks are explicit that a levelling rubric is not a promotion checklist ([Dropbox Engineering Career Framework](https://dropbox.github.io/dbx-career-framework/)), and this instrument is weaker than a rubric because it is self-administered.

## 4. Source files and their authority

| File | Authoritative for | Not authoritative for |
| :--- | :--- | :--- |
| The source competency workbook (private, not in this repository), sheet `En` | English competency and cluster names, behavioural text per level | Level names (its header row conflicts with the other two sheets, see 01) |
| same, sheet `فا` | Persian competency and cluster names, Persian behavioural text | The cluster name for Clarity and Trust (the cell is corrupted) |
| same, sheet `Scoring` | Cluster weights per level, the 1 to 4 rating scale and its operational definitions, the sub-level bands, the IC and Management track split | Level to salary mapping |
| same, sheet `Example` | The exact weighted-score arithmetic | Anything about which level a score implies |
| `career_ladder_matrix.md` | Level names, ownership, complexity and scope definitions, all salary figures | Competency behaviours |
| `Assessing_Designers.pdf` (Travis and Hodgson, *Think Like a UX Researcher*, p. 288) | An external checklist of eight UX competencies, used only as a coverage cross-check | Anything that goes into the product without being folded into the merged model |

## 5. Two corrections to the brief, recorded up front

**The spreadsheet has 15 competencies, not 16.** Counted from sheet `En`: Clarity and Trust has 3 (Complexity Translation, Problem Definition, Alignment), the other three clusters have 4 each. The `Example` sheet confirms this: its Clarity and Trust weight cell is merged across three rows, the others across four. Every document in this set uses 15. If a 16th competency is wanted, the natural slot is a Clarity and Trust competency covering content design, and it is `[TBD: does the user want a 16th competency added, and if so does he want the authored behavioural text for 7 levels?]`.

**The three sources use three different level vocabularies for the same content.** Sheet `En` labels the seven columns Junior, Mid-Level 1, Mid-Level 2, Senior, Lead, Principal, Manager. Sheets `فا` and `Scoring` label the *same* seven columns Junior, Mid-Level, Senior, Staff, Lead, Principal, Manager. The full reconciliation is in [01-competency-model.md](01-competency-model.md); the short version is that the `فا` and `Scoring` vocabulary wins, because the weight table is keyed to it and the algorithm cannot run against anything else.

## 6. How the seven files fit together

```
00-overview.md          you are here: scope, sources, non-goals
  |
  +-- 01-competency-model.md   WHAT is measured
  |     15 competencies, 4 clusters, level mapping table,
  |     UX-book gap analysis, external calibration sources
  |
  +-- 02-scoring-model.md      HOW a set of answers becomes a level
  |     anchoring rule, cluster means, weight resolution,
  |     level bands, sub-level bands, divergence rule, worked example
  |
  +-- 03-question-bank.md      the 40 questions, Persian, with per-option scores
  |
  +-- 04-data-model.md         the TS schemas that 01, 02 and 03 compile into
  |
  +-- 05-build-plan.md         phased implementation, routing, RTL, deploy
  |
  +-- 06-checklist.md          flat checkbox list for the build agent
```

Dependency direction: 01 defines the model, 02 defines the maths over that model, 03 is content typed by 01 and scored by 02, 04 is the machine-readable form of 01 to 03, 05 builds 04 into an app, 06 verifies 05.

## 7. Decisions recorded in this file

- **Decision:** documentation is English, all product-facing strings are Persian. **Reason:** the repository is a public artifact aimed at an international reader of the author's work, while the app serves a Persian-speaking audience.
- **Decision:** the app is a single static bundle with no analytics on answers. **Reason:** the instrument asks people to admit professional weakness; the only credible privacy guarantee is that the data never leaves the tab.
- **Decision:** the competency matrix, question bank and salary bands are versioned TypeScript config in the repository, not JSON fetched at runtime. **Reason:** a push updates the live site, and the compiler enforces that every question maps to a real competency.
