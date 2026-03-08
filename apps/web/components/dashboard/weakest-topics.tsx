'use client';

import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { TagStats } from '@/lib/progress/analytics';

interface WeakestTopicsProps {
  topics: TagStats[];
}

export function WeakestTopics({ topics }: WeakestTopicsProps) {
  if (topics.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-warning" />
          Weakest Topics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {topics.map((topic) => (
            <li key={topic.tag}>
              <Link
                href={`/questions?tag=${encodeURIComponent(topic.tag)}`}
                className="flex items-center justify-between rounded-md border border-border bg-card/50 px-3 py-2 no-underline transition-colors hover:bg-muted"
              >
                <span className="text-sm text-foreground">{topic.tag}</span>
                <div className="flex items-center gap-2">
                  <Badge tone="danger">{Math.round(topic.accuracy * 100)}%</Badge>
                  <span className="text-xs text-muted-foreground">
                    {topic.questionCount} Qs
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
