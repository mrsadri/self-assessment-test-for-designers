import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FOOTER } from '@/config/copy';
import { SITE } from '@/config/site';
import { clearSavedRun, hasSavedRun } from '@/lib/persistence';
import { useRunDispatch } from '@/state/run';

export function ResultFooter() {
  const dispatch = useRunDispatch();
  const navigate = useNavigate();
  const [savedExists, setSavedExists] = useState(hasSavedRun());

  function restart() {
    dispatch({ type: 'RESET' });
    navigate('/');
  }

  function clearSaved() {
    clearSavedRun();
    setSavedExists(false);
  }

  return (
    <footer className="flex flex-col gap-4 border-t border-border pt-6 text-sm">
      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="outline" onClick={restart}>
          {FOOTER.restart}
        </Button>
        {savedExists && (
          <Button type="button" variant="ghost" onClick={clearSaved}>
            {FOOTER.clearSaved}
          </Button>
        )}
      </div>
      <p className="text-muted-foreground">{FOOTER.privacy}</p>
      <div className="flex gap-4">
        <a href={SITE.repoUrl} target="_blank" rel="noreferrer" className="underline">
          {FOOTER.repoLinkLabel}
        </a>
        <a href={SITE.methodologyUrl} target="_blank" rel="noreferrer" className="underline">
          {FOOTER.methodologyLinkLabel}
        </a>
      </div>
      <p className="text-muted-foreground">{FOOTER.scopeLine}</p>
    </footer>
  );
}
