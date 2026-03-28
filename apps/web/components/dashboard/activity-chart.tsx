'use client';

import { Activity } from 'lucide-react';
import { useMemo } from 'react';
import type { DailyActivity } from '@/lib/progress/analytics';

interface ActivityChartProps {
  dailyActivity: DailyActivity[];
}

export function ActivityChart({ dailyActivity }: ActivityChartProps) {
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
    <div className="rounded-xl border border-border/40 bg-card/40 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Activity className="h-4 w-4 text-muted-foreground/60" />
        <h3 className="text-sm font-medium text-foreground">Last 30 Days</h3>
      </div>

      <div className="flex items-end gap-[2px]" style={{ height: 100 }}>
        {bars.map((bar) => {
          const total = bar.attempts;
          const correctH = total > 0 ? (bar.correct / maxAttempts) * 100 : 0;
          const incorrectH = total > 0 ? ((total - bar.correct) / maxAttempts) * 100 : 0;

          return (
            <div
              key={bar.date}
              className="group relative flex flex-1 flex-col items-stretch justify-end"
              style={{ height: '100%' }}
            >
              {/* Tooltip */}
              <div className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[9px] font-medium text-background opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                {bar.date.slice(5)}: {total}
              </div>

              {/* Incorrect portion */}
              {incorrectH > 0 && (
                <div
                  className="w-full rounded-t-sm"
                  style={{
                    height: `${incorrectH}%`,
                    backgroundColor: 'hsl(var(--danger) / 0.4)',
                  }}
                />
              )}
              {/* Correct portion */}
              {correctH > 0 && (
                <div
                  className="w-full transition-all group-hover:opacity-80"
                  style={{
                    height: `${correctH}%`,
                    backgroundColor: 'hsl(var(--success) / 0.8)',
                    borderRadius: incorrectH > 0 ? '0' : '2px 2px 0 0',
                  }}
                />
              )}
              {/* Empty state */}
              {total === 0 && (
                <div
                  className="w-full rounded-t-sm"
                  style={{
                    height: '4px',
                    backgroundColor: 'hsl(var(--muted) / 0.3)',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex justify-between text-[9px] text-muted-foreground/50">
        <span>30d ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}
