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
export type Mode = 'scenario' | 'self' | 'both';

/** Anchor score. 1 = Junior column ... 4 = Staff or Lead column. */
export type AnchorScore = 1 | 2 | 3 | 4;

/** Source rating, sheet Scoring. Derived, never entered directly. */
export type RelativeRating = 1 | 2 | 3 | 4;

export type SubLevel = 'x1' | 'x2' | 'x3';

export interface Cluster {
  id: ClusterId;
  en: string;
  fa: string;
  /** true when the Persian name is authored, not sourced. See docs/01 section 4. */
  faAuthored?: boolean;
  /** Cluster weight per matrix column. Every column must sum to 1 across clusters. */
  weights: Record<MatrixColumn, number>;
}

export interface Competency {
  id: CompetencyId;
  cluster: ClusterId;
  en: string;
  fa: string;
  /** Short Persian line shown on the result breakdown, one clause. */
  faShort: string;
  /** Facets folded in from the Travis and Hodgson checklist. See docs/01 section 3. */
  foldedFacets?: readonly string[];
}

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
  /** false for heroic and grandmaster. See docs/01 section 2.4. */
  assessable: boolean;
  /** Shown when assessable is false. */
  faOutOfRange?: string;
}

export interface SalaryBand {
  level: LevelId;
  /** Toman. Sourced only from career_ladder_matrix.md. Never computed, never converted. */
  min: number;
  /** null means the source says the ceiling is open. */
  max: number | null;
  currency: 'IRT';
  source: 'career_ladder_matrix.md';
}

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
    /** 0..1 position inside the band, from the sub-level. See docs/02 section 6. */
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

/** The only thing ever written to disk: the in-progress run, and only on request. */
export interface SavedRun {
  version: 1;
  savedAt: string;              // ISO 8601
  mode: Mode;
  track: Track;
  /** questionId -> chosen option id. */
  answers: Record<string, 'a' | 'b' | 'c' | 'd'>;
}
