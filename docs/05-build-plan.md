# 05 - Build Plan

## Purpose

This file is the implementation specification. It defines the product behaviour for the three modes, the full result screen, the closing call to action with its Persian copy, and then a phased build plan with a stated goal and a definition of done for every phase, covering routing, state, RTL setup, font choice, accessibility, the GitHub Pages base path and the deploy workflow. It assumes no prior context beyond the three source files and the other documents in this set.

---

## 1. Product behaviour

### 1.1 Screen flow

```
/            intro          what this is, what it is not, privacy statement
/setup       mode + track   two choices, then start
/q/:n        question n     1 of N, one question per screen, back allowed
/result      outcome        single or split, then the call to action
```

Four routes, no nesting, no modals carrying state.

### 1.2 The setup screen

Two questions, both required, both on one screen.

**Mode.** Three cards:

| Value | Persian label | Persian description | Questions |
| :--- | :--- | :--- | :-- |
| `scenario` | فقط سناریو | ۱۰ موقعیت واقعی. سریع‌تر و کمتر تحت تاثیر تصویری که از خودت داری. | 10 |
| `self` | فقط خودارزیابی | ۳۰ سوال درباره‌ی رفتار روزمره‌ات. پوشش کامل هر ۱۵ شایستگی. | 30 |
| `both` | هر دو | ۴۰ سوال. دو نمره‌ی مستقل می‌گیری و فاصله‌شان خودش یک نتیجه است. | 40 |

**Decision:** `both` is presented first and marked as recommended. **Reason:** it is the only mode that produces the divergence reading, which is the thing this instrument can do that a one-page self-assessment cannot.

**Track.** Three options, with an honest note that it only matters at the top:

| Value | Persian label |
| :--- | :--- |
| `ic` | مسیر تخصصی (IC) |
| `mgmt` | مسیر مدیریتی |
| `ic` (labelled separately) | هنوز مشخص نیست |

Persian helper text under the group:

> این انتخاب فقط وقتی روی نتیجه اثر می‌گذارد که در سطح Valiant یا بالاتر بایستی. اگر مطمئن نیستی، گزینه‌ی سوم را بزن؛ محاسبه با وزن‌های مسیر تخصصی انجام می‌شود و در نتیجه هم همین نوشته می‌شود.

### 1.3 The question screen

One question per screen. Four options as large radio cards, full-width, tappable anywhere on the card. A progress indicator showing `n` of `N`. Back is allowed and re-answering is allowed. Next is disabled until an option is selected. No timer, no skip.

In `both` mode the 10 scenario questions come first, then the 30 self-assessment questions.

**Decision:** scenarios first. **Reason:** answering 30 self-descriptions primes the respondent's self-image and would contaminate their scenario choices. Putting the situational judgment first keeps the two instruments as independent as an unsupervised test can make them, which is what the divergence statistic assumes.

### 1.4 Result branching

```
mode = 'self'      -> single result over 15 competencies
mode = 'scenario'  -> single result over 10 competencies, with a
                      "not measured" note naming the other 5
mode = 'both'      -> run the divergence rule from 02 section 7.3
                        fires    -> split result, two cards side by side
                        does not -> single result from the combined score
```

## 2. The result screen

Rendered top to bottom in this order. Every element is required.

### 2.1 Level card

- The level name from `career_ladder_matrix.md` in Latin script, large: `Mature`
- The sub-level as `X.n`: `Mature 3.2`
- The sub-level label in Persian from sheet `Scoring`, translated: `ورودی` (X.1), `هسته` (X.2), `پیشرفته` (X.3)
- The source's own one-line description of that sub-level, in Persian:
  - X.1 `تازه وارد این سطح شده‌ای و هنوز جای پایت را پیدا می‌کنی.`
  - X.2 `در این سطح عملکرد پایدار و قابل اتکایی داری.`
  - X.3 `مدام بالاتر از سطح فعلی‌ات کار می‌کنی و کاندیدای ارتقا هستی.`
- The level's `faSummary` from `levels.ts`
- The full six-rung ladder as a horizontal strip with the current rung marked and `heroic` and `grandmaster` visibly out of range, each carrying its `faOutOfRange` line

