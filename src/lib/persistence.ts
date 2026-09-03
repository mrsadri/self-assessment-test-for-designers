import type { SavedRun } from '@/types';

/** The only localStorage key this app ever touches. See docs/04 section 9. */
export const SAVED_RUN_KEY = 'pd-assessment/run/v1';

export function loadSavedRun(): SavedRun | null {
  try {
    const raw = localStorage.getItem(SAVED_RUN_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedRun;
    if (parsed.version !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveRun(run: SavedRun): void {
  try {
    localStorage.setItem(SAVED_RUN_KEY, JSON.stringify(run));
  } catch {
    // localStorage unavailable (private mode, quota); silently skip, nothing else persists.
  }
}

export function clearSavedRun(): void {
  try {
    localStorage.removeItem(SAVED_RUN_KEY);
  } catch {
    // no-op
  }
}

export function hasSavedRun(): boolean {
  try {
    return localStorage.getItem(SAVED_RUN_KEY) !== null;
  } catch {
    return false;
  }
}
