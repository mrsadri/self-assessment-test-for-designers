import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { RadioGroup } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { OptionCard } from '@/components/OptionCard';
import { QUESTION_SCREEN } from '@/config/copy';
import { orderedQuestions } from '@/lib/questionOrder';
import { useRunDispatch, useRunState } from '@/state/run';

export function QuestionPage() {
  const { n } = useParams();
  const navigate = useNavigate();
  const state = useRunState();
  const dispatch = useRunDispatch();

  if (!state.mode) return <Navigate to="/setup" replace />;

  const questions = orderedQuestions(state.mode);
  const index = Number(n) - 1;
  if (!Number.isInteger(index) || index < 0 || index >= questions.length) {
    return <Navigate to="/setup" replace />;
  }

  const question = questions[index];
  const total = questions.length;
  const selected = state.answers[question.id];

  function goNext() {
    if (index + 1 < total) navigate(`/q/${index + 2}`);
    else navigate('/result');
  }

  function goBack() {
    if (index > 0) navigate(`/q/${index}`);
    else navigate('/setup');
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span aria-live="polite" className="text-sm text-muted-foreground">
          {QUESTION_SCREEN.progress(index + 1, total)}
        </span>
        <Progress value={((index + 1) / total) * 100} />
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-2 text-lg font-semibold text-balance">{question.fa}</legend>
        <RadioGroup
          value={selected ?? ''}
          onValueChange={(v) => dispatch({ type: 'ANSWER', questionId: question.id, optionId: v as 'a' | 'b' | 'c' | 'd' })}
        >
          {question.options.map((opt) => (
            <OptionCard key={opt.id} id={`q-${question.id}-${opt.id}`} value={opt.id} title={opt.fa} />
          ))}
        </RadioGroup>
      </fieldset>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={goBack} className="flex-1">
          {QUESTION_SCREEN.back}
        </Button>
        <Button type="button" onClick={goNext} disabled={!selected} className="flex-1">
          {QUESTION_SCREEN.next}
        </Button>
      </div>
    </div>
  );
}
