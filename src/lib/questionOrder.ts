import { QUESTIONS } from '@/config/questions';
import type { Mode, Question } from '@/types';

/**
 * In `both` mode the 10 scenario questions come before the 30 self-assessment
 * questions, so answering self-descriptions doesn't prime scenario choices.
 * See docs/05 section 1.3.
 */
export function orderedQuestions(mode: Mode): readonly Question[] {
  if (mode === 'self') return QUESTIONS.filter((q) => q.kind === 'self');
  if (mode === 'scenario') return QUESTIONS.filter((q) => q.kind === 'scenario');
  return [...QUESTIONS.filter((q) => q.kind === 'scenario'), ...QUESTIONS.filter((q) => q.kind === 'self')];
}
