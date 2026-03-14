'use client';

import { useMemo, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, Sparkles, Shuffle, X, Filter } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FiltersBarProps {
  tags: string[];
  selectedTag: string;
  search: string;
  runnable: string;
  status: string;
  totalQuestions: number;
}

export function FiltersBar({ tags, selectedTag, search, runnable, status, totalQuestions }: FiltersBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const allTags = useMemo(() => ['all', ...tags], [tags]);

  const hasActiveFilters = search || (selectedTag && selectedTag !== 'all') || runnable === 'true' || (status && status !== 'all');

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === 'all') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.set('page', '1');

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  function handleClearAll() {
    const params = new URLSearchParams();
    startTransition(() => {
      router.push(pathname);
    });
  }

  function handleRandom() {
    const randomId = Math.floor(Math.random() * totalQuestions) + 1;
    router.push(`/questions/${randomId}`);
  }

  return (
    <section className="space-y-5 rounded-xl border border-border/40 bg-card/30 p-5 backdrop-blur-sm">
      {/* Search and actions row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
          <Input
            defaultValue={search}
            placeholder="Search questions..."
            className="h-9 border-border/30 bg-background/50 pl-9 text-sm placeholder:text-muted-foreground/40"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                updateParam('q', (event.currentTarget as HTMLInputElement).value);
              }
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 gap-2 px-3 text-xs font-medium text-muted-foreground hover:text-foreground"
            onClick={handleRandom}
          >
            <Shuffle className="h-3.5 w-3.5" />
            Random
          </Button>
          <Button
            variant={runnable === 'true' ? 'primary' : 'secondary'}
            size="sm"
            className={cn(
              'h-9 px-3 text-xs font-medium',
              runnable === 'true' && 'shadow-sm shadow-primary/20'
            )}
            onClick={() => updateParam('runnable', runnable === 'true' ? '' : 'true')}
          >
            {runnable === 'true' ? 'Runnable' : 'Runnable Only'}
          </Button>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="h-9 gap-1.5 px-3 text-xs font-medium text-muted-foreground hover:text-foreground"
              onClick={handleClearAll}
            >
              <X className="h-3.5 w-3.5" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Tags row */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1.5 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/50">
            <Filter className="h-3 w-3" />
            Topics
          </span>
          {allTags.map((tag) => {
            const active = selectedTag === tag || (!selectedTag && tag === 'all');
            return (
              <button
                key={tag}
                type="button"
                onClick={() => updateParam('tag', tag)}
                className={cn(
                  'inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium uppercase tracking-wider transition-all',
                  active
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground/60 hover:bg-muted/40 hover:text-foreground/80',
                )}
              >
                {active && <Sparkles className="h-2.5 w-2.5" />}
                {tag}
              </button>
            );
          })}
        </div>

        {/* Status row */}
        <div className="flex flex-wrap items-center gap-1.5 border-t border-border/20 pt-3">
          <span className="mr-1.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/50">
            Status
          </span>
          {(['all', 'answered', 'unanswered', 'bookmarked'] as const).map((entry) => {
            const active = status === entry || (!status && entry === 'all');
            return (
              <button
                key={entry}
                type="button"
                onClick={() => updateParam('status', entry)}
                className={cn(
                  'rounded-md px-2 py-1 text-[10px] font-medium uppercase tracking-wider transition-all',
                  active
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground/60 hover:bg-muted/40 hover:text-foreground/80',
                )}
              >
                {entry}
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading indicator */}
      {isPending && (
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 animate-pulse rounded-full bg-primary" />
          <p className="text-[10px] font-medium uppercase tracking-widest text-primary/70">Updating...</p>
        </div>
      )}
    </section>
  );
}
