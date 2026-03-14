'use client';

import { PieChart } from 'lucide-react';
import type { TagStats } from '@/lib/progress/analytics';

interface TopicAccuracyChartProps {
  tagStats: TagStats[];
}

export function TopicAccuracyChart({ tagStats }: TopicAccuracyChartProps) {
  const top = tagStats.slice(0, 8);

  if (top.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-border/40 bg-card/40 p-5">
      <div className="mb-4 flex items-center gap-2">
        <PieChart className="h-4 w-4 text-muted-foreground/60" />
        <h3 className="text-sm font-medium text-foreground">Topic Accuracy</h3>
      </div>
      
      <div className="space-y-2.5">
        {top.map((tag) => {
          const pct = Math.round(tag.accuracy * 100);
          const barColor = pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-rose-500';

          return (
            <div key={tag.tag} className="space-y-1">
              <div className="flex items-baseline justify-between text-xs">
                <span className="truncate font-medium text-foreground/80">{tag.tag}</span>
                <span className="ml-2 shrink-0 font-mono text-[10px] tabular-nums text-muted-foreground/60">
                  {pct}%
                  <span className="ml-1 opacity-50">({tag.totalAttempts})</span>
                </span>
              </div>
              <div className="relative h-1.5 overflow-hidden rounded-full bg-muted/30">
                <div
                  className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${barColor}`}
                  style={{ width: `${pct}%`, opacity: 0.8 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
