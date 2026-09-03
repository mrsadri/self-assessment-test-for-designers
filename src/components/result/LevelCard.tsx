import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LEVELS } from '@/config/levels';
import { CEILING_NOTICE, SUB_LEVEL_DESCRIPTION, SUB_LEVEL_LABEL } from '@/config/copy';
import { LadderStrip } from './LadderStrip';
import type { Assessment } from '@/types';

export function LevelCard({ assessment }: { assessment: Assessment }) {
  const level = LEVELS.find((l) => l.id === assessment.level)!;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-baseline gap-2 text-2xl">
          <span>{level.name}</span>
          <span className="tabular-fa text-primary">{assessment.displayLevel}</span>
        </CardTitle>
        <CardDescription className="flex flex-col gap-0.5">
          <span className="font-medium text-foreground">{SUB_LEVEL_LABEL[assessment.subLevel]}</span>
          <span>{SUB_LEVEL_DESCRIPTION[assessment.subLevel]}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="leading-relaxed">{level.faSummary}</p>
        <LadderStrip current={assessment.level} />
        {assessment.atCeiling && (
          <p className="rounded-lg bg-muted p-3 text-sm leading-relaxed">{CEILING_NOTICE}</p>
        )}
      </CardContent>
    </Card>
  );
}