### 2.2 Ceiling notice

Shown only when `atCeiling` is true, that is when the resolved level is `valiant`:

> این تست سقف Valiant دارد. چهار گزینه‌ی هر سوال به چهار ستون پشت سر هم ماتریس شایستگی وصل است و بالاتر از آن را نمی‌سنجد. سطح‌های Heroic و Grandmaster با شواهد سازمانی سنجیده می‌شوند، نه با یک تست ۴۰ سوالی.

### 2.3 Cluster breakdown

A table, not a chart, because four rows do not earn a chart.

| خوشه | نمره | وزن در این سطح | سهم در نمره‌ی نهایی | پوشش |
| :--- | :-- | :-- | :-- | :-- |
| شفافیت و اعتماد | 3.0 | 0.25 | 0.75 | ۳ از ۳ |
| بینش و داده | 2.6 | 0.30 | 0.79 | ۴ از ۴ |
| یکپارچگی و کیفیت | 3.5 | 0.25 | 0.88 | ۴ از ۴ |
| رشد و حس مالکیت | 3.0 | 0.20 | 0.60 | ۴ از ۴ |

The weight column must be visible. A respondent whose weakest cluster carries a 0.10 weight is in a different position from one whose weakest cluster carries 0.35, and hiding the weight hides that.

### 2.4 Competency breakdown

All 15, grouped by cluster, each with its anchor score, the Persian competency name, its `faShort` line, and the matrix column that anchor corresponds to written in Persian, for example `در حد ستون Senior`. Competencies not measured in this mode are rendered greyed with `سنجیده نشد`.

### 2.5 Strongest and weakest

Up to three each, ties included, taken from measured competencies only, by anchor score.

- `قوی‌ترین‌ها` with the Persian line: `این‌ها را می‌توانی در مصاحبه و مذاکره‌ی حقوق مستقیماً روی میز بگذاری.`
- `ضعیف‌ترین‌ها` with the Persian line: `این‌ها لزوماً ضعف نیستند، ممکن است هنوز فرصتش پیش نیامده باشد. ولی اگر می‌خواهی یک سطح بالاتر بروی، معمولاً همین‌ها گلوگاه هستند.`

**Decision:** never show fewer than one or more than three on each side, and never show a competency in both lists. **Reason:** with 15 competencies and a 1 to 4 scale, ties are common; a fixed top-three with ties included keeps the list honest without letting it grow to half the model.

### 2.6 Salary

- The band label: `بازه‌ی حقوق سطح Mature`
- The band itself from `salary.ts`, formatted with Persian digits and thousands separators, in Toman: `۷۲,۴۲۵,۶۰۰ تا ۹۷,۱۴۷,۵۲۰ تومان`
- A horizontal band with a marker at `position`, plus the computed point: `جایگاه تخمینی تو در این بازه: حدود ۸۴,۱۹۷,۹۴۳ تومان`
- The Persian caveat, required:

> این عدد از زیرسطح تو در همین بازه محاسبه شده است. بازه از فایل مرجع نردبان شغلی می‌آید و بازار، اندازه‌ی شرکت و مذاکره‌ی خودت در آن دخالتی ندارند.

- When `band.max` is null, render the ceiling as `سقف باز` and show no point.

### 2.7 Divergence panel, split mode only

Two cards side by side, self-assessment on the right and scenario on the left in RTL reading order, each with its own level, sub-level and cluster table. Between them the delta with a sign, and beneath them the direction text from [02](02-scoring-model.md) section 7.4, verbatim.

Header above the two cards:

> دو نمره‌ی مستقل گرفتی و فاصله‌شان به اندازه‌ای هست که ارزش دیدن دارد. هیچ‌کدام «درست» نیست. فاصله خودش داده است.

### 2.8 Footer

- `دوباره از اول` which clears in-memory state and returns to `/`
- `پاک کردن اطلاعات ذخیره‌شده` shown only when a `SavedRun` exists
- The privacy line: `هیچ جواب و نتیجه‌ای از مرورگر تو بیرون نمی‌رود. این سایت backend ندارد.`
- A link to the repository and to the methodology, that is this documentation set
- The scope line, adapted from the Dropbox framework's own warning:

