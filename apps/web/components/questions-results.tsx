'use client';

import { Search } from 'lucide-react';
import { useMemo } from 'react';

import { QuestionCard } from '@/components/question-card';
import type { QuestionRecord } from '@/lib/content/types';
import { useProgress } from '@/lib/progress/progress-context';

interface QuestionsResultsProps {
  questions: QuestionRecord[];
  status: 'all' | 'answered' | 'unanswered' | 'bookmarked';
}

export function QuestionsResults({ questions, status }: QuestionsResultsProps) {
  const { state: progress } = useProgress();

  const filtered = useMemo(() => {
    if (status === 'all') {
      return questions;
    }

    return questions.filter((question) => {
      const item = progress.questions[String(question.id)];
      const hasAttempts = Boolean(item?.attempts?.length);
      const bookmarked = Boolean(item?.bookmarked);

      if (status === 'answered') {
        return hasAttempts;
      }

      if (status === 'unanswered') {
        return !hasAttempts;
      }

      if (status === 'bookmarked') {
        return bookmarked;
      }

      return true;
    });
  }, [progress, questions, status]);

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border/50 bg-card/30 px-6 py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/50">
          <Search className="h-5 w-5 text-muted-foreground/60" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground/70">No questions found</p>
          <p className="text-xs text-muted-foreground/60">
            No questions match the selected filters. Try adjusting your search or status filter.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-3">
      {filtered.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
}
