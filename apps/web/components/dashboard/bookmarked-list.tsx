'use client';

import Link from 'next/link';
import { Bookmark, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { useProgress } from '@/lib/progress/progress-context';
import type { QuestionRecord } from '@/lib/content/types';

interface BookmarkedListProps {
  questions: QuestionRecord[];
}

export function BookmarkedList({ questions }: BookmarkedListProps) {
  const { state } = useProgress();

  const bookmarked = questions.filter(
    (q) => state.questions[String(q.id)]?.bookmarked,
  );

  if (bookmarked.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-border/40 bg-card/40 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Bookmark className="h-4 w-4 text-primary/70" />
        <h3 className="text-sm font-medium text-foreground">Saved Questions</h3>
        <span className="ml-auto text-[10px] text-muted-foreground/50">
          {bookmarked.length} saved
        </span>
      </div>
      
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {bookmarked.slice(0, 6).map((q) => {
          const item = state.questions[String(q.id)];
          const lastStatus = item?.attempts[item.attempts.length - 1]?.status;

          return (
            <Link
              key={q.id}
              href={`/questions/${q.id}`}
              className="group flex items-center justify-between rounded-lg border border-border/30 bg-background/30 px-3 py-2.5 transition-all hover:border-primary/30 hover:bg-primary/5"
            >
              <div className="flex min-w-0 items-center gap-2">
                {lastStatus && (
                  lastStatus === 'correct' ? (
                    <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-400/70" />
                  ) : (
                    <XCircle className="h-3 w-3 shrink-0 text-rose-400/70" />
                  )
                )}
                <p className="truncate text-xs font-medium text-foreground/80 transition-colors group-hover:text-foreground">
                  {q.title}
                </p>
              </div>
              <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-primary" />
            </Link>
          );
        })}
      </div>
      
      {bookmarked.length > 6 && (
        <Link
          href="/questions?status=bookmarked"
          className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-border/30 py-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60 transition-colors hover:border-primary/30 hover:text-primary"
        >
          View all {bookmarked.length} saved
          <ArrowRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}