> این ابزار چک‌لیست ارتقا نیست و جای گفت‌وگو با مدیرت را نمی‌گیرد. یک تخمین است از روی رفتارهایی که خودت انتخاب کرده‌ای.

## 3. The closing call to action

Placed after the footer content, as the last block on the result page, in its own bordered card.

### 3.1 Persian copy

> ### نتیجه‌ی دقیق‌تر می‌خواهی؟
>
> این تست از روی چهل انتخاب، یک تخمین می‌سازد. چیزی که نمی‌تواند بسنجد، پشت هر انتخاب است: بار آخر واقعاً چه کردی، کجا کوتاه آمدی، و وقتی تصمیمت اشتباه از آب درآمد چه شد.
>
> یک مصاحبه‌ی آزمایشی یک‌ساعته می‌گیرم، دقیقاً به همان شکلی که مصاحبه‌ی سطح‌بندی در تیم‌های محصول برگزار می‌شود. بعدش می‌گویم به نظرم کجای این نردبان ایستاده‌ای، چه چیزی تو را از سطح بعد جدا می‌کند، و برای رسیدن به آن دقیقاً روی چه چیزی باید کار کنی.
>
> **هزینه: ۲۵ دلار، به‌صورت Apple Gift Card.**
>
> برای هماهنگی ایمیل بزن به `[TBD: contact email address]` و در ایمیل این سه چیز را بنویس:
>
> 1. نتیجه‌ای که همین حالا گرفتی (سطح و زیرسطح)
> 2. عنوان شغلی فعلی‌ات و چند سال است طراحی محصول کار می‌کنی
> 3. اینکه دنبال ارتقا هستی، تغییر شرکت، یا فقط می‌خواهی بدانی کجا ایستاده‌ای
>
> جواب می‌دهم و اگر به نظرم این جلسه به دردت نمی‌خورد، همان‌جا می‌گویم.

**Decision:** the copy names what the test cannot do before it names the price. **Reason:** the offer is credible only as a fix for a limitation the tool has already admitted on the same page, in section 2.2 and section 2.8. Selling against a limitation the reader has just read is honest; selling against one they have not is not.

`[TBD: contact email address]` must be filled in `copy.ts` before the first deploy. The build fails a pre-launch check while the literal string `[TBD:` appears anywhere in `src/`.

`[TBD: does the user want any payment or scheduling link, or is email the only channel? The brief specifies email and Apple gift card only, so nothing else is built.]`

## 4. Technical setup

### 4.1 Stack

| Concern | Choice | Note |
| :--- | :--- | :--- |
| Build | Vite | static output only |
| UI | React with TypeScript | |
| Styling | Tailwind CSS v4 | CSS-first config, `@import "tailwindcss"` |
| Components | shadcn/ui on Radix | `npx shadcn@latest init`, pick Radix |
| Routing | React Router | four routes, hash or browser, see 4.4 |
| Tests | Vitest | scoring engine and config invariants |
| Host | GitHub Pages | via GitHub Actions |

### 4.2 RTL

Three separate things, all required.

