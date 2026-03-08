'use client';

import Link from 'next/link';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProgress } from '@/lib/progress/progress-context';
import type { QuestionRecord } from '@/lib/content/types';
import type { AttemptRecord } from '@/lib/progress/storage';

interface RecentActivityProps {
  questions: QuestionRecord[];
}

interface RecentAttempt {
  questionId: number;
  title: string;
  slug: string;
  attempt: AttemptRecord;
}

export function RecentActivity({ questions }: RecentActivityProps) {
  const { state } = useProgress();

  const questionMap = new Map(questions.map((q) => [q.id, q]));

  const recentAttempts: RecentAttempt[] = [];
  for (const item of Object.values(state.questions)) {
    const q = questionMap.get(item.questionId);
    if (!q) continue;
    for (const attempt of item.attempts) {
      recentAttempts.push({
        questionId: item.questionId,
        title: q.title,
        slug: q.slug,
        attempt,
      });
    }
  }

  recentAttempts.sort(
    (a, b) =>
      new Date(b.attempt.attemptedAt).getTime() - new Date(a.attempt.attemptedAt).getTime(),
  );

  const last10 = recentAttempts.slice(0, 10);

  if (last10.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1.5">
          {last10.map((entry, i) => {
            const isCorrect = entry.attempt.status === 'correct';
            const time = new Date(entry.attempt.attemptedAt);
            const relTime = formatRelativeTime(time);

            return (
              <li key={`${entry.questionId}-${entry.attempt.attemptedAt}-${i}`}>
                <Link
                  href={`/questions/${entry.questionId}`}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm no-underline transition-colors hover:bg-muted"
                >
                  {isCorrect ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                  ) : (
                    <XCircle className="h-4 w-4 shrink-0 text-danger" />
                  )}
                  <span className="min-w-0 truncate text-foreground">{entry.title}</span>
                  <span className="ml-auto shrink-0 text-xs text-muted-foreground">{relTime}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}

function formatRelativeTime(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString('en', { month: 'short', day: 'numeric' });
}
