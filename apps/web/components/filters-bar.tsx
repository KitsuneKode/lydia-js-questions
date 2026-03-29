'use client';

import { Filter, Search, Sparkles, X, Flame } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useTransition, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import type { QuestionRecord } from '@/lib/content/types';

interface FiltersBarProps {
  tags: string[];
  selectedTag: string;
  search: string;
  runnable: string;
  status: string;
  difficulty?: string;
  totalQuestions: number;
  allQuestions: QuestionRecord[];
}

export function FiltersBar({
  tags,
  selectedTag,
  search,
  runnable,
  status,
  difficulty,
  totalQuestions,
  allQuestions,
}: FiltersBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(search);

  const allTags = useMemo(() => ['all', ...tags], [tags]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== search) {
        updateParam('q', inputValue);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue, search]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

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

  return (
    <section className="space-y-6">
      {/* Horizontal Pill Filter Bar for Topics */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide w-full max-w-full">
        {allTags.map((tag) => {
          const active = selectedTag === tag || (!selectedTag && tag === 'all');
          return (
            <button
              key={tag}
              type="button"
              onClick={() => updateParam('tag', tag)}
              className={cn(
                'relative px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors rounded-full',
                active ? 'text-primary' : 'text-secondary hover:text-foreground hover:bg-surface'
              )}
            >
              {tag === 'all' ? 'All Questions' : tag.charAt(0).toUpperCase() + tag.slice(1)}
              {active && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 border-2 border-primary rounded-full bg-primary/5"
                  initial={false}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Secondary Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between border-b border-border-subtle pb-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center justify-between w-full sm:w-[280px] h-10 bg-surface border border-border-subtle rounded-lg px-3 text-sm text-tertiary hover:border-primary/50 transition-all group"
          >
            <span className="flex items-center gap-2">
              <Search className="h-4 w-4 text-tertiary group-hover:text-primary transition-colors" />
              {search ? `Search: "${search}"` : 'Search questions...'}
            </span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border-subtle bg-muted/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
          
          <CommandDialog open={open} onOpenChange={setOpen}>
            <Command className="flex h-full flex-col overflow-hidden rounded-xl border border-border-subtle bg-popover shadow-2xl">
              <CommandInput 
                placeholder="Type a keyword, concept, or question number..." 
                value={inputValue}
                onValueChange={setInputValue}
              />
              <CommandList className="h-[400px]">
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Questions">
                  {allQuestions.filter(q => q.title.toLowerCase().includes((inputValue || '').toLowerCase()) || q.tags.some(t => t.toLowerCase().includes((inputValue || '').toLowerCase()))).slice(0, 10).map((q) => (
                    <CommandItem 
                      key={q.id}
                      onSelect={() => {
                        setOpen(false);
                        router.push(`/questions/${q.id}`);
                      }}
                      className="flex cursor-pointer items-center justify-between py-3 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-tertiary">#{q.id}</span>
                        <span className="text-sm font-medium text-foreground">{q.title}</span>
                      </div>
                      <div className="flex gap-2">
                        {q.tags.slice(0, 2).map(t => (
                           <span key={t} className="rounded border border-border-subtle bg-surface px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-tertiary">{t}</span>
                        ))}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </CommandDialog>

          {/* Difficulty Dropdown Placeholder (using pill for now) */}
          <div className="hidden sm:flex items-center gap-1.5 bg-surface border border-border-subtle rounded-lg p-1">
             {(['beginner', 'intermediate', 'advanced'] as const).map(diff => {
               const isActive = difficulty === diff;
               return (
                 <button 
                   key={diff} 
                   onClick={() => updateParam('difficulty', isActive ? '' : diff)}
                   className={cn(
                     "px-3 py-1 text-xs font-medium rounded-md capitalize transition-colors",
                     isActive ? "bg-primary/20 text-primary" : "text-secondary hover:text-foreground hover:bg-elevated"
                   )}
                 >
                   {diff}
                 </button>
               );
             })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => updateParam('runnable', runnable === 'true' ? '' : 'true')}
            className={cn(
              "flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-3 py-2 rounded-lg border transition-all",
              runnable === 'true' ? "bg-primary/10 border-primary/30 text-primary shadow-[0_0_10px_rgba(245,158,11,0.2)]" : "bg-surface border-border-subtle text-secondary hover:bg-elevated"
            )}
          >
            <Flame className={cn("h-3.5 w-3.5", runnable === 'true' ? "fill-primary" : "")} />
            Hard Mode Only
          </button>
          
          {(search || (selectedTag && selectedTag !== 'all') || runnable === 'true' || (status && status !== 'all')) && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-tertiary hover:text-foreground h-9"
              onClick={() => {
                startTransition(() => {
                  router.push(pathname);
                });
              }}
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>
      
      {/* Loading indicator */}
      {isPending && (
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary/70">
            Filtering...
          </p>
        </div>
      )}
    </section>
  );
}
