import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RadioGroup } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OptionCard } from '@/components/OptionCard';
import {
  MODE_DESCRIPTION,
  MODE_LABEL,
  MODE_ORDER,
  MODE_QUESTION_COUNT,
  MODE_RECOMMENDED,
  SETUP,
  TRACK_HELPER,
  TRACK_LABEL,
  TRACK_NOT_SURE_LABEL,
  toFaDigits,
} from '@/config/copy';
import { useRunDispatch } from '@/state/run';
import type { Mode, Track } from '@/types';

type TrackChoice = Track | 'unsure';

export function SetupPage() {
  const navigate = useNavigate();
  const dispatch = useRunDispatch();
  const [mode, setMode] = useState<Mode | ''>('');
  const [trackChoice, setTrackChoice] = useState<TrackChoice | ''>('');

  const canStart = mode !== '' && trackChoice !== '';

  function handleStart() {
    if (!mode || !trackChoice) return;
    dispatch({ type: 'SET_MODE', mode });
    dispatch({
      type: 'SET_TRACK',
      track: trackChoice === 'unsure' ? 'ic' : trackChoice,
      declared: trackChoice !== 'unsure',
    });
    navigate('/q/1');
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">{SETUP.modeQuestion}</h2>
        <RadioGroup value={mode} onValueChange={(v) => setMode(v as Mode)}>
          {MODE_ORDER.map((m) => (
            <OptionCard
              key={m}
              id={`mode-${m}`}
              value={m}
              title={MODE_LABEL[m]}
              description={`${MODE_DESCRIPTION[m]} (${toFaDigits(MODE_QUESTION_COUNT[m])} سوال)`}
              badge={m === MODE_RECOMMENDED ? <Badge>پیشنهادی</Badge> : undefined}
            />
          ))}
        </RadioGroup>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">{SETUP.trackQuestion}</h2>
        <RadioGroup value={trackChoice} onValueChange={(v) => setTrackChoice(v as TrackChoice)}>
          <OptionCard id="track-ic" value="ic" title={TRACK_LABEL.ic} />
          <OptionCard id="track-mgmt" value="mgmt" title={TRACK_LABEL.mgmt} />
          <OptionCard id="track-unsure" value="unsure" title={TRACK_NOT_SURE_LABEL} />
        </RadioGroup>
        <p className="text-sm text-muted-foreground">{TRACK_HELPER}</p>
      </section>

      <Button onClick={handleStart} disabled={!canStart} size="lg" className="w-full">
        {SETUP.start}
      </Button>
    </div>
  );
}
