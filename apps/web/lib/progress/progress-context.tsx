'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  type ReactNode,
} from 'react';
import {
  defaultProgressState,
  readProgress,
  writeProgress,
  type AnswerStatus,
  type ProgressItem,
  type ProgressState,
} from '@/lib/progress/storage';
import { fetchServerProgress, upsertSingleQuestion, syncProgressToServer } from '@/lib/progress/actions';
import { useSafeAuth } from '@/lib/auth-utils';

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

type ProgressAction =
  | { type: 'init'; state: ProgressState }
  | { type: 'attempt'; questionId: number; selected: 'A' | 'B' | 'C' | 'D'; status: AnswerStatus }
  | { type: 'bookmark'; questionId: number }
  | { type: 'merge'; serverItems: ProgressItem[] };

function ensureItem(state: ProgressState, questionId: number): ProgressItem {
  return (
    state.questions[String(questionId)] ?? {
      questionId,
      attempts: [],
      bookmarked: false,
      updatedAt: new Date(0).toISOString(),
    }
  );
}

function mergeItems(local: ProgressItem | undefined, server: ProgressItem): ProgressItem {
  if (!local) return server;

  const localTime = new Date(local.updatedAt).getTime();
  const serverTime = new Date(server.updatedAt).getTime();

  if (serverTime > localTime) return server;
  if (localTime > serverTime) return local;

  // Same timestamp — keep the one with more attempts
  return server.attempts.length >= local.attempts.length ? server : local;
}

function progressReducer(state: ProgressState, action: ProgressAction): ProgressState {
  switch (action.type) {
    case 'init':
      return action.state;

    case 'attempt': {
      const now = new Date().toISOString();
      const prev = ensureItem(state, action.questionId);
      return {
        ...state,
        questions: {
          ...state.questions,
          [String(action.questionId)]: {
            ...prev,
            attempts: [
              ...prev.attempts,
              { selected: action.selected, status: action.status, attemptedAt: now },
            ],
            updatedAt: now,
          },
        },
      };
    }

    case 'bookmark': {
      const now = new Date().toISOString();
      const prev = ensureItem(state, action.questionId);
      return {
        ...state,
        questions: {
          ...state.questions,
          [String(action.questionId)]: {
            ...prev,
            bookmarked: !prev.bookmarked,
            updatedAt: now,
          },
        },
      };
    }

    case 'merge': {
      const merged = { ...state.questions };
      for (const serverItem of action.serverItems) {
        const key = String(serverItem.questionId);
        merged[key] = mergeItems(merged[key], serverItem);
      }
      return { ...state, questions: merged };
    }
  }
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface ProgressContextValue {
  state: ProgressState;
  ready: boolean;
  dispatch: (action: ProgressAction) => void;
  saveAttempt: (questionId: number, selected: 'A' | 'B' | 'C' | 'D', status: AnswerStatus) => void;
  toggleBookmark: (questionId: number) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(progressReducer, defaultProgressState);
  const readyRef = useRef(false);
  const prevStateRef = useRef(state);
  const { isSignedIn } = useSafeAuth();

  // Track ready state separately for SSR safety
  const ready = readyRef.current;

  // Init: load from localStorage
  useEffect(() => {
    const loaded = readProgress();
    dispatch({ type: 'init', state: loaded });
    readyRef.current = true;
  }, []);

  // Merge server progress on sign-in
  useEffect(() => {
    if (!isSignedIn || !readyRef.current) return;

    let cancelled = false;
    (async () => {
      const serverItems = await fetchServerProgress();
      if (!cancelled && serverItems.length > 0) {
        dispatch({ type: 'merge', serverItems });
      }

      // After merge, sync any local-only items to server
      if (!cancelled) {
        const localItems = Object.values(readProgress().questions);
        if (localItems.length > 0) {
          await syncProgressToServer(localItems);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isSignedIn]);

  // Persist to localStorage on every state change
  useEffect(() => {
    if (!readyRef.current) return;
    if (state === prevStateRef.current) return;
    prevStateRef.current = state;
    writeProgress(state);
  }, [state]);

  // Dual-write helper: detect changed question and sync to server
  const syncToServer = useCallback(
    (questionId: number, nextState: ProgressState) => {
      if (!isSignedIn) return;
      const item = nextState.questions[String(questionId)];
      if (item) {
        upsertSingleQuestion(item).catch((err) =>
          console.error('Server sync failed:', err),
        );
      }
    },
    [isSignedIn],
  );

  const saveAttempt = useCallback(
    (questionId: number, selected: 'A' | 'B' | 'C' | 'D', status: AnswerStatus) => {
      const action: ProgressAction = { type: 'attempt', questionId, selected, status };
      dispatch(action);
      // We need to compute what the next state would be for the server sync
      // Use a timeout to let the reducer run first
      setTimeout(() => {
        const current = readProgress();
        // Re-read from localStorage (just wrote it)
        syncToServer(questionId, current);
      }, 0);
    },
    [syncToServer],
  );

  const toggleBookmark = useCallback(
    (questionId: number) => {
      dispatch({ type: 'bookmark', questionId });
      setTimeout(() => {
        const current = readProgress();
        syncToServer(questionId, current);
      }, 0);
    },
    [syncToServer],
  );

  const value: ProgressContextValue = {
    state,
    ready,
    dispatch,
    saveAttempt,
    toggleBookmark,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return ctx;
}
