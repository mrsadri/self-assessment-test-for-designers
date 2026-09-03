# 04 - Data Model

## Purpose

This file gives the TypeScript schema for every piece of content the app reads: the competency matrix, the question bank, the salary and level config, and the shapes the scoring engine produces. Each schema is followed by a filled sample taken from the real content in [01](01-competency-model.md), [02](02-scoring-model.md) and [03](03-question-bank.md), so a coding agent can copy the sample, extend it to the full set, and have the compiler catch anything that does not line up.

---

## 1. File layout

```
src/
  config/
    clusters.ts        4 clusters, Persian and English names, weight table
    competencies.ts    15 competencies, cluster membership, Persian names
    levels.ts          the 6 career-ladder levels, reachability, matrix column map
    salary.ts          Toman bands, sourced only from career_ladder_matrix.md
    questions.ts       all 40 questions with options and scores
    copy.ts            all Persian UI strings including the CTA
  lib/
    scoring.ts         the algorithm from 02, pure functions, no React
    scoring.test.ts    the test vectors from 02 section 10
  types.ts             every interface below
```

**Decision:** config is TypeScript, not JSON. **Reason:** a `satisfies` clause makes the compiler reject a question tagged with a competency that does not exist, a score outside 1 to 4, or a level with no salary band. With JSON those become runtime bugs on a live public site.

## 2. Core identifier types

```ts
export type ClusterId =
  | 'clarity-trust'
  | 'insight-data'
  | 'consistency-excellence'
  | 'growth-ownership';

export type CompetencyId =
  | 'complexity-translation' | 'problem-definition'     | 'strategic-alignment'
  | 'product-thinking'       | 'evidence-based-design'  | 'discovery-execution'
  | 'solution-accountability'
  | 'craftsmanship'          | 'system-stewardship'     | 'shipping-design'
  | 'technical-velocity'
  | 'chapter-contribution'   | 'learning-growth'        | 'adaptability'
  | 'mentorship';

/** The 7 columns of the competency matrix, canonical vocabulary (sheets فا and Scoring). */
export type MatrixColumn =
  | 'junior' | 'mid-level' | 'senior' | 'staff' | 'lead' | 'principal' | 'manager';

/** The 6 levels of career_ladder_matrix.md. */
export type LevelId =
  | 'rising' | 'formed' | 'mature' | 'valiant' | 'heroic' | 'grandmaster';

export type Track = 'ic' | 'mgmt';
export type Mode  = 'scenario' | 'self' | 'both';

/** Anchor score. 1 = Junior column ... 4 = Staff or Lead column. */
export type AnchorScore = 1 | 2 | 3 | 4;

/** Source rating, sheet Scoring. Derived, never entered directly. */
export type RelativeRating = 1 | 2 | 3 | 4;

export type SubLevel = 'x1' | 'x2' | 'x3';
```

## 3. Clusters and the weight table

```ts
export interface Cluster {
  id: ClusterId;
  en: string;
  fa: string;
  /** true when the Persian name is authored, not sourced. See 01 section 4. */
  faAuthored?: boolean;
  /** Cluster weight per matrix column. Every column must sum to 1 across clusters. */
  weights: Record<MatrixColumn, number>;
}
```

Filled sample, complete because the table is small and the whole thing is load-bearing:

```ts
export const CLUSTERS: readonly Cluster[] = [
  {
    id: 'clarity-trust', en: 'Clarity & Trust', fa: 'شفافیت و اعتماد', faAuthored: true,
    weights: { junior: 0.10, 'mid-level': 0.15, senior: 0.25, staff: 0.30,
               lead: 0.35, principal: 0.35, manager: 0.35 },
  },
  {
    id: 'insight-data', en: 'Insight & Data', fa: 'بینش و داده',
    weights: { junior: 0.15, 'mid-level': 0.25, senior: 0.30, staff: 0.25,
               lead: 0.20, principal: 0.30, manager: 0.25 },
  },
  {
    id: 'consistency-excellence', en: 'Consistency & Excellence', fa: 'یکپارچگی و کیفیت',
    weights: { junior: 0.55, 'mid-level': 0.40, senior: 0.25, staff: 0.20,
               lead: 0.10, principal: 0.10, manager: 0.05 },
  },
  {
    id: 'growth-ownership', en: 'Growth & Ownership', fa: 'رشد و حس مالکیت',
    weights: { junior: 0.20, 'mid-level': 0.20, senior: 0.20, staff: 0.25,
               lead: 0.35, principal: 0.25, manager: 0.35 },
  },
] as const;
```

A unit test must assert that for every `MatrixColumn`, the four weights sum to 1.000 within 1e-9.

