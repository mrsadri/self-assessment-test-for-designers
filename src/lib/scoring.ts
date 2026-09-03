import { CLUSTERS } from '@/config/clusters';
import { COMPETENCIES } from '@/config/competencies';
import { LEVELS } from '@/config/levels';
import { SALARY_BANDS } from '@/config/salary';
import { QUESTIONS } from '@/config/questions';
import { DIVERGENCE } from '@/config/copy';
import type {
  Assessment,
  ClusterId,
  ClusterResult,
  CompetencyId,
  CompetencyResult,
  DivergenceReport,
  LevelId,
  MatrixColumn,
  Mode,
  Outcome,
  QuestionKind,
  SalaryBand,
  SubLevel,
  Track,
} from '@/types';

/** The 10 competencies covered by both instruments. See docs/03 section 2.2. */
export const SHARED_COMPETENCIES: readonly CompetencyId[] = [
  'complexity-translation', 'problem-definition', 'strategic-alignment',
  'evidence-based-design', 'discovery-execution', 'solution-accountability',
  'craftsmanship', 'system-stewardship', 'adaptability', 'mentorship',
];

const ASSESSABLE_LEVELS = LEVELS.filter((l) => l.assessable);

const BAND_RANGE: Record<'rising' | 'formed' | 'mature' | 'valiant', readonly [number, number]> = {
  rising: [1.0, 1.4],
  formed: [1.5, 2.4],
  mature: [2.5, 3.4],
  valiant: [3.5, 4.0],
};

function clamp(x: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, x));
}

/** Rounds half away from zero to one decimal place. Applied once and only once. See docs/02 section 9. */
export function round1(x: number): number {
  return Math.round(x * 10 + 1e-9) / 10;
}

function ordinal(level: LevelId): number {
  return LEVELS.find((l) => l.id === level)!.ordinal;
}

export function matrixColumnFor(level: LevelId, track: Track): MatrixColumn {
  const lvl = LEVELS.find((l) => l.id === level)!;
  const col = track === 'ic' ? lvl.column.ic : lvl.column.mgmt;
  if (!col) throw new Error(`level ${level} has no matrix column`);
  return col;
}

/**
 * The matrix column an anchor score corresponds to, per the fixed global mapping
 * in docs/02 section 2 (1=Junior, 2=Mid-Level, 3=Senior, 4=Staff/Lead by track).
 * Purely presentational: never used inside the scoring pipeline itself.
 */
export function anchorMatrixColumn(anchor: number, track: Track): MatrixColumn {
  const rounded = clamp(Math.round(anchor), 1, 4);
  if (rounded === 1) return 'junior';
  if (rounded === 2) return 'mid-level';
  if (rounded === 3) return 'senior';
  return track === 'ic' ? 'staff' : 'lead';
}

export function weightedSum(clusterScores: ReadonlyMap<ClusterId, number>, column: MatrixColumn): number {
  let sum = 0;
  for (const cluster of CLUSTERS) {
    sum += cluster.weights[column] * (clusterScores.get(cluster.id) ?? 0);
  }
  return sum;
}

/** Per-competency mean of chosen option scores, over questions of the given kind that were answered. */
export function competencyAnchors(
  answers: Readonly<Record<string, 'a' | 'b' | 'c' | 'd'>>,
  kind: QuestionKind,
): Map<CompetencyId, number> {
  const byCompetency = new Map<CompetencyId, number[]>();
  for (const q of QUESTIONS) {
    if (q.kind !== kind) continue;
    const chosen = answers[q.id];
    if (!chosen) continue;
    const opt = q.options.find((o) => o.id === chosen);
    if (!opt) continue;
    const arr = byCompetency.get(q.competency) ?? [];
    arr.push(opt.score);
    byCompetency.set(q.competency, arr);
  }
  const anchors = new Map<CompetencyId, number>();
  for (const [comp, scores] of byCompetency) {
    anchors.set(comp, scores.reduce((a, b) => a + b, 0) / scores.length);
  }
  return anchors;
}

