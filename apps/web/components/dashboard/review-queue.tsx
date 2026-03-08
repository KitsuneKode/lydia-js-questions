'use client';

import Link from 'next/link';
import { RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { QuestionRecord } from '@/lib/content/types';

interface ReviewQueueProps {
  questions: QuestionRecord[];
}

export function ReviewQueue({ questions }: ReviewQueueProps) {
  if (questions.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RotateCcw className="h-4 w-4 text-accent" />
          Review Queue
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Questions to revisit based on spaced repetition
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {questions.map((q) => (
            <Link
              key={q.id}
              href={`/questions/${q.id}`}
              className="rounded-lg border border-border bg-card/50 p-3 no-underline transition-colors hover:bg-muted"
            >
              <p className="truncate text-sm font-medium text-foreground">{q.title}</p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                <Badge>{q.difficulty}</Badge>
                {q.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} tone="default">{tag}</Badge>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
