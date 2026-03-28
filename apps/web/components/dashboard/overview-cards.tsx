'use client';

import { BarChart3, Bookmark, Flame, Target } from 'lucide-react';
import type { OverallStats } from '@/lib/progress/analytics';
import { cn } from '@/lib/utils';

interface OverviewCardsProps {
  overall: OverallStats;
}

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
  colorClass: string;
}

function StatCard({ label, value, sub, icon, colorClass }: StatCardProps) {
  return (
    <div className="group rounded-xl border border-border/40 bg-card/40 p-4 transition-all hover:border-border/60 hover:bg-card/60">
      <div className="flex items-start gap-3">
        <div
          className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', colorClass)}
        >
          {icon}
        </div>
        <div className="min-w-0 space-y-0.5">
          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">
            {label}
          </p>
          <p className="font-display text-xl font-medium tracking-tight text-foreground">{value}</p>
          {sub && <p className="text-[10px] text-muted-foreground/50">{sub}</p>}
        </div>
      </div>
    </div>
  );
}

export function OverviewCards({ overall }: OverviewCardsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Answered"
        value={String(overall.totalAnswered)}
        sub={`${overall.totalAttempts} attempts`}
        icon={<BarChart3 className="h-4 w-4" />}
        colorClass="bg-sky-500/10 text-sky-400"
      />
      <StatCard
        label="Accuracy"
        value={overall.totalAttempts > 0 ? `${Math.round(overall.overallAccuracy * 100)}%` : '—'}
        sub={`${overall.totalCorrect} correct`}
        icon={<Target className="h-4 w-4" />}
        colorClass="bg-emerald-500/10 text-emerald-400"
      />
      <StatCard
        label="Streak"
        value={`${overall.currentStreak}d`}
        sub={overall.longestStreak > 0 ? `Best: ${overall.longestStreak}d` : undefined}
        icon={<Flame className="h-4 w-4" />}
        colorClass="bg-amber-500/10 text-amber-400"
      />
      <StatCard
        label="Saved"
        value={String(overall.bookmarkedCount)}
        icon={<Bookmark className="h-4 w-4" />}
        colorClass="bg-primary/10 text-primary"
      />
    </div>
  );
}
