import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { CLUSTERS } from '@/config/clusters';
import { QUESTIONS } from '@/config/questions';
import type { CompetencyId, ClusterId, Mode, Track } from '@/types';
import {
  buildAssessment,
  resolveOutcome,
  resolveLevel,
  round1,
  subLevelFromFRel,
  weightedSum,
} from './scoring';

function answerAll(kind: 'self' | 'scenario' | 'both', optionId: 'a' | 'b' | 'c' | 'd'): Record<string, 'a' | 'b' | 'c' | 'd'> {
  const answers: Record<string, 'a' | 'b' | 'c' | 'd'> = {};
  for (const q of QUESTIONS) {
    if (kind !== 'both' && q.kind !== kind) continue;
    answers[q.id] = optionId;
  }
  return answers;
}

describe('vector 1: spreadsheet Example arithmetic', () => {
  it('reproduces F = 2.875 and sub-level X.2 under Mid-Level weights', () => {
    const scores = new Map<ClusterId, number>([
      ['clarity-trust', 3.0],
      ['insight-data', 2.5],
      ['consistency-excellence', 3.0],
      ['growth-ownership', 3.0],
    ]);
    const raw = weightedSum(scores, 'mid-level');
    expect(raw).toBeCloseTo(2.875, 9);
    expect(subLevelFromFRel(round1(raw))).toBe('x2');
  });
});

describe('vectors 2-5: uniform answers, IC track', () => {
  const cases: Array<{ option: 'a' | 'b' | 'c' | 'd'; level: string; display: string; fAbs: number }> = [
    { option: 'a', level: 'rising', display: '1.2', fAbs: 1.0 },
    { option: 'b', level: 'formed', display: '2.2', fAbs: 2.0 },
    { option: 'c', level: 'mature', display: '3.2', fAbs: 3.0 },
    { option: 'd', level: 'valiant', display: '4.2', fAbs: 4.0 },
  ];

  for (const { option, level, display, fAbs } of cases) {
    it(`option ${option} on every self question gives ${level} ${display}`, () => {
      const outcome = resolveOutcome(answerAll('self', option), 'ic', 'self');
      const a = outcome.combined!;
      expect(a.level).toBe(level);
      expect(a.fAbs).toBeCloseTo(fAbs, 9);
      expect(a.fRel).toBeCloseTo(3.0, 9);
      expect(a.subLevel).toBe('x2');
      expect(a.displayLevel).toBe(display);
    });
  }
});

describe('vector 6: Management track reproduces the same levels and sub-levels', () => {
  const cases: Array<{ option: 'a' | 'b' | 'c' | 'd'; level: string; display: string }> = [
    { option: 'a', level: 'rising', display: '1.2' },
    { option: 'b', level: 'formed', display: '2.2' },
    { option: 'c', level: 'mature', display: '3.2' },
    { option: 'd', level: 'valiant', display: '4.2' },
  ];
  for (const { option, level, display } of cases) {
    it(`option ${option}, Management track`, () => {
      const outcome = resolveOutcome(answerAll('self', option), 'mgmt', 'self');
      const a = outcome.combined!;
      expect(a.level).toBe(level);
      expect(a.displayLevel).toBe(display);
    });
  }
});

describe('vector 7: empty self-consistent set triggers the fallback', () => {
  it('C = 1.000/1.000/1.167/2.833 IC resolves to Rising via fallback', () => {
    const scores = new Map<ClusterId, number>([
      ['clarity-trust', 1.0],
      ['insight-data', 1.0],
      ['consistency-excellence', 1.1666666666666667],
      ['growth-ownership', 2.8333333333333335],
    ]);
    const { level, usedFallback } = resolveLevel(scores, 'ic');
    expect(usedFallback).toBe(true);
    expect(level).toBe('rising');
  });
});

