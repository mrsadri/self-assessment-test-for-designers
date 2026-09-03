import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { COMPETENCIES } from './competencies';
import { QUESTIONS } from './questions';
import { SALARY_BANDS } from './salary';

describe('question bank invariants (docs/04 section 7)', () => {
  it('has exactly 40 questions', () => {
    expect(QUESTIONS.length).toBe(40);
  });

  it('has 30 self and 10 scenario questions', () => {
    expect(QUESTIONS.filter((q) => q.kind === 'self').length).toBe(30);
    expect(QUESTIONS.filter((q) => q.kind === 'scenario').length).toBe(10);
  });

  it('every option set is a permutation of [1,2,3,4]', () => {
    for (const q of QUESTIONS) {
      const scores = q.options.map((o) => o.score).sort();
      expect(scores).toEqual([1, 2, 3, 4]);
    }
  });

  it('every competency appears in exactly 2 self questions', () => {
    for (const c of COMPETENCIES) {
      const count = QUESTIONS.filter((q) => q.kind === 'self' && q.competency === c.id).length;
      expect(count).toBe(2);
    }
  });

  it('no competency appears in more than 1 scenario question', () => {
    for (const c of COMPETENCIES) {
      const count = QUESTIONS.filter((q) => q.kind === 'scenario' && q.competency === c.id).length;
      expect(count).toBeLessThanOrEqual(1);
    }
  });

  it('every self question is in ascending score order', () => {
    for (const q of QUESTIONS.filter((x) => x.kind === 'self')) {
      const scores = q.options.map((o) => o.score);
      expect(scores).toEqual([1, 2, 3, 4]);
    }
  });

  it('no scenario question is in ascending score order', () => {
    for (const q of QUESTIONS.filter((x) => x.kind === 'scenario')) {
      const scores = q.options.map((o) => o.score);
      expect(scores).not.toEqual([1, 2, 3, 4]);
    }
  });

  it('every question id is unique and matches /^S[AC]\\d{2}$/', () => {
    const ids = QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^S[AC]\d{2}$/);
  });

  it('every competency value exists in COMPETENCIES', () => {
    const known = new Set(COMPETENCIES.map((c) => c.id));
    for (const q of QUESTIONS) expect(known.has(q.competency)).toBe(true);
  });
});

describe('salary bands (docs/04 section 6, career_ladder_matrix.md)', () => {
  it('match the source file digit by digit', () => {
    const expected: Record<string, { min: number; max: number | null }> = {
      rising: { min: 33_449_600, max: 39_574_400 },
      formed: { min: 45_699_200, max: 61_957_760 },
      mature: { min: 72_425_600, max: 97_147_520 },
      valiant: { min: 112_181_119, max: 148_818_560 },
      heroic: { min: 169_865_599, max: 226_213_760 },
      grandmaster: { min: 250_865_599, max: null },
    };
    for (const band of SALARY_BANDS) {
      expect(band.min).toBe(expected[band.level].min);
      expect(band.max).toBe(expected[band.level].max);
    }
  });
});

describe('no placeholder content ships to a build', () => {
  it('no non-test file under src/ contains the placeholder marker', () => {
    const marker = ['[TBD', ':'].join('');
    const srcDir = path.resolve(import.meta.dirname, '..');
    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir)) {
        const full = path.join(dir, entry);
        const stat = statSync(full);
        if (stat.isDirectory()) walk(full);
        else if (/\.(ts|tsx)$/.test(entry) && !entry.endsWith('.test.ts')) {
          const content = readFileSync(full, 'utf-8');
          if (content.includes(marker)) offenders.push(full);
        }
      }
    };
    walk(srcDir);
    expect(offenders).toEqual([]);
  });
});
