import { COMPETENCIES } from '@/config/competencies';
import { RESULT } from '@/config/copy';
import type { CompetencyId } from '@/types';

function names(ids: readonly CompetencyId[]): string {
  return ids.map((id) => COMPETENCIES.find((c) => c.id === id)!.fa).join('، ');
}

export function StrongestWeakest({
  strongest,
  weakest,
}: {
  strongest: readonly CompetencyId[];
  weakest: readonly CompetencyId[];
}) {
  if (strongest.length === 0 && weakest.length === 0) return null;
  return (
    <div className="flex flex-col gap-4">
      {strongest.length > 0 && (
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">{RESULT.strongestTitle}</h3>
          <p>{names(strongest)}</p>
          <p className="text-sm text-muted-foreground">{RESULT.strongestLine}</p>
        </div>
      )}
      {weakest.length > 0 && (
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">{RESULT.weakestTitle}</h3>
          <p>{names(weakest)}</p>
          <p className="text-sm text-muted-foreground">{RESULT.weakestLine}</p>
        </div>
      )}
    </div>
  );
}
