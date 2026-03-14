'use client';

import Link from 'next/link';
import { RotateCcw, ArrowRight } from 'lucide-react';
import type { QuestionRecord } from '@/lib/content/types';

interface ReviewQueueProps {
  questions: QuestionRecord[];
}

export function ReviewQueue({ questions }: ReviewQueueProps) {
  if (questions.length === 0) return null;

  return (
    <div className="rounded-xl border border-border/40 bg-card/40 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RotateCcw className="h-4 w-4 text-primary/70" />
          <h3 className="text-sm font-medium text-foreground">Review Queue</h3>
        </div>
        <span className="text-[10px] text-muted-foreground/50">
          Spaced repetition
        </span>
      </div>
      
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {questions.slice(0, 6).map((q) => (
          <Link
            key={q.id}
            href={`/questions/${q.id}`}
            className="group flex items-center justify-between rounded-lg border border-border/30 bg-background/30 px-3 py-2.5 transition-all hover:border-primary/30 hover:bg-primary/5"
          >
            <div className="min-w-0 space-y-0.5">
              <p className="truncate text-xs font-medium text-foreground/80 transition-colors group-hover:text-foreground">
                {q.title}
              </p>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground/50">
                  {q.difficulty}
                </span>
              </div>
            </div>
            <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-primary" />
          </Link>
        ))}
      </div>
    </div>
  );
}
