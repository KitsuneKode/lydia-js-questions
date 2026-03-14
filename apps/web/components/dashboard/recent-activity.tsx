'use client';

import Link from 'next/link';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
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

  const last10 = recentAttempts.slice(0, 8);

  if (last10.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-border/40 bg-card/40 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground/60" />
        <h3 className="text-sm font-medium text-foreground">Recent</h3>
      </div>
      
      <ul className="space-y-1">
        {last10.map((entry, i) => {
          const isCorrect = entry.attempt.status === 'correct';
          const time = new Date(entry.attempt.attemptedAt);
          const relTime = formatRelativeTime(time);

          return (
            <li key={`${entry.questionId}-${entry.attempt.attemptedAt}-${i}`}>
              <Link
                href={`/questions/${entry.questionId}`}
                className="group flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-muted/40"
              >
                {isCorrect ? (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400/80" />
                ) : (
                  <XCircle className="h-3.5 w-3.5 shrink-0 text-rose-400/80" />
                )}
                <span className="min-w-0 truncate text-xs text-foreground/70 transition-colors group-hover:text-foreground">
                  {entry.title}
                </span>
                <span className="ml-auto shrink-0 text-[10px] text-muted-foreground/40">
                  {relTime}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function formatRelativeTime(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'now';
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return date.toLocaleDateString('en', { month: 'short', day: 'numeric' });
}