/** A competency covered by both takes the mean of its self and scenario anchors. See docs/02 section 7.1. */
export function combinedAnchors(
  selfAnchors: ReadonlyMap<CompetencyId, number>,
  scenarioAnchors: ReadonlyMap<CompetencyId, number>,
): Map<CompetencyId, number> {
  const result = new Map<CompetencyId, number>();
  const allComps = new Set<CompetencyId>([...selfAnchors.keys(), ...scenarioAnchors.keys()]);
  for (const comp of allComps) {
    const s = selfAnchors.get(comp);
    const c = scenarioAnchors.get(comp);
    if (s !== undefined && c !== undefined) result.set(comp, (s + c) / 2);
    else if (s !== undefined) result.set(comp, s);
    else if (c !== undefined) result.set(comp, c);
  }
  return result;
}

interface ClusterAgg {
  score: number;
  measuredCount: number;
  totalCount: number;
}

/** Cluster score is the unweighted mean over measured competencies only. See docs/02 section 3. */
export function clusterAggregates(scores: ReadonlyMap<CompetencyId, number>): Map<ClusterId, ClusterAgg> {
  const byCluster = new Map<ClusterId, { sum: number; count: number; total: number }>();
  for (const comp of COMPETENCIES) {
    const entry = byCluster.get(comp.cluster) ?? { sum: 0, count: 0, total: 0 };
    entry.total += 1;
    if (scores.has(comp.id)) {
      entry.sum += scores.get(comp.id)!;
      entry.count += 1;
    }
    byCluster.set(comp.cluster, entry);
  }
  const result = new Map<ClusterId, ClusterAgg>();
  for (const [cluster, e] of byCluster) {
    result.set(cluster, {
      score: e.count > 0 ? e.sum / e.count : 0,
      measuredCount: e.count,
      totalCount: e.total,
    });
  }
  return result;
}

function bandLevel(f: number): LevelId {
  if (f <= 1.4) return 'rising';
  if (f <= 2.4) return 'formed';
  if (f <= 3.4) return 'mature';
  return 'valiant';
}

function distanceToOwnBand(f: number, level: 'rising' | 'formed' | 'mature' | 'valiant'): number {
  const [lo, hi] = BAND_RANGE[level];
  if (f < lo) return lo - f;
  if (f > hi) return f - hi;
  return 0;
}

/**
 * Resolves the self-consistent level, or falls back to the nearest-own-band
 * candidate (ties to the lower level) when no candidate is self-consistent.
 * See docs/02 section 4.1.
 */
export function resolveLevel(
  clusterScores: ReadonlyMap<ClusterId, number>,
  track: Track,
): { level: LevelId; fAbs: number; usedFallback: boolean } {
  const candidates = ASSESSABLE_LEVELS.map((l) => l.id) as ('rising' | 'formed' | 'mature' | 'valiant')[];
  const fs = new Map<LevelId, number>();
  for (const level of candidates) {
    fs.set(level, round1(weightedSum(clusterScores, matrixColumnFor(level, track))));
  }
  const selfConsistent = candidates.filter((level) => bandLevel(fs.get(level)!) === level);
  if (selfConsistent.length >= 1) {
    const lowest = selfConsistent.reduce((a, b) => (ordinal(a) < ordinal(b) ? a : b));
    return { level: lowest, fAbs: fs.get(lowest)!, usedFallback: false };
  }
  let best: LevelId = candidates[0];
  let bestDist = Infinity;
  for (const level of candidates) {
    const dist = distanceToOwnBand(fs.get(level)!, level);
    if (dist < bestDist - 1e-9) {
      bestDist = dist;
      best = level;
    }
  }
  return { level: best, fAbs: fs.get(best)!, usedFallback: true };
}

function relativeAnchor(anchor: number, levelOrdinal: number): number {
  return clamp(anchor - levelOrdinal + 3, 1, 4);
}

export function subLevelFromFRel(fRel: number): SubLevel {
  if (fRel <= 2.6) return 'x1';
  if (fRel <= 3.4) return 'x2';
  return 'x3';
}

