'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DailyActivity } from '@/lib/progress/analytics';

interface ActivityChartProps {
  dailyActivity: DailyActivity[];
}

export function ActivityChart({ dailyActivity }: ActivityChartProps) {
  // Show last 30 days, filling gaps with zero
  const bars = useMemo(() => {
    const dayMap = new Map(dailyActivity.map((d) => [d.date, d]));
    const result: DailyActivity[] = [];
    const now = new Date();

    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      result.push(dayMap.get(key) ?? { date: key, attempts: 0, correct: 0 });
    }

    return result;
  }, [dailyActivity]);

  const maxAttempts = Math.max(1, ...bars.map((b) => b.attempts));

  if (dailyActivity.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity — Last 30 Days</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-[3px]" style={{ height: 140 }}>
          {bars.map((bar) => {
            const total = bar.attempts;
            const correctH = total > 0 ? (bar.correct / maxAttempts) * 100 : 0;
            const incorrectH = total > 0 ? ((total - bar.correct) / maxAttempts) * 100 : 0;
            const dayLabel = new Date(bar.date + 'T00:00:00').toLocaleDateString('en', { weekday: 'narrow' });

            return (
              <div
                key={bar.date}
                className="group relative flex flex-1 flex-col items-stretch justify-end"
                style={{ height: '100%' }}
              >
                {/* Tooltip */}
                <div className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-card border border-border px-2 py-1 text-[10px] text-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  {bar.date}: {total} attempts
                </div>

                {/* Incorrect portion */}
                {incorrectH > 0 && (
                  <div
                    className="w-full rounded-t"
                    style={{
                      height: `${incorrectH}%`,
                      backgroundColor: `hsl(var(--danger) / 0.5)`,
                    }}
                  />
                )}
                {/* Correct portion */}
                {correctH > 0 && (
                  <div
                    className="w-full"
                    style={{
                      height: `${correctH}%`,
                      backgroundColor: `hsl(var(--success))`,
                      borderRadius: incorrectH > 0 ? '0' : '2px 2px 0 0',
                    }}
                  />
                )}
                {/* Empty state */}
                {total === 0 && (
                  <div
                    className="w-full rounded-t"
                    style={{
                      height: '3%',
                      backgroundColor: `hsl(var(--muted))`,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
          <span>30d ago</span>
          <span>Today</span>
        </div>
      </CardContent>
    </Card>
  );
}