## 4. Competencies

```ts
export interface Competency {
  id: CompetencyId;
  cluster: ClusterId;
  en: string;
  fa: string;
  /** Short Persian line shown on the result breakdown, one clause. */
  faShort: string;
  /** Facets folded in from the Travis and Hodgson checklist. See 01 section 3. */
  foldedFacets?: readonly string[];
}
```

Filled sample:

```ts
export const COMPETENCIES: readonly Competency[] = [
  { id: 'complexity-translation', cluster: 'clarity-trust',
    en: 'Complexity Translation', fa: 'ساده‌سازی منطق و پیچیدگی',
    faShort: 'تبدیل منطق پیچیده‌ی محصول به تجربه‌ای که کاربر بدون توضیح می‌فهمد',
    foldedFacets: ['information-architecture'] },

  { id: 'craftsmanship', cluster: 'consistency-excellence',
    en: 'Craftsmanship', fa: 'استادی در اجرا',
    faShort: 'کیفیت اجرای بصری و تعاملی، از سلسله‌مراتب و state ها تا متن و دسترس‌پذیری',
    foldedFacets: ['technical-writing', 'accessibility'] },

  { id: 'discovery-execution', cluster: 'insight-data',
    en: 'Discovery Execution', fa: 'اجرای فرایند کشف',
    faShort: 'انتخاب و اجرای روش درست تحقیق برای مسئله‌ای که روی میز است' },

  // ... 12 more, one per row of the table in 01 section 1
] as const;
```

## 5. Levels

```ts
export interface Level {
  id: LevelId;
  /** 1..6 position on the career ladder. */
  ordinal: 1 | 2 | 3 | 4 | 5 | 6;
  /** Name from career_ladder_matrix.md, kept in Latin script as in the source. */
  name: string;
  fa: string;
  faSummary: string;
  /** Matrix column per track. null when no column describes this level. */
  column: { ic: MatrixColumn | null; mgmt: MatrixColumn | null };
  /** false for heroic and grandmaster. See 01 section 2.4. */
  assessable: boolean;
  /** Shown when assessable is false. */
  faOutOfRange?: string;
}
```

Filled sample, complete:

```ts
export const LEVELS: readonly Level[] = [
  { id: 'rising', ordinal: 1, name: 'Rising', fa: 'Rising',
    faSummary: 'کارهای پایه‌ای و تعریف‌شده را مستقل انجام می‌دهد و در حال یادگیری حوزه‌ی تخصصی است.',
    column: { ic: 'junior', mgmt: 'junior' }, assessable: true },

  { id: 'formed', ordinal: 2, name: 'Formed', fa: 'Formed',
    faSummary: 'یک دامنه‌ی کوچک و مشخص را نگه می‌دارد و برای مسائل غیرتکراری خودش تحقیق می‌کند.',
    column: { ic: 'mid-level', mgmt: 'mid-level' }, assessable: true },

  { id: 'mature', ordinal: 3, name: 'Mature', fa: 'Mature',
    faSummary: 'استراتژی یک دامنه و نتایج کلیدی آن را هدایت می‌کند و می‌تواند منتور دیگران باشد.',
    column: { ic: 'senior', mgmt: 'senior' }, assessable: true },

  { id: 'valiant', ordinal: 4, name: 'Valiant', fa: 'Valiant',
    faSummary: 'تصمیم‌ها و استراتژی‌ای را هدایت می‌کند که موفقیت بخش بزرگی از سازمان را تضمین می‌کند.',
    column: { ic: 'staff', mgmt: 'lead' }, assessable: true },

  { id: 'heroic', ordinal: 5, name: 'Heroic', fa: 'Heroic',
    faSummary: 'با دانش تخصصی خود عملکرد چند حوزه را هم‌سو و بهتر می‌کند.',
    column: { ic: 'principal', mgmt: 'manager' }, assessable: false,
    faOutOfRange: 'سنجش این سطح به شواهد سازمانی نیاز دارد که یک تست ۴۰ سوالی نمی‌تواند جمع کند.' },

  { id: 'grandmaster', ordinal: 6, name: 'Grandmaster', fa: 'Grandmaster',
    faSummary: 'چشم‌انداز جهانی سازمان را تنظیم و هدایت می‌کند. در ماتریس اصلی معادلی ندارد.',
    column: { ic: null, mgmt: null }, assessable: false,
    faOutOfRange: 'این سطح در ماتریس شایستگی مرجع ستونی ندارد و بیرون از دامنه‌ی این تست است.' },
] as const;
```

