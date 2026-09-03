# 06 - Checklist

## Purpose

This file is a flat, actionable checkbox list covering the whole build: repository setup, content entry, scoring logic, UI, RTL and accessibility, deployment and pre-launch QA. It is deliberately flat rather than grouped by phase, so it can be worked through top to bottom and used as the final gate before the site goes public. Every item is verifiable without judgement; where an item needs a specific value or command, it is written inline.

---

## Setup

- [x] `npm create vite@latest . -- --template react-ts`
- [x] Install Tailwind CSS v4 and the Vite plugin; add `@import "tailwindcss";` to the entry CSS
- [x] Add the `@` path alias in both `vite.config.ts` and `tsconfig.json`
- [x] `npx shadcn@latest init`, select Radix
- [x] Add the shadcn components used: `button`, `card`, `radio-group`, `progress`, `table`, `separator`, `badge`
- [x] Install React Router and Vitest
- [x] Set `base: '/<repo>/'` in `vite.config.ts`
- [x] Create `public/.nojekyll`
- [x] Download Vazirmatn `woff2` files into `public/fonts/` and add the `@font-face` block
- [x] Set `<html lang="fa" dir="rtl">` in `index.html`
- [x] Wrap the app in Radix `DirectionProvider` with `dir="rtl"` in `main.tsx`
- [x] Add npm scripts: `dev`, `build`, `preview`, `typecheck`, `test`, `lint`
- [x] Commit `.github/workflows/deploy.yml` from [05](05-build-plan.md) section 4.5
- [ ] Set repository Pages source to GitHub Actions
- [ ] Confirm the first deploy produces a live URL with no asset 404s

## Content

- [x] `src/config/clusters.ts`: all 4 clusters with the full 7-column weight table
- [x] Mark `clarity-trust.faAuthored = true` (the source Persian cell is corrupted)
- [x] `src/config/competencies.ts`: all 15 competencies with cluster, English name, Persian name and `faShort`
- [x] Tag `complexity-translation` with the `information-architecture` folded facet
- [x] Tag `craftsmanship` with the `technical-writing` and `accessibility` folded facets
- [x] `src/config/levels.ts`: all 6 levels, ordinals 1 to 6, matrix column per track
- [x] Set `assessable: false` on `heroic` and `grandmaster`, each with its `faOutOfRange` line
- [x] `src/config/salary.ts`: all 6 bands, Toman, copied digit by digit from `career_ladder_matrix.md`
- [x] Set `grandmaster.max = null` (the source says the ceiling is open)
- [x] Verify no salary figure in the codebase is absent from `career_ladder_matrix.md`
- [x] `src/config/questions.ts`: all 30 self-assessment questions from [03](03-question-bank.md) Part A
- [x] `src/config/questions.ts`: all 10 scenario questions from [03](03-question-bank.md) Part B, in the render order given there
- [x] Add the `// NOTE: render order is intentionally not score order. Do not sort.` comment above the scenario block
- [x] `src/config/copy.ts`: intro copy, mode and track labels, result copy, both divergence directions, ceiling notice, salary caveat, footer, CTA
- [x] Replace `[TBD: contact email address]` in the CTA with the real address
- [x] Persian numerals used in every user-facing string; Latin numerals only in ids and scores
- [x] Latin technical terms left in Latin script, not transliterated

## Logic

- [x] `lib/scoring.ts` exports pure functions only, with no React or browser API import
- [x] `round1` rounds half away from zero to one decimal place, and is applied only to `F_abs` and `F_rel`, never to intermediate cluster means
- [x] Competency anchor is the mean of that competency's answered questions within the mode being scored
- [x] Cluster score is the unweighted mean over measured competencies only
- [x] `F_abs(L) = sum_k w[k][column(L, track)] * C[k]` for all four assessable levels
- [x] Level bands: `<= 1.4` Rising, `1.5 to 2.4` Formed, `2.5 to 3.4` Mature, `>= 3.5` Valiant
- [x] Self-consistent set computed; when non-empty, the **lowest** level is chosen
- [x] Fallback implemented for the empty case: minimum distance to own band, ties to the lower level
- [x] `usedFallback` is set on the `Assessment` when the fallback fired
- [x] `r = clamp(anchor - levelOrdinal + 3, 1, 4)` computed after the level is resolved
- [x] `F_rel = sum_k w[k][column(Lstar, track)] * R[k]`
- [x] Sub-level bands: `0.2 to 2.6` X.1, `2.7 to 3.4` X.2, `3.5 to 4.0` X.3
- [x] Salary position implemented exactly as [02](02-scoring-model.md) section 6, including the `u` term inside each third
- [x] `point` is null when `band.max` is null
- [x] Divergence computed on the 10 shared competencies only, under the combined level's weight column
- [x] Split fires on `|delta| >= 0.5` **or** the two resolved levels differing
- [x] `atCeiling` set when the resolved level is `valiant`
- [x] Strongest and weakest lists: up to 3 each, ties included, measured competencies only, no overlap between the lists

## Tests

