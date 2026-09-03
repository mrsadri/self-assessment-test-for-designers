import { CLUSTERS } from '@/config/clusters';
import { COMPETENCIES } from '@/config/competencies';
import { MATRIX_COLUMN_LABEL, RESULT } from '@/config/copy';
import { anchorMatrixColumn } from '@/lib/scoring';
import { cn } from '@/lib/utils';
import type { Assessment } from '@/types';

export function CompetencyBreakdown({ assessment }: { assessment: Assessment }) {
  return (
    <div className="flex flex-col gap-6">
      {CLUSTERS.map((cluster) => (
        <div key={cluster.id} className="flex flex-col gap-2">
          <h3 className="font-semibold">{cluster.fa}</h3>
          <ul className="flex flex-col gap-2">
            {COMPETENCIES.filter((c) => c.cluster === cluster.id).map((c) => {
              const result = assessment.competencies.find((r) => r.competency === c.id)!;
              return (
                <li
                  key={c.id}
                  className={cn('rounded-lg border border-border p-3', !result.measured && 'opacity-50')}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{c.fa}</span>
                    {result.measured ? (
                      <span className="tabular-fa shrink-0 text-sm text-muted-foreground">
                        {RESULT.competencyColumnLabel(
                          MATRIX_COLUMN_LABEL[anchorMatrixColumn(result.anchor, assessment.track)],
                        )}
                      </span>
                    ) : (
                      <span className="shrink-0 text-sm text-muted-foreground">
                        {RESULT.competencyNotMeasured}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{c.faShort}</p>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
