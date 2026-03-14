'use client';

import { useMemo, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, Sparkles, Shuffle } from 'lucide-react';

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

  function handleRandom() {
    const randomId = Math.floor(Math.random() * totalQuestions) + 1;
    router.push(`/questions/${randomId}`);
  }

  return (
    <section className="space-y-6 rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
          <Input
            defaultValue={search}
            placeholder="Search questions or keywords..."
            className="h-10 border-border/40 bg-black/20 pl-10 text-sm focus:border-primary/50 focus:ring-primary/20"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                updateParam('q', (event.currentTarget as HTMLInputElement).value);
              }
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="h-10 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
            onClick={handleRandom}
          >
            <Shuffle className="mr-2 h-3.5 w-3.5" />
            Random
          </Button>
          <Button
            variant={runnable === 'true' ? 'primary' : 'secondary'}
            size="sm"
            className="h-10 px-4 text-xs font-bold uppercase tracking-wider"
            onClick={() => updateParam('runnable', runnable === 'true' ? '' : 'true')}
          >
            {runnable === 'true' ? 'Runnable Active' : 'Runnable Only'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-10 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.delete('q');
              params.delete('tag');
              params.delete('runnable');
              params.delete('status');
              startTransition(() => {
                router.push(`${pathname}?${params.toString()}`);
              });
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 border-b border-border/20 pb-4">
          <span className="mr-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">Concepts</span>
          {allTags.map((tag) => {
            const active = selectedTag === tag || (!selectedTag && tag === 'all');
            return (
              <button
                key={tag}
                type="button"
                onClick={() => updateParam('tag', tag)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all',
                  active
                    ? 'border-primary/50 bg-primary/10 text-primary shadow-sm shadow-primary/10'
                    : 'border-border/40 bg-muted/20 text-muted-foreground/70 hover:border-border hover:bg-muted/40 hover:text-foreground',
                )}
              >
                {active && <Sparkles className="h-3 w-3 fill-current" />}
                {tag}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">Status</span>
          {(['all', 'answered', 'unanswered', 'bookmarked'] as const).map((entry) => {
            const active = status === entry || (!status && entry === 'all');
            return (
              <button
                key={entry}
                type="button"
                onClick={() => updateParam('status', entry)}
                className={cn(
                  'rounded-lg border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all',
                  active
                    ? 'border-primary/50 bg-primary/10 text-primary shadow-sm shadow-primary/10'
                    : 'border-border/40 bg-muted/20 text-muted-foreground/70 hover:border-border hover:bg-muted/40 hover:text-foreground',
                )}
              >
                {entry}
              </button>
            );
          })}
        </div>
      </div>

      {isPending && (
        <div className="flex items-center gap-2 animate-pulse">
          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary/70">Updating library...</p>
        </div>
      )}
    </section>
  );
}
