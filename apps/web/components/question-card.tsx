'use client';

import Link from 'next/link';
import { ArrowRight, Code2, CheckCircle2, Bookmark, Circle, Zap } from 'lucide-react';

import type { QuestionRecord } from '@/lib/content/types';
import { Badge } from '@/components/ui/badge';
import { useQuestionProgress } from '@/lib/progress/use-question-progress';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: QuestionRecord;
}

const difficultyStyles = {
  easy: 'text-emerald-400',
  medium: 'text-amber-400',
  hard: 'text-rose-400',
} as const;

export function QuestionCard({ question }: QuestionCardProps) {
  const { ready, item } = useQuestionProgress(question.id);

  const hasAttempts = item.attempts.length > 0;
  const isCorrect = item.attempts.some((a) => a.status === 'correct');
  const isBookmarked = item.bookmarked;

  const difficulty = question.difficulty?.toLowerCase() as keyof typeof difficultyStyles;

  return (
    <Link
      href={`/questions/${question.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Status indicators - top right */}
      {ready && (hasAttempts || isBookmarked) && (
        <div className="absolute right-3 top-3 flex items-center gap-1.5">
          {isCorrect ? (
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" />
            </div>
          ) : hasAttempts ? (
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20">
              <Circle className="h-3 w-3 text-amber-400" />
            </div>
          ) : null}
          {isBookmarked && (
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
              <Bookmark className="h-3 w-3 fill-primary text-primary" />
            </div>
          )}
        </div>
      )}

      {/* Header row: ID + difficulty */}
      <div className="mb-3 flex items-center gap-2">
        <span className="font-mono text-[11px] font-medium text-muted-foreground/60">
          #{question.id}
        </span>
        <span className="text-muted-foreground/30">·</span>
        <span className={cn('text-[10px] font-bold uppercase tracking-wider', difficultyStyles[difficulty] || 'text-muted-foreground')}>
          {question.difficulty}
        </span>
        {question.runnable && (
          <>
            <span className="text-muted-foreground/30">·</span>
            <span className="flex items-center gap-1 text-[10px] font-medium text-primary/80">
              <Zap className="h-3 w-3" />
              <span className="hidden sm:inline">Runnable</span>
            </span>
          </>
        )}
      </div>

      {/* Title */}
      <h3 className="mb-4 line-clamp-2 min-h-[2.75rem] font-display text-base font-medium leading-snug tracking-tight text-foreground/90 transition-colors group-hover:text-primary">
        {question.title}
      </h3>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {question.tags.slice(0, 3).map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="bg-muted/40 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-muted-foreground/70"
          >
            {tag}
          </Badge>
        ))}
        {question.tags.length > 3 && (
          <span className="px-1 text-[9px] text-muted-foreground/50">
            +{question.tags.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between border-t border-border/30 pt-3">
        <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/50">
          <span className="flex items-center gap-1">
            <Code2 className="h-3 w-3" />
            {question.codeBlocks.length}
          </span>
          <span>{question.options.length} options</span>
        </div>
        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary opacity-0 transition-opacity group-hover:opacity-100">
          Practice
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}