/** 0..1 position inside the salary band. See docs/02 section 6. */
export function salaryPosition(fRel: number): number {
  let t: number;
  let u: number;
  if (fRel <= 2.6) {
    t = 0;
    u = (fRel - 0.2) / 2.4;
  } else if (fRel <= 3.4) {
    t = 1;
    u = (fRel - 2.7) / 0.7;
  } else {
    t = 2;
    u = (fRel - 3.5) / 0.5;
  }
  return clamp((t + u) / 3, 0, 1);
}

function salaryPointFor(band: SalaryBand, position: number): number | null {
  if (band.max === null) return null;
  return band.min + (band.max - band.min) * position;
}

const SUB_LEVEL_DIGIT: Record<SubLevel, 1 | 2 | 3> = { x1: 1, x2: 2, x3: 3 };

/**
 * Builds a full Assessment from per-competency anchors. `mode` only labels which
 * instrument the anchors came from; the pipeline itself (docs/02 section 9) is identical
 * for self, scenario and combined anchors.
 */
export function buildAssessment(
  mode: Mode,
  track: Track,
  anchors: ReadonlyMap<CompetencyId, number>,
): Assessment {
  const clusterAnchorAgg = clusterAggregates(anchors);
  const clusterScoreOnly = new Map<ClusterId, number>();
  for (const [k, v] of clusterAnchorAgg) clusterScoreOnly.set(k, v.score);

  const { level, fAbs, usedFallback } = resolveLevel(clusterScoreOnly, track);
  const levelOrdinal = ordinal(level);

  const relatives = new Map<CompetencyId, number>();
  for (const [comp, a] of anchors) relatives.set(comp, relativeAnchor(a, levelOrdinal));

  const clusterRelAgg = clusterAggregates(relatives);
  const clusterRelOnly = new Map<ClusterId, number>();
  for (const [k, v] of clusterRelAgg) clusterRelOnly.set(k, v.score);

  const column = matrixColumnFor(level, track);
  const fRel = round1(weightedSum(clusterRelOnly, column));
  const subLevel = subLevelFromFRel(fRel);
  const displayLevel = `${levelOrdinal}.${SUB_LEVEL_DIGIT[subLevel]}`;

  const clusterResults: readonly ClusterResult[] = CLUSTERS.map((cluster) => {
    const agg = clusterAnchorAgg.get(cluster.id)!;
    const relAgg = clusterRelAgg.get(cluster.id)!;
    return {
      cluster: cluster.id,
      score: agg.score,
      relative: relAgg.score,
      weight: cluster.weights[column],
      measuredCount: agg.measuredCount,
      totalCount: agg.totalCount,
    };
  });

  const competencyResults: readonly CompetencyResult[] = COMPETENCIES.map((c) => {
    const measured = anchors.has(c.id);
    return {
      competency: c.id,
      anchor: measured ? anchors.get(c.id)! : 0,
      relative: measured ? relatives.get(c.id)! : 0,
      measured,
    };
  });

  const { strongest, weakest } = strongestAndWeakest(competencyResults);

  const band = SALARY_BANDS.find((b) => b.level === level)!;
  const position = salaryPosition(fRel);
  const point = salaryPointFor(band, position);

  return {
    mode,
    track,
    level,
    subLevel,
    displayLevel,
    fAbs,
    fRel,
    usedFallback,
    clusters: clusterResults,
    competencies: competencyResults,
    strongest,
    weakest,
    salary: { band, position, point },
    atCeiling: level === 'valiant',
  };
}

/**
 * Up to 3 each, ties included, measured competencies only, never overlapping.
 * When the measured set has no variance at all (every anchor identical), the two
 * candidate sets fully overlap; both are returned empty rather than showing the
 * same competencies as both strongest and weakest. See docs/05 section 2.5.
 */
function strongestAndWeakest(
  competencyResults: readonly CompetencyResult[],
): { strongest: CompetencyId[]; weakest: CompetencyId[] } {
  const measured = competencyResults.filter((c) => c.measured);
  if (measured.length === 0) return { strongest: [], weakest: [] };

  const sortedDesc = [...measured].sort((a, b) => b.anchor - a.anchor);
  const sortedAsc = [...measured].sort((a, b) => a.anchor - b.anchor);
  const n = Math.min(3, measured.length);
  const highCutoff = sortedDesc[n - 1].anchor;
  const lowCutoff = sortedAsc[n - 1].anchor;

  const strongest = sortedDesc.filter((c) => c.anchor >= highCutoff).map((c) => c.competency);
  const weakest = sortedAsc.filter((c) => c.anchor <= lowCutoff).map((c) => c.competency);

  const strongestSet = new Set(strongest);
  if (weakest.some((id) => strongestSet.has(id))) return { strongest: [], weakest: [] };
  return { strongest, weakest };
}

