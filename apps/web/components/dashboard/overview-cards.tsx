'use client';

import { Target, Flame, Bookmark, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { OverallStats } from '@/lib/progress/analytics';

interface OverviewCardsProps {
  overall: OverallStats;
}

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ label, value, sub, icon, color }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-start gap-4 p-5">
        <span
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border"
          style={{
            borderColor: `hsl(var(${color}) / 0.3)`,
            backgroundColor: `hsl(var(${color}) / 0.1)`,
            color: `hsl(var(${color}))`,
          }}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className="mt-0.5 font-display text-2xl tracking-tight text-foreground">{value}</p>
          {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

export function OverviewCards({ overall }: OverviewCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Answered"
        value={String(overall.totalAnswered)}
        sub={`${overall.totalAttempts} total attempts`}
        icon={<BarChart3 className="h-5 w-5" />}
        color="--accent"
      />
      <StatCard
        label="Accuracy"
        value={overall.totalAttempts > 0 ? `${Math.round(overall.overallAccuracy * 100)}%` : '—'}
        sub={`${overall.totalCorrect} correct`}
        icon={<Target className="h-5 w-5" />}
        color="--success"
      />
      <StatCard
        label="Streak"
        value={`${overall.currentStreak}d`}
        sub={overall.longestStreak > 0 ? `Best: ${overall.longestStreak}d` : undefined}
        icon={<Flame className="h-5 w-5" />}
        color="--warning"
      />
      <StatCard
        label="Bookmarks"
        value={String(overall.bookmarkedCount)}
        icon={<Bookmark className="h-5 w-5" />}
        color="--primary"
      />
    </div>
  );
}
