'use client';

import { useMemo } from 'react';

import { useProgress } from '@/lib/progress/progress-context';
import {
  computeOverallStats,
  computeTagStats,
  computeDailyActivity,
  getWeakestTopics,
  getReviewQueue,
  type OverallStats,
  type TagStats,
  type DailyActivity,
} from '@/lib/progress/analytics';
import type { QuestionRecord } from '@/lib/content/types';

export function useAnalytics(questions: QuestionRecord[]) {
  const { state, ready } = useProgress();

  const overall = useMemo<OverallStats>(
    () => computeOverallStats(state),
    [state],
  );

  const tagStats = useMemo<TagStats[]>(
    () => computeTagStats(state, questions),
    [state, questions],
  );

  const dailyActivity = useMemo<DailyActivity[]>(
    () => computeDailyActivity(state),
    [state],
  );

  const weakestTopics = useMemo<TagStats[]>(
    () => getWeakestTopics(tagStats),
    [tagStats],
  );

  const reviewQueue = useMemo<QuestionRecord[]>(
    () => getReviewQueue(state, questions),
    [state, questions],
  );

  return { ready, overall, tagStats, dailyActivity, weakestTopics, reviewQueue };
}