function restrictToShared(anchors: ReadonlyMap<CompetencyId, number>): Map<CompetencyId, number> {
  const result = new Map<CompetencyId, number>();
  for (const id of SHARED_COMPETENCIES) {
    if (anchors.has(id)) result.set(id, anchors.get(id)!);
  }
  return result;
}

function fAbsRestricted(anchors: ReadonlyMap<CompetencyId, number>, level: LevelId, track: Track): number {
  const agg = clusterAggregates(anchors);
  const scoreOnly = new Map<ClusterId, number>();
  for (const [k, v] of agg) scoreOnly.set(k, v.score);
  return round1(weightedSum(scoreOnly, matrixColumnFor(level, track)));
}

/**
 * Divergence is computed on the 10 shared competencies only, under the combined
 * level's weight column. See docs/02 section 7.2 and 7.3.
 */
export function computeDivergence(
  selfAnchors: ReadonlyMap<CompetencyId, number>,
  scenarioAnchors: ReadonlyMap<CompetencyId, number>,
  selfLevel: LevelId,
  scenarioLevel: LevelId,
  combinedLevel: LevelId,
  track: Track,
): DivergenceReport {
  const fSelfShared = fAbsRestricted(restrictToShared(selfAnchors), combinedLevel, track);
  const fScenShared = fAbsRestricted(restrictToShared(scenarioAnchors), combinedLevel, track);
  const delta = round1(fSelfShared - fScenShared);

  const levelMismatch = selfLevel !== scenarioLevel;
  const deltaThreshold = Math.abs(delta) >= 0.5 - 1e-9;
  const shouldSplit = levelMismatch || deltaThreshold;
  const reason: DivergenceReport['reason'] = levelMismatch
    ? 'level-mismatch'
    : deltaThreshold
      ? 'delta-threshold'
      : 'none';
  const direction: DivergenceReport['direction'] =
    delta > 1e-9 ? 'self-higher' : delta < -1e-9 ? 'scenario-higher' : 'aligned';
  const faExplanation =
    direction === 'self-higher'
      ? DIVERGENCE.selfHigher
      : direction === 'scenario-higher'
        ? DIVERGENCE.scenarioHigher
        : '';

  return { delta, shouldSplit, reason, direction, faExplanation };
}

/**
 * Resolves a full Outcome from raw answers. Pure: no React or browser API import.
 * See docs/02 section 9 and docs/05 section 4.6.
 */
export function resolveOutcome(
  answers: Readonly<Record<string, 'a' | 'b' | 'c' | 'd'>>,
  track: Track,
  mode: Mode,
): Outcome {
  if (mode === 'self') {
    return { combined: buildAssessment('self', track, competencyAnchors(answers, 'self')) };
  }
  if (mode === 'scenario') {
    return { combined: buildAssessment('scenario', track, competencyAnchors(answers, 'scenario')) };
  }

  const selfAnchors = competencyAnchors(answers, 'self');
  const scenarioAnchors = competencyAnchors(answers, 'scenario');
  const merged = combinedAnchors(selfAnchors, scenarioAnchors);

  const selfAssessment = buildAssessment('self', track, selfAnchors);
  const scenarioAssessment = buildAssessment('scenario', track, scenarioAnchors);
  const combinedAssessment = buildAssessment('both', track, merged);

  const divergence = computeDivergence(
    selfAnchors,
    scenarioAnchors,
    selfAssessment.level,
    scenarioAssessment.level,
    combinedAssessment.level,
    track,
  );

  if (divergence.shouldSplit) {
    return { self: selfAssessment, scenario: scenarioAssessment, divergence };
  }
  return { combined: combinedAssessment, divergence };
}
