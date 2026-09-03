import type { ReactNode } from 'react';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

interface OptionCardProps {
  id: string;
  value: string;
  title: ReactNode;
  description?: ReactNode;
  badge?: ReactNode;
  className?: string;
}

/** A full-width, tappable-anywhere radio card. See docs/05 section 1.3. */
export function OptionCard({ id, value, title, description, badge, className }: OptionCardProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'flex w-full cursor-pointer items-start gap-3 rounded-xl border border-border p-4 transition-colors',
        'has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5',
        'has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50',
        className,
      )}
    >
      <RadioGroupItem value={value} id={id} className="mt-1" />
      <span className="flex-1">
        <span className="flex items-center gap-2">
          <span className="font-medium">{title}</span>
          {badge}
        </span>
        {description && <span className="mt-1 block text-sm text-muted-foreground">{description}</span>}
      </span>
    </label>
  );
}