- [x] Weight table sums to 1.000 within 1e-9 for each of the 7 columns
- [x] All nine question invariants from [04](04-data-model.md) section 7
- [x] Vector 1: cluster scores 3.000 / 2.500 / 3.000 / 3.000 under Mid-Level weights gives 2.875 and X.2 (the spreadsheet's own example)
- [x] Vectors 2 to 5: all-1, all-2, all-3, all-4 give Rising 1.2, Formed 2.2, Mature 3.2, Valiant 4.2
- [x] Vector 6: the same four on the Management track give identical levels and sub-levels
- [x] Vector 7: `C` = 1.000 / 1.000 / 1.167 / 2.833 on IC has an empty self-consistent set and resolves to Rising
- [x] Vector 8: the [02](02-scoring-model.md) section 8 worked example gives self Mature 3.2 at 84,197,943 T, scenario Mature 3.1 at 80,322,880 T, `delta` = +0.5, split fires
- [x] Property test over 10,000 random answer sets: never throws, always returns an assessable level, `fRel` always within 0.2 and 4.0
- [x] A test asserts that no config file contains the substring `[TBD:`

## UI

- [x] Four routes: `/`, `/setup`, `/q/:n`, `/result`
- [x] `HashRouter` used (see [05](05-build-plan.md) section 4.4 for why)
- [x] Intro screen states what the tool is, what it is not, and that nothing leaves the browser
- [x] Setup screen offers all three modes with question counts, `both` first and marked recommended
- [x] Setup screen offers all three track options with the helper text explaining it only matters at Valiant
- [x] One question per screen, four full-width tappable option cards
- [x] Progress indicator showing `n` of `N` in Persian numerals
- [x] Back preserves answers; re-answering updates them
- [x] Next disabled until an option is selected
- [x] In `both` mode, the 10 scenario questions come before the 30 self-assessment questions
- [x] Result: level card with name, `X.n`, Persian sub-level label and the source's description
- [x] Result: six-rung ladder strip with `heroic` and `grandmaster` shown out of range
- [x] Result: ceiling notice at Valiant only
- [x] Result: cluster table including the weight column and the coverage column
- [x] Result: all 15 competencies grouped by cluster, unmeasured ones greyed with `سنجیده نشد`
- [x] Result: strongest and weakest lists with their Persian framing lines
- [x] Result: salary band, marker, computed point and the required caveat
- [x] Result: split view with two cards, the signed delta and the correct direction text
- [x] Result: footer with restart, clear-saved-data, privacy line, repository link and the not-a-promotion-checklist line
- [x] CTA card renders last, with the price, the Apple gift card method, the email and the three things to include
- [x] Opt-in persistence checkbox on the intro screen, default off
- [x] Clear-saved-data control actually removes the `pd-assessment/run/v1` key

## RTL and accessibility

- [x] `grep -rE "\b(ml|mr|pl|pr)-[0-9]|\b(left|right)-[0-9]|text-left|text-right" src/` returns nothing
- [x] Logical utilities used throughout: `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `text-end`
- [x] Radix `DirectionProvider` confirmed active (wraps the app in `main.tsx`; verified radiogroup arrow-key navigation respects the RTL context)
- [x] Each question is a `<fieldset>` with a `<legend>` carrying the question text
- [x] Options are a `role="radiogroup"`; arrow keys move, Space selects
- [x] The entire flow is completable with the keyboard alone (verified end-to-end with a headless-browser driver: Tab/focus + Enter + Space through intro → setup → question → next)
- [x] `aria-live="polite"` region announces the question number on change
- [x] Focus ring visible on every interactive element, `:focus-visible` never removed
- [ ] Body text contrast at least 4.5:1; large text and UI boundaries at least 3:1 (uses shadcn's default token palette; not independently measured)
- [x] Result tables are real `<table>` elements with `<th scope>`
- [x] Salary marker carries a numeric label, not colour alone
- [x] Inline Latin technical terms wrapped in `<span lang="en">`
- [x] `@media (prefers-reduced-motion: reduce)` disables transitions
- [x] Layout holds at 360px width with no horizontal scroll (verified with a headless browser at 360px on `/`, `/setup`, `/q/1` and both single and split `/result`; ladder strip was overflowing and was fixed)
- [ ] Lighthouse accessibility 95 or above on `/`, `/q/1` and `/result` (needs a Lighthouse run; not available in this environment)
- [ ] Tested in Safari on iOS, since Persian shaping and `dir` handling differ there (needs a physical/simulator device)

## Deployment

- [ ] `vite.config.ts` `base` matches the repository name exactly, including the trailing slash
- [ ] `public/.nojekyll` present in `dist` after build
- [ ] Workflow runs `typecheck` and `test` before `build`
- [ ] Workflow has `permissions: contents read, pages write, id-token write`
- [ ] `concurrency: { group: pages, cancel-in-progress: true }` set
- [ ] A push to the default branch deploys automatically
- [ ] Fonts load from the site's own origin, not from a third party
- [ ] Direct load of a deep link works after a hard refresh
- [ ] Assets load correctly under the `/<repo>/` path, verified on the live URL not just locally

## Pre-launch QA

- [ ] Complete a full run in each of the three modes on a real phone
- [ ] Answer all 1s: result is Rising 1.2 with the Rising salary band
- [ ] Answer all 4s: result is Valiant 4.2 with the ceiling notice and the Valiant salary band
- [ ] Force a split: answer self-assessment high and scenarios low, confirm both cards and the `delta > 0` text
- [ ] Force the reverse split and confirm the `delta < 0` text
- [ ] Scenario-only run names exactly five unmeasured competencies
- [ ] Open the browser network tab and complete a full run: zero requests after the initial page and asset load
- [ ] `localStorage` is empty after a run with persistence off
- [ ] With persistence on, a refresh restores the run; the clear control empties it
- [ ] No `[TBD:` string anywhere in `src/` or in the built `dist/`
- [ ] No em dash appears in any Persian or English user-facing string
- [ ] Every salary figure on screen traces to `career_ladder_matrix.md`
- [ ] README explains provenance: whose matrix, whose ladder, and that the salary figures are the source's, not the author's estimate
- [ ] LICENSE file present
- [ ] Methodology link from the result screen resolves to this documentation set
- [ ] Read every one of the 40 questions aloud in Persian and fix anything that reads like a translation