describe('vector 8: docs/02 section 8 worked example', () => {
  // Self-assessment anchors are the mean of that competency's two questions, so we pick
  // option pairs whose scores average to the anchors in the worked example.
  // SA ids alternate 1..30, each pair (SA01/SA02, SA03/SA04, ...) belongs to one competency.
  const selfPairAnchors: Record<CompetencyId, number> = {
    'complexity-translation': 3.0,
    'problem-definition': 3.5,
    'strategic-alignment': 2.5,
    'product-thinking': 3.0,
    'evidence-based-design': 2.5,
    'discovery-execution': 2.0,
    'solution-accountability': 3.0,
    craftsmanship: 4.0,
    'system-stewardship': 3.5,
    'shipping-design': 3.5,
    'technical-velocity': 3.0,
    'chapter-contribution': 2.5,
    'learning-growth': 3.5,
    adaptability: 3.0,
    mentorship: 3.0,
  };
  const scenarioAnchors: Partial<Record<CompetencyId, number>> = {
    'complexity-translation': 3,
    'problem-definition': 3,
    'strategic-alignment': 2,
    'evidence-based-design': 2,
    'discovery-execution': 2,
    'solution-accountability': 2,
    craftsmanship: 3,
    'system-stewardship': 3,
    adaptability: 3,
    mentorship: 2,
  };

  const optionScoreOf = (qId: string, want: number) =>
    QUESTIONS.find((q) => q.id === qId)!.options.find((o) => o.score === want)!.id;

  function buildAnswers(): Record<string, 'a' | 'b' | 'c' | 'd'> {
    const answers: Record<string, 'a' | 'b' | 'c' | 'd'> = {};
    // Two self questions per competency: pick integer scores that average to the target anchor.
    const selfPairs: Array<[string, string, CompetencyId]> = [
      ['SA01', 'SA02', 'complexity-translation'],
      ['SA03', 'SA04', 'problem-definition'],
      ['SA05', 'SA06', 'strategic-alignment'],
      ['SA07', 'SA08', 'product-thinking'],
      ['SA09', 'SA10', 'evidence-based-design'],
      ['SA11', 'SA12', 'discovery-execution'],
      ['SA13', 'SA14', 'solution-accountability'],
      ['SA15', 'SA16', 'craftsmanship'],
      ['SA17', 'SA18', 'system-stewardship'],
      ['SA19', 'SA20', 'shipping-design'],
      ['SA21', 'SA22', 'technical-velocity'],
      ['SA23', 'SA24', 'chapter-contribution'],
      ['SA25', 'SA26', 'learning-growth'],
      ['SA27', 'SA28', 'adaptability'],
      ['SA29', 'SA30', 'mentorship'],
    ];
    for (const [q1, q2, comp] of selfPairs) {
      const target = selfPairAnchors[comp];
      const lo = Math.floor(target);
      const hi = Math.ceil(target);
      answers[q1] = optionScoreOf(q1, lo);
      answers[q2] = optionScoreOf(q2, hi === lo ? lo : hi);
    }
    const scenarioIdByCompetency: Partial<Record<CompetencyId, string>> = {
      'complexity-translation': 'SC01',
      'problem-definition': 'SC02',
      'strategic-alignment': 'SC03',
      'evidence-based-design': 'SC04',
      'discovery-execution': 'SC05',
      'solution-accountability': 'SC06',
      craftsmanship: 'SC07',
      'system-stewardship': 'SC08',
      mentorship: 'SC09',
      adaptability: 'SC10',
    };
    for (const [comp, score] of Object.entries(scenarioAnchors) as Array<[CompetencyId, number]>) {
      const qId = scenarioIdByCompetency[comp]!;
      answers[qId] = optionScoreOf(qId, score);
    }
    return answers;
  }

  it('produces the split result with delta = +0.5', () => {
    const outcome = resolveOutcome(buildAnswers(), 'ic', 'both');
    expect(outcome.divergence).toBeDefined();
    expect(outcome.divergence!.shouldSplit).toBe(true);
    expect(outcome.divergence!.delta).toBeCloseTo(0.5, 9);
    expect(outcome.divergence!.direction).toBe('self-higher');

    expect(outcome.self!.level).toBe('mature');
    expect(outcome.self!.displayLevel).toBe('3.2');
    expect(outcome.self!.salary.point).toBeCloseTo(84_197_943, 0);

    expect(outcome.scenario!.level).toBe('mature');
    expect(outcome.scenario!.displayLevel).toBe('3.1');
    expect(outcome.scenario!.salary.point).toBeCloseTo(80_322_880, 0);
  });
});

describe('config invariants', () => {
  it('every matrix column weight sums to 1.000 across clusters within 1e-9', () => {
    const columns = ['junior', 'mid-level', 'senior', 'staff', 'lead', 'principal', 'manager'] as const;
    for (const col of columns) {
      const sum = CLUSTERS.reduce((acc, c) => acc + c.weights[col], 0);
      expect(Math.abs(sum - 1)).toBeLessThan(1e-9);
    }
  });
});

describe('property: the engine never throws and always resolves an assessable level', () => {
  it('over 10,000 random answer sets', () => {
    const modes: Mode[] = ['self', 'scenario', 'both'];
    const tracks: Track[] = ['ic', 'mgmt'];
    const optionIds = ['a', 'b', 'c', 'd'] as const;

    fc.assert(
      fc.property(
        fc.constantFrom(...modes),
        fc.constantFrom(...tracks),
        fc.array(fc.constantFrom(...optionIds), { minLength: QUESTIONS.length, maxLength: QUESTIONS.length }),
        (mode, track, choices) => {
          const answers: Record<string, 'a' | 'b' | 'c' | 'd'> = {};
          QUESTIONS.forEach((q, i) => {
            const relevant = mode === 'both' || q.kind === mode;
            if (relevant) answers[q.id] = choices[i];
          });
          const outcome = resolveOutcome(answers, track, mode);
          const assessments = [outcome.combined, outcome.self, outcome.scenario].filter((a) => a !== undefined);
          expect(assessments.length).toBeGreaterThan(0);
          for (const a of assessments) {
            expect(['rising', 'formed', 'mature', 'valiant']).toContain(a.level);
            expect(a.fRel).toBeGreaterThanOrEqual(0.2);
            expect(a.fRel).toBeLessThanOrEqual(4.0);
          }
        },
      ),
      { numRuns: 10_000 },
    );
  });
});

describe('buildAssessment is exported and pure', () => {
  it('produces a deterministic result for a fixed anchor map', () => {
    const anchors = new Map<CompetencyId, number>([['complexity-translation', 2]]);
    const a1 = buildAssessment('self', 'ic', anchors);
    const a2 = buildAssessment('self', 'ic', anchors);
    expect(a1).toEqual(a2);
  });
});
