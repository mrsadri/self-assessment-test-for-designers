import type { SalaryBand } from '@/types';

/**
 * Toman bands, copied digit by digit from career_ladder_matrix.md.
 * Persian digits in the source converted to Latin, values otherwise untouched.
 */
export const SALARY_BANDS: readonly SalaryBand[] = [
  { level: 'rising',      min:  33_449_600, max:  39_574_400, currency: 'IRT', source: 'career_ladder_matrix.md' },
  { level: 'formed',      min:  45_699_200, max:  61_957_760, currency: 'IRT', source: 'career_ladder_matrix.md' },
  { level: 'mature',      min:  72_425_600, max:  97_147_520, currency: 'IRT', source: 'career_ladder_matrix.md' },
  { level: 'valiant',     min: 112_181_119, max: 148_818_560, currency: 'IRT', source: 'career_ladder_matrix.md' },
  { level: 'heroic',      min: 169_865_599, max: 226_213_760, currency: 'IRT', source: 'career_ladder_matrix.md' },
  { level: 'grandmaster', min: 250_865_599, max: null,        currency: 'IRT', source: 'career_ladder_matrix.md' },
] as const satisfies readonly SalaryBand[];
