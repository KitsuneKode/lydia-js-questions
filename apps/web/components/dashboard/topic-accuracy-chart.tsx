'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { TagStats } from '@/lib/progress/analytics';

interface TopicAccuracyChartProps {
  tagStats: TagStats[];
}

const BAR_COLORS = [
  '--chart-1',
  '--chart-2',
  '--chart-3',
  '--chart-4',
  '--chart-5',
];

export function TopicAccuracyChart({ tagStats }: TopicAccuracyChartProps) {
  const top = tagStats.slice(0, 10);

  if (top.length === 0) {
    return null;
  }

  const maxAttempts = Math.max(...top.map((t) => t.totalAttempts));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Topic Accuracy</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {top.map((tag, i) => {
          const pct = Math.round(tag.accuracy * 100);
          const color = BAR_COLORS[i % BAR_COLORS.length];

          return (
            <div key={tag.tag} className="space-y-1">
              <div className="flex items-baseline justify-between text-xs">
                <span className="truncate text-foreground">{tag.tag}</span>
                <span className="ml-2 shrink-0 tabular-nums text-muted-foreground">
                  {pct}%
                  <span className="ml-1 text-muted-foreground/60">
                    ({tag.totalAttempts})
                  </span>
                </span>
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-muted/50">
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: `hsl(var(${color}))`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