**Note:** `heroic.column` is populated even though `assessable` is false, because the mapping is defended in [01](01-competency-model.md) section 2.3 and should not be lost. The scoring engine iterates over `LEVELS.filter(l => l.assessable)` and must never read a non-assessable level's column.

## 6. Salary configuration

```ts
export interface SalaryBand {
  level: LevelId;
  /** Toman. Sourced only from career_ladder_matrix.md. Never computed, never converted. */
  min: number;
  /** null means the source says the ceiling is open. */
  max: number | null;
  currency: 'IRT';
  source: 'career_ladder_matrix.md';
}
```

Filled sample, complete. Persian digits in the source converted to Latin, values otherwise untouched:

```ts
export const SALARY_BANDS: readonly SalaryBand[] = [
  { level: 'rising',      min:  33_449_600, max:  39_574_400, currency: 'IRT', source: 'career_ladder_matrix.md' },
  { level: 'formed',      min:  45_699_200, max:  61_957_760, currency: 'IRT', source: 'career_ladder_matrix.md' },
  { level: 'mature',      min:  72_425_600, max:  97_147_520, currency: 'IRT', source: 'career_ladder_matrix.md' },
  { level: 'valiant',     min: 112_181_119, max: 148_818_560, currency: 'IRT', source: 'career_ladder_matrix.md' },
  { level: 'heroic',      min: 169_865_599, max: 226_213_760, currency: 'IRT', source: 'career_ladder_matrix.md' },
  { level: 'grandmaster', min: 250_865_599, max: null,        currency: 'IRT', source: 'career_ladder_matrix.md' },
] as const;
```

`[TBD: does the user want a "figures as of" date rendered next to the salary band? The source file carries no date, and an undated Toman figure ages badly.]`

## 7. Questions

```ts
export type QuestionKind = 'self' | 'scenario';

export interface Option {
  /** Stable id, 'a' | 'b' | 'c' | 'd', in render order. */
  id: 'a' | 'b' | 'c' | 'd';
  fa: string;
  score: AnchorScore;
  /** The matrix cell this behaviour came from. Documentation only, not used at runtime. */
  sourceColumn: string;
}

export interface Question {
  id: string;                    // 'SA01' .. 'SA30', 'SC01' .. 'SC10'
  kind: QuestionKind;
  competency: CompetencyId;
  fa: string;
  /** Exactly four options. Scores must be a permutation of 1,2,3,4. */
  options: readonly [Option, Option, Option, Option];
}
```

Filled sample, one of each kind, verbatim from [03](03-question-bank.md):

```ts
export const QUESTIONS: readonly Question[] = [
  {
    id: 'SA01', kind: 'self', competency: 'complexity-translation',
    fa: 'وقتی یک بریف پیچیده به دستت می‌رسد، کارت معمولاً از کجا شروع می‌شود؟',
    options: [
      { id: 'a', score: 1, sourceColumn: 'junior/Component & Task Clarity',
        fa: 'عناصر پیچیده را در بریف پیدا می‌کنم و با الگوهای استاندارد UI بار ذهنی کاربر را کم می‌کنم.' },
      { id: 'b', score: 2, sourceColumn: 'mid-level/Flow & Logic Simplification',
        fa: 'منطق پنهان محصول، مثل نحوه‌ی محاسبه‌ها یا استثناها، را به بازخورد بصری و زبان ساده ترجمه می‌کنم.' },
      { id: 'c', score: 3, sourceColumn: 'senior/Experience Orchestration',
        fa: 'کل روایت را در طول یک مسیر end-to-end می‌چینم تا feature های فنی به مدل ذهنی کاربر وصل شوند.' },
      { id: 'd', score: 4, sourceColumn: 'staff/Cross-Vertical Architecture + lead/Quality & Craft Mentorship',
        fa: 'framework می‌سازم تا مدل ذهنی واحد در چند محصول حفظ شود، یا استاندارد شفافیت را برای کل تیم تعریف می‌کنم.' },
    ],
  },
  {
    id: 'SC02', kind: 'scenario', competency: 'problem-definition',
    fa: 'PM می‌گوید «نرخ استفاده از فیلتر پایین است، بیایید فیلتر را برجسته‌تر کنیم.» اولین کارت چیست؟',
    // NOTE: render order is intentionally not score order. Do not sort.
    options: [
      { id: 'a', score: 3, sourceColumn: 'senior/Framing & Scoping',
        fa: 'پیش از هر طراحی یک Problem Statement می‌نویسم و با PM سرش توافق می‌کنم که مسئله دیده نشدن است یا بی‌فایده بودن.' },
      { id: 'b', score: 1, sourceColumn: 'junior/Goal Clarity',
        fa: 'فیلتر را برجسته‌تر می‌کنم و نتیجه را بعد از انتشار می‌بینم.' },
      { id: 'c', score: 4, sourceColumn: 'staff/Meta-Problem Identification',
        fa: 'همین الگو را در بخش‌های دیگر محصول هم می‌بینم و مسئله را در سطح ساختار جست‌وجو تعریف می‌کنم.' },
      { id: 'd', score: 2, sourceColumn: 'mid-level/Assumption Testing',
        fa: 'اول داده‌ی رفتاری را نگاه می‌کنم تا بفهمم کاربران فیلتر را نمی‌بینند یا می‌بینند و رهایش می‌کنند.' },
    ],
  },
  // ... 38 more
] as const;
```