1. **Document direction.** `<html lang="fa" dir="rtl">` in `index.html`. This is what makes the browser lay the page out right to left.
2. **Radix direction.** Wrap the app in Radix's `DirectionProvider` with `dir="rtl"` in `main.tsx`. Without it, direction-aware primitives such as menus, popovers, sliders and navigation keep their LTR keyboard and positioning behaviour even though the page is RTL. See the [shadcn/ui RTL guide](https://ui.shadcn.com/docs/rtl/vite) and the [Direction component docs](https://ui.shadcn.com/docs/components/radix/direction).
3. **Logical properties in every utility.** Use `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `text-end`, `border-s`, `border-e`. Never `ml-*`, `mr-*`, `pl-*`, `pr-*`, `left-*`, `right-*`, `text-left`, `text-right`. A physical-property utility is a bug, and the checklist in [06](06-checklist.md) has a grep for it.

### 4.3 Typography

**Font: [Vazirmatn](https://github.com/rastikerdar/vazirmatn).** Persian and Arabic typeface, 9 weights, variable font available, SIL Open Font License 1.1, and it ships Latin glyphs from Roboto in the combined build so mixed Persian and Latin technical terms sit on the same baseline. That mixing is constant in this content: `framework`, `Design System`, `KPI`, `handoff` all appear inside Persian sentences.

**Decision:** self-host the `woff2` files in `public/fonts/` rather than loading them from Google Fonts. **Reason:** Google Fonts is unreliable from inside Iran, which is the primary audience, and self-hosting also removes a third-party request from a site whose whole privacy claim is that nothing leaves the browser.

```css
@font-face {
  font-family: 'Vazirmatn';
  src: url('/fonts/Vazirmatn[wght].woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
}
```

Set `font-feature-settings` so Persian digits render correctly, and use `font-variant-numeric: tabular-nums` on the salary figures so the band marker does not shift.

**Numerals.** Persian digits (۰ to ۹) in all body copy, question text, progress counters and salary figures. Latin digits in question ids, scores and anything a developer reads. Format salary with `Intl.NumberFormat('fa-IR')`.

### 4.4 GitHub Pages base path

For a project site at `https://<user>.github.io/<repo>/`:

```ts
// vite.config.ts
export default defineConfig({
  base: '/<repo>/',
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
});
```

**Decision:** use `HashRouter`, not `BrowserRouter`. **Reason:** GitHub Pages serves static files and returns its own 404 for an unknown path, so a browser-routed deep link to `/q/7` breaks on refresh and on being shared. The usual workaround is a `404.html` that re-enters the SPA, which is a redirect hack that flashes. A hash router costs one `#` in the URL and removes the whole class of problem. If `BrowserRouter` is preferred later, `basename` must be set to the same value as `base` and a `404.html` copy of `index.html` must be emitted.

Add `public/.nojekyll` so Pages does not strip files or directories beginning with an underscore.

### 4.5 Deploy workflow

`.github/workflows/deploy.yml`, using the official Pages actions, triggered on push to the default branch. Repository settings must have Pages source set to GitHub Actions.

```yaml
name: Deploy
on:
  push: { branches: [main] }
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run typecheck
      - run: npm run test
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

`npm run typecheck` and `npm run test` run before `build` on purpose. A scoring regression must fail the deploy, not reach the site.

### 4.6 State

All run state lives in one reducer at the route-tree root, passed down by context. No global state library.

```ts
interface RunState {
  mode: Mode | null;
  track: Track | null;
  trackDeclared: boolean;        // false when the user picked "not sure"
  answers: Record<string, 'a' | 'b' | 'c' | 'd'>;
  persist: boolean;              // opt-in localStorage, default false
}
```

The scoring engine in `lib/scoring.ts` is pure: it takes `RunState` plus the config and returns an `Outcome`. It imports nothing from React and touches no browser API, so it is directly unit-testable against the vectors in [02](02-scoring-model.md) section 10.

`/result` recomputes from `answers` on every render rather than storing an `Outcome`. Deriving is cheap here and it removes any chance of a stale result surviving a config change.

### 4.7 Accessibility

| Requirement | How |
| :--- | :--- |
| Each question is a labelled group | `<fieldset>` with a `<legend>` carrying the question text |
| Options are a real radio group | `role="radiogroup"`, arrow keys move between options, Space selects |
| Keyboard only completion | Tab reaches every control; Enter on Next advances; nothing needs a pointer |
| Progress is announced | `aria-live="polite"` region announcing `سوال ۷ از ۴۰` on change |
| Contrast | 4.5:1 for body text, 3:1 for large text and UI boundaries |
| Focus is always visible | never remove the focus ring; use `:focus-visible` |
| Result tables are real tables | `<table>` with `<th scope>`, not a grid of divs |
| The salary marker is not colour alone | numeric label next to the marker |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` disables all transitions |
| Language | `lang="fa"` on `<html>`; wrap inline Latin terms in `<span lang="en">` so a screen reader switches voice |

The last row matters more than usual here, because these questions mix Persian and English in almost every sentence.

## 5. Phased build plan

Seven phases. Each has one goal and a definition of done that can be checked without judgement.

### Phase 1: Scaffold

**Goal.** A blank Vite React TypeScript app with Tailwind v4 and shadcn/ui, rendering RTL Persian text in Vazirmatn, deployed to GitHub Pages.

**Definition of done.**
- `npm run dev` serves a page reading `سلام` right-aligned in Vazirmatn
- `<html lang="fa" dir="rtl">` is set and `DirectionProvider` wraps the app
- `vite.config.ts` has `base: '/<repo>/'` and the `@` alias
- `public/.nojekyll` exists and fonts are self-hosted under `public/fonts/`
- The workflow in 4.5 is committed and one push has produced a live URL
- The live URL loads with no 404 on any asset

### Phase 2: Config and types

**Goal.** Every schema in [04](04-data-model.md) exists and is fully populated: 4 clusters, 15 competencies, 6 levels, 6 salary bands, all 40 questions.

**Definition of done.**
- `npm run typecheck` passes with no `any` in `src/config/`
- Tests assert: weights sum to 1.000 per column, and all nine question invariants in [04](04-data-model.md) section 7
- Salary figures match `career_ladder_matrix.md` exactly, verified digit by digit
- No question text is a placeholder

### Phase 3: Scoring engine

**Goal.** `lib/scoring.ts` implements [02](02-scoring-model.md) exactly, as pure functions.

**Definition of done.**
- All eight test vectors in [02](02-scoring-model.md) section 10 pass, including the spreadsheet's own 2.875 and the `|S| = 0` fallback case
- A property test over 10,000 random answer sets asserts the engine never throws, always returns an assessable level, and always returns `fRel` within 0.2 and 4.0
- No React import anywhere in the file

### Phase 4: Question flow

**Goal.** A respondent can pick a mode and track, answer every question, and reach `/result` with a computed `Outcome`.

**Definition of done.**
- All three modes present the right question count and, in `both` mode, scenarios first
- Back preserves answers; re-answering updates them
- Next is disabled until an option is chosen
- Refreshing mid-run with persistence off returns to `/` rather than to a broken state
- The whole flow is completable with the keyboard only

### Phase 5: Result screen

**Goal.** Everything in section 2 of this file renders, in both single and split form.

**Definition of done.**
- Single result renders all of 2.1 and 2.3 to 2.8
- Split result renders 2.7 with two cards and the correct direction text
- The worked example in [02](02-scoring-model.md) section 8, entered by hand through the UI, produces Mature 3.2 and 84,197,943 Toman on the self side and Mature 3.1 and 80,322,880 Toman on the scenario side, and shows the split
- Scenario-only mode names the five unmeasured competencies
- The ceiling notice appears at Valiant and nowhere else
- The CTA card renders with real copy and no `[TBD:` string

### Phase 6: Polish, RTL and accessibility

**Goal.** The app is usable on a phone, in Persian, with a keyboard and a screen reader.

**Definition of done.**
- `grep -rE "\b(ml|mr|pl|pr)-[0-9]|left-|right-|text-left|text-right" src/` returns nothing
- Lighthouse accessibility score is 95 or above on `/`, `/q/1` and `/result`
- Manual pass with VoiceOver reads the question, the option count and the progress region correctly
- Layout holds at 360px width with no horizontal scroll
- All numerals in body copy are Persian; salary uses `Intl.NumberFormat('fa-IR')`
- `prefers-reduced-motion` is honoured

### Phase 7: Launch

**Goal.** The site is public, documented and reproducible.

**Definition of done.**
- `README.md` in Persian and English, linking to this documentation set
- LICENSE chosen `[TBD: which licence does the user want? MIT is the usual choice for a public tool like this, but the content is derived from a company's internal matrix, which is worth a sentence in the README about provenance]`
- The contact email is filled in and a build-time check fails on any remaining `[TBD:`
- No network request leaves the page, verified in the browser network tab on a full run
- The methodology page or link is reachable from the result screen
