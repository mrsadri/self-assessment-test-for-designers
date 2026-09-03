import { LEVELS } from '@/config/levels';
import { DIVERGENCE } from '@/config/copy';
import { ClusterTable } from './ClusterTable';
import type { Assessment, DivergenceReport } from '@/types';

function MiniResult({ title, assessment }: { title: string; assessment: Assessment }) {
  const level = LEVELS.find((l) => l.id === assessment.level)!;
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border p-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="tabular-fa text-xl">
        {level.name} <span className="text-primary">{assessment.displayLevel}</span>
      </p>
      <ClusterTable clusters={assessment.clusters} />
    </div>
  );
}

export function DivergencePanel({
  self,
  scenario,
  divergence,
}: {
  self: Assessment;
  scenario: Assessment;
  divergence: DivergenceReport;
}) {
  const deltaAbs = Math.abs(divergence.delta).toFixed(1);
  const deltaText =
    divergence.delta > 0 ? `+${deltaAbs}` : divergence.delta < 0 ? `-${deltaAbs}` : deltaAbs;

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm leading-relaxed text-muted-foreground">{DIVERGENCE.header}</p>

      {/* Self-assessment first in DOM order so it lands on the right in RTL reading order. */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MiniResult title={DIVERGENCE.selfCardTitle} assessment={self} />
        <MiniResult title={DIVERGENCE.scenarioCardTitle} assessment={scenario} />
      </div>

      <p className="tabular-fa text-center font-medium">
        {DIVERGENCE.deltaLabel}: {deltaText}
      </p>
      <p className="leading-relaxed">{divergence.faExplanation}</p>
    </div>
  );
}
