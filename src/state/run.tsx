import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react';
import { clearSavedRun, loadSavedRun, saveRun } from '@/lib/persistence';
import type { Mode, SavedRun, Track } from '@/types';

export interface RunState {
  mode: Mode | null;
  track: Track;
  /** false when the user picked "not sure" instead of declaring a track. */
  trackDeclared: boolean;
  answers: Record<string, 'a' | 'b' | 'c' | 'd'>;
  /** Opt-in localStorage persistence. Default off. See docs/04 section 9. */
  persist: boolean;
}

const initialState: RunState = {
  mode: null,
  track: 'ic',
  trackDeclared: false,
  answers: {},
  persist: false,
};

type Action =
  | { type: 'SET_MODE'; mode: Mode }
  | { type: 'SET_TRACK'; track: Track; declared: boolean }
  | { type: 'ANSWER'; questionId: string; optionId: 'a' | 'b' | 'c' | 'd' }
  | { type: 'SET_PERSIST'; persist: boolean }
  | { type: 'RESET' }
  | { type: 'LOAD'; run: SavedRun };

function reducer(state: RunState, action: Action): RunState {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.mode, answers: {} };
    case 'SET_TRACK':
      return { ...state, track: action.track, trackDeclared: action.declared };
    case 'ANSWER':
      return { ...state, answers: { ...state.answers, [action.questionId]: action.optionId } };
    case 'SET_PERSIST':
      return { ...state, persist: action.persist };
    case 'RESET':
      return initialState;
    case 'LOAD':
      return {
        mode: action.run.mode,
        track: action.run.track,
        trackDeclared: true,
        answers: action.run.answers,
        persist: true,
      };
    default:
      return state;
  }
}

const RunStateContext = createContext<RunState | null>(null);
const RunDispatchContext = createContext<Dispatch<Action> | null>(null);

export function RunProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = loadSavedRun();
    if (saved) dispatch({ type: 'LOAD', run: saved });
    // Only ever run once, on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.persist && state.mode) {
      saveRun({
        version: 1,
        savedAt: new Date().toISOString(),
        mode: state.mode,
        track: state.track,
        answers: state.answers,
      });
    }
  }, [state.persist, state.mode, state.track, state.answers]);

  return (
    <RunStateContext.Provider value={state}>
      <RunDispatchContext.Provider value={dispatch}>{children}</RunDispatchContext.Provider>
    </RunStateContext.Provider>
  );
}

export function useRunState(): RunState {
  const ctx = useContext(RunStateContext);
  if (!ctx) throw new Error('useRunState must be used inside RunProvider');
  return ctx;
}

export function useRunDispatch(): Dispatch<Action> {
  const ctx = useContext(RunDispatchContext);
  if (!ctx) throw new Error('useRunDispatch must be used inside RunProvider');
  return ctx;
}

export function resetAndClearSaved(dispatch: Dispatch<Action>): void {
  clearSavedRun();
  dispatch({ type: 'RESET' });
}
