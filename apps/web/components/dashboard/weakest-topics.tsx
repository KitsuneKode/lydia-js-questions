'use client';

import Link from 'next/link';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import type { TagStats } from '@/lib/progress/analytics';

interface WeakestTopicsProps {
  topics: TagStats[];
}

export function WeakestTopics({ topics }: WeakestTopicsProps) {
  if (topics.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-border/40 bg-card/40 p-5">
      <div className="mb-4 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-amber-400/80" />
        <h3 className="text-sm font-medium text-foreground">Needs Practice</h3>
      </div>
      
      <ul className="space-y-2">
        {topics.map((topic) => (
          <li key={topic.tag}>
            <Link
              href={`/questions?tag=${encodeURIComponent(topic.tag)}`}
              className="group flex items-center justify-between rounded-lg border border-border/30 bg-background/30 px-3 py-2 transition-all hover:border-amber-500/30 hover:bg-amber-500/5"
            >
              <span className="text-sm text-foreground/80 transition-colors group-hover:text-foreground">
                {topic.tag}
              </span>
              <div className="flex items-center gap-2">
                <span className="rounded bg-rose-500/15 px-1.5 py-0.5 font-mono text-[10px] font-medium text-rose-400">
                  {Math.round(topic.accuracy * 100)}%
                </span>
                <span className="text-[10px] text-muted-foreground/50">
                  {topic.questionCount}
                </span>
                <ArrowRight className="h-3 w-3 text-muted-foreground/30 transition-colors group-hover:text-primary" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
