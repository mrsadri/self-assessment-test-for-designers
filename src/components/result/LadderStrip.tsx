import { LEVELS } from '@/config/levels';
import { cn } from '@/lib/utils';
import type { LevelId } from '@/types';

export function LadderStrip({ current }: { current: LevelId }) {
  return (
    <div className="flex flex-col gap-2">
      <ol className="flex w-full rounded-lg border border-border">
        {LEVELS.map((level) => (
          <li
            key={level.id}
            className={cn(
              'flex-1 border-e border-border p-1.5 text-center text-[11px] leading-tight break-words last:border-e-0',
              level.id === current && 'bg-primary font-semibold text-primary-foreground',
              !level.assessable && 'bg-muted text-muted-foreground',
            )}
          >
            {level.name}
          </li>
        ))}
      </ol>
      {LEVELS.filter((l) => !l.assessable).map((l) => (
        <p key={l.id} className="text-xs text-muted-foreground">
          <span className="font-medium">{l.name}:</span> {l.faOutOfRange}
        </p>
      ))}
    </div>
  );
}
