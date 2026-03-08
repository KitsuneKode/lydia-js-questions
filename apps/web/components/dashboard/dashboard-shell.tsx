'use client';

import type { QuestionRecord } from '@/lib/content/types';
import { useAnalytics } from '@/lib/progress/use-analytics';
import { OverviewCards } from '@/components/dashboard/overview-cards';
import { TopicAccuracyChart } from '@/components/dashboard/topic-accuracy-chart';
import { ActivityChart } from '@/components/dashboard/activity-chart';
import { WeakestTopics } from '@/components/dashboard/weakest-topics';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { BookmarkedList } from '@/components/dashboard/bookmarked-list';
import { ReviewQueue } from '@/components/dashboard/review-queue';

interface DashboardShellProps {
  questions: QuestionRecord[];
}

export function DashboardShell({ questions }: DashboardShellProps) {
  const { ready, overall, tagStats, dailyActivity, weakestTopics, reviewQueue } =
    useAnalytics(questions);

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading progress data&hellip;</p>
      </div>
    );
  }

  const hasData = overall.totalAnswered > 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground md:text-4xl">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {hasData
            ? `${overall.totalAnswered} questions answered across ${tagStats.length} topics`
            : 'Start answering questions to see your progress here'}
        </p>
      </div>

      <OverviewCards overall={overall} />

      {hasData && (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            <TopicAccuracyChart tagStats={tagStats} />
            <ActivityChart dailyActivity={dailyActivity} />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <WeakestTopics topics={weakestTopics} />
            <RecentActivity questions={questions} />
          </div>

          {reviewQueue.length > 0 && <ReviewQueue questions={reviewQueue} />}

          <BookmarkedList questions={questions} />
        </>
      )}
    </div>
  );
}