### Invariants a test must enforce

| # | Invariant |
| :-- | :--- |
| 1 | `QUESTIONS.length === 40` |
| 2 | 30 have `kind: 'self'`, 10 have `kind: 'scenario'` |
| 3 | Every question's four option scores are a permutation of `[1,2,3,4]` |
| 4 | Every `CompetencyId` appears in exactly 2 `self` questions |
| 5 | No `CompetencyId` appears in more than 1 `scenario` question |
| 6 | Every `self` question's options are in ascending score order |
| 7 | No `scenario` question's options are in ascending score order |
| 8 | Every question id is unique and matches `/^S[AC]\d{2}$/` |
| 9 | Every `competency` value exists in `COMPETENCIES` |

## 8. Runtime result shapes

```ts
export interface CompetencyResult {
  competency: CompetencyId;
  /** Mean anchor over the questions of this competency answered in this run. */
  anchor: number;
  /** clamp(anchor - levelOrdinal + 3, 1, 4), computed after the level is resolved. */
  relative: number;
  measured: boolean;
}

export interface ClusterResult {
  cluster: ClusterId;
  /** Mean anchor over measured competencies in this cluster. */
  score: number;
  /** Mean relative rating over the same set. */
  relative: number;
  weight: number;
  measuredCount: number;
  totalCount: number;
}

export interface Assessment {
  mode: Mode;
  track: Track;
  level: LevelId;
  subLevel: SubLevel;
  /** e.g. '3.2' for Mature X.2. */
  displayLevel: string;
  fAbs: number;                  // rounded to 1dp
  fRel: number;                  // rounded to 1dp
  /** true when the self-consistent set was empty and the fallback rule chose the level. */
  usedFallback: boolean;
  clusters: readonly ClusterResult[];
  competencies: readonly CompetencyResult[];
  strongest: readonly CompetencyId[];   // up to 3, ties included
  weakest: readonly CompetencyId[];     // up to 3, ties included
  salary: {
    band: SalaryBand;
    /** 0..1 position inside the band, from the sub-level. See 02 section 6. */
    position: number;
    /** min + (max - min) * position. null when the band has an open ceiling. */
    point: number | null;
  };
  /** Set when the resolved level is at the instrument ceiling. */
  atCeiling: boolean;
}

export interface DivergenceReport {
  /** F_self(shared) - F_scen(shared), both under the combined level's weights. */
  delta: number;
  /** Fires on |delta| >= 0.5 OR the two resolved levels differing. */
  shouldSplit: boolean;
  reason: 'level-mismatch' | 'delta-threshold' | 'none';
  direction: 'self-higher' | 'scenario-higher' | 'aligned';
  /** Persian explanation, from copy.ts, chosen by direction. */
  faExplanation: string;
}

export interface Outcome {
  /** Present unless the divergence rule fired. */
  combined?: Assessment;
  /** Both present when the divergence rule fired. */
  self?: Assessment;
  scenario?: Assessment;
  divergence?: DivergenceReport;
}
```

## 9. Persisted state

The only thing ever written to disk is the in-progress run, and only on request.

```ts
export interface SavedRun {
  version: 1;
  savedAt: string;              // ISO 8601
  mode: Mode;
  track: Track;
  /** questionId -> chosen option id. */
  answers: Record<string, 'a' | 'b' | 'c' | 'd'>;
}
```

**Rules, non-negotiable, and derived from the non-goals in [00](00-overview.md):**

1. `SavedRun` lives in `localStorage` under one key, `pd-assessment/run/v1`, and nowhere else.
2. Writing it is opt in. The default is off. A checkbox on the intro screen turns it on, phrased in Persian as saving to this browser only.
3. Computed results are never persisted, only raw answers, so a change to the scoring config never resurrects a stale level.
4. The result screen carries a visible control that clears the key.
5. `version` exists so a future schema change can drop an incompatible run instead of misreading it.
6. No answer, result, timing, or partial payload is sent anywhere. There is no fetch call in the app.
