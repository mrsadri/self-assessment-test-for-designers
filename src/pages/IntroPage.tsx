import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { INTRO } from '@/config/copy';
import { useRunDispatch } from '@/state/run';

export function IntroPage() {
  const navigate = useNavigate();
  const dispatch = useRunDispatch();
  const [persist, setPersist] = useState(false);

  function handleStart() {
    dispatch({ type: 'SET_PERSIST', persist });
    navigate('/setup');
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">{INTRO.title}</h1>
      <p className="text-base leading-relaxed text-foreground">{INTRO.whatItIs}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">{INTRO.whatItIsNot}</p>
      <p className="rounded-lg bg-muted p-4 text-sm leading-relaxed text-muted-foreground">{INTRO.privacy}</p>

      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          className="mt-1 size-4 shrink-0"
          checked={persist}
          onChange={(e) => setPersist(e.target.checked)}
        />
        <span>
          {INTRO.persistLabel}
          <span className="block text-xs text-muted-foreground">{INTRO.persistHelper}</span>
        </span>
      </label>

      <Button onClick={handleStart} size="lg" className="w-full">
        {INTRO.start}
      </Button>
    </div>
  );
}
