import { Navigate } from 'react-router-dom';
import { LevelCard } from '@/components/result/LevelCard';
import { ClusterTable } from '@/components/result/ClusterTable';
import { CompetencyBreakdown } from '@/components/result/CompetencyBreakdown';
import { StrongestWeakest } from '@/components/result/StrongestWeakest';
import { SalaryPanel } from '@/components/result/SalaryPanel';
import { DivergencePanel } from '@/components/result/DivergencePanel';
import { ResultFooter } from '@/components/result/ResultFooter';
import { CtaCard } from '@/components/result/CtaCard';
import { TRACK_NOT_DECLARED_NOTE } from '@/config/copy';
import { resolveOutcome } from '@/lib/scoring';
import { useRunState } from '@/state/run';

export function ResultPage() {
  const state = useRunState();

  if (!state.mode || Object.keys(state.answers).length === 0) {
    return <Navigate to="/setup" replace />;
  }

  const outcome = resolveOutcome(state.answers, state.track, state.mode);

  return (
    <div className="flex flex-col gap-10">
      {!state.trackDeclared && (
        <p className="text-sm text-muted-foreground">{TRACK_NOT_DECLARED_NOTE}</p>
      )}

      {outcome.combined && (
        <>
          <LevelCard assessment={outcome.combined} />
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">خوشه‌ها</h2>
            <ClusterTable clusters={outcome.combined.clusters} />
          </section>
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">شایستگی‌ها</h2>
            <CompetencyBreakdown assessment={outcome.combined} />
          </section>
          <StrongestWeakest strongest={outcome.combined.strongest} weakest={outcome.combined.weakest} />
          <SalaryPanel assessment={outcome.combined} />
        </>
      )}

      {outcome.self && outcome.scenario && outcome.divergence && (
        <DivergencePanel self={outcome.self} scenario={outcome.scenario} divergence={outcome.divergence} />
      )}

      <ResultFooter />
      <CtaCard />
    </div>
  );
}
