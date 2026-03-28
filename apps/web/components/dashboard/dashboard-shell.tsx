'use client';

import { ArrowRight, Library, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { ActivityChart } from '@/components/dashboard/activity-chart';
import { BookmarkedList } from '@/components/dashboard/bookmarked-list';
import { OverviewCards } from '@/components/dashboard/overview-cards';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { ReviewQueue } from '@/components/dashboard/review-queue';
import { TopicAccuracyChart } from '@/components/dashboard/topic-accuracy-chart';
import { WeakestTopics } from '@/components/dashboard/weakest-topics';
import { Button } from '@/components/ui/button';
import type { QuestionRecord } from '@/lib/content/types';
import { useAnalytics } from '@/lib/progress/use-analytics';

interface DashboardShellProps {
  questions: QuestionRecord[];
}

export function DashboardShell({ questions }: DashboardShellProps) {
  const {
    ready,
    overall,
    tagStats,
    dailyActivity,
    weakestTopics,
    reviewQueue,
    continueLearning,
    recommended,
  } = useAnalytics(questions);

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          <p className="text-sm text-muted-foreground/70">Loading progress...</p>
        </div>
      </div>
    );
  }

  const hasData = overall.totalAnswered > 0;

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary">
            Practice Hub
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-border/60 to-transparent" />
        </div>
        <h1 className="font-display text-2xl font-medium tracking-tight text-foreground md:text-3xl">
          Train JavaScript interview skills
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground/70">
          {hasData
            ? `${overall.totalAnswered} questions answered across ${tagStats.length} topics. Review weak areas, maintain your streak, and keep building mastery.`
            : 'Start with one question, get immediate feedback, and build consistent practice habits.'}
        </p>
      </header>

      {/* Quick action cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {[continueLearning, recommended].map((suggestion, index) => (
          <div
            key={suggestion.label}
            className="group relative overflow-hidden rounded-xl border border-border/40 bg-gradient-to-br from-card/80 to-card/40 p-5 transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
          >
            {/* Subtle glow */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10" />

            <div className="relative space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-primary">
                {index === 0 ? <Library className="h-3 w-3" /> : <Sparkles className="h-3 w-3" />}
                {suggestion.label}
              </div>
              <h2 className="font-display text-lg font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
                {suggestion.question ? suggestion.question.title : 'Start your first question'}
              </h2>
              <p className="text-xs text-muted-foreground/70">{suggestion.description}</p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Link
                  href={suggestion.question ? `/questions/${suggestion.question.id}` : '/questions'}
                >
                  <Button size="sm" className="h-8 gap-1.5 text-xs">
                    {index === 0 ? 'Resume' : 'Try this'}
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
                <Link href="/questions">
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground">
                    Browse all
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats overview */}
      <OverviewCards overall={overall} />

      {/* Charts and lists - only show when there's data */}
      {hasData && (
        <>
          <div className="grid gap-5 lg:grid-cols-2">
            <TopicAccuracyChart tagStats={tagStats} />
            <ActivityChart dailyActivity={dailyActivity} />
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
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
