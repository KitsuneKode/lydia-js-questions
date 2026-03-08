'use client';

import Link from 'next/link';
import { Bookmark } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bookmark className="h-4 w-4 text-primary" />
          Bookmarked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {bookmarked.map((q) => {
            const item = state.questions[String(q.id)];
            const lastStatus = item?.attempts[item.attempts.length - 1]?.status;

            return (
              <Link
                key={q.id}
                href={`/questions/${q.id}`}
                className="rounded-lg border border-border bg-card/50 p-3 no-underline transition-colors hover:bg-muted"
              >
                <p className="truncate text-sm font-medium text-foreground">{q.title}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <Badge>{q.difficulty}</Badge>
                  {lastStatus && (
                    <Badge tone={lastStatus === 'correct' ? 'success' : 'danger'}>
                      {lastStatus}
                    </Badge>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
