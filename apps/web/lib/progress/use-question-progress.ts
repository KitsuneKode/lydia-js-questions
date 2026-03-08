'use client';

import { useMemo } from 'react';

import type { AnswerStatus, ProgressItem } from '@/lib/progress/storage';
import { useProgress } from '@/lib/progress/progress-context';

function ensureItem(questions: Record<string, ProgressItem>, questionId: number): ProgressItem {
  const existing = questions[String(questionId)];
  if (existing) return existing;

  return {
    questionId,
    attempts: [],
    bookmarked: false,
    updatedAt: new Date(0).toISOString(),
  };
}

export function useQuestionProgress(questionId: number) {
  const { state, ready, saveAttempt, toggleBookmark } = useProgress();

  const item = useMemo(
    () => ensureItem(state.questions, questionId),
    [questionId, state],
  );

  return {
    ready,
    item,
    saveAttempt: (selected: 'A' | 'B' | 'C' | 'D', status: AnswerStatus) =>
      saveAttempt(questionId, selected, status),
    toggleBookmark: () => toggleBookmark(questionId),
  };
}
