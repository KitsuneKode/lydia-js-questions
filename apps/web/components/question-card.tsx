'use client';

import Link from 'next/link';
import { ArrowUpRight, Brain, PlayCircle, CheckCircle2, Bookmark, CircleDot } from 'lucide-react';

import type { QuestionRecord } from '@/lib/content/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuestionProgress } from '@/lib/progress/use-question-progress';

interface QuestionCardProps {
  question: QuestionRecord;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const { ready, item } = useQuestionProgress(question.id);

  const hasAttempts = item.attempts.length > 0;
  const isCorrect = item.attempts.some((a) => a.status === 'correct');
  const isBookmarked = item.bookmarked;

  return (
    <Card className="question-grid-item group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-glow border-border/60 bg-card/80">
      <CardHeader className="space-y-3 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="px-1.5 py-0 text-[10px] opacity-70">
              #{question.id}
            </Badge>
            <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
              {question.difficulty}
            </Badge>
            {question.runnable && (
              <Badge variant="success" className="px-1.5 py-0 text-[10px]">
                runnable
              </Badge>
            )}
          </div>
          {ready && (
            <div className="flex items-center gap-1.5">
              {isCorrect ? (
                <CheckCircle2 className="h-4 w-4 text-success" />
              ) : hasAttempts ? (
                <CircleDot className="h-4 w-4 text-warning" />
              ) : null}
              {isBookmarked && <Bookmark className="h-4 w-4 fill-primary text-primary" />}
            </div>
          )}
        </div>
        <CardTitle className="line-clamp-2 min-h-[3rem] text-lg leading-snug tracking-tight text-foreground/90 group-hover:text-primary transition-colors">
          {question.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {question.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border/40 bg-muted/30 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/80"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-border/30 pt-4 text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider">
          <span className="inline-flex items-center gap-1.5">
            <Brain className="h-3.5 w-3.5" />
            {question.options.length} options
          </span>
          <span className="inline-flex items-center gap-1.5">
            {question.runnable ? <PlayCircle className="h-3.5 w-3.5" /> : null}
            {question.codeBlocks.length} snippet{question.codeBlocks.length === 1 ? '' : 's'}
          </span>
        </div>
        <Link
          href={`/questions/${question.id}`}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary/10 py-2 text-xs font-bold text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground"
        >
          Practice
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </CardContent>
    </Card>
  );
}
