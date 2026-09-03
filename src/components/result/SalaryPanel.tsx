import { LEVELS } from '@/config/levels';
import { formatToman, RESULT } from '@/config/copy';
import type { Assessment } from '@/types';

export function SalaryPanel({ assessment }: { assessment: Assessment }) {
  const level = LEVELS.find((l) => l.id === assessment.level)!;
  const { band, point, position } = assessment.salary;
  const positionPct = position * 100;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold">{RESULT.salaryBandLabel(level.name)}</h3>
      <p className="tabular-fa text-lg">
        {formatToman(band.min)} تا {band.max !== null ? formatToman(band.max) : RESULT.salaryOpenCeiling}{' '}
        {RESULT.toman}
      </p>
      {band.max !== null && (
        <div className="relative h-2 w-full rounded-full bg-muted" aria-hidden="true">
          <div
            className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-primary ring-2 ring-background"
            style={{ insetInlineStart: `calc(${positionPct}% - 6px)` }}
          />
        </div>
      )}
      {point !== null && (
        <p className="tabular-fa text-sm font-medium">
          {RESULT.salaryPositionLabel(`${formatToman(Math.round(point))} ${RESULT.toman}`)}
        </p>
      )}
      <p className="text-sm text-muted-foreground">{RESULT.salaryCaveat}</p>
    </div>
  );
}
