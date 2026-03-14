'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

import type { QuestionRecord } from '@/lib/content/types';
import { useAnalytics } from '@/lib/progress/use-analytics';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NextRecommendedBannerProps {
  questions: QuestionRecord[];
}

export function NextRecommendedBanner({ questions }: NextRecommendedBannerProps) {
  const { ready, recommended, overall } = useAnalytics(questions);

  if (!ready || !recommended.question) return null;

  const q = recommended.question;

  return (
    <section className="animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card/50 to-card p-6 shadow-lg shadow-black/10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary ring-1 ring-primary/30">
              <Sparkles className="h-5 w-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Recommended for you</p>
                <Badge variant="secondary" className="px-1.5 py-0 text-[9px] opacity-60">
                  {recommended.label}
                </Badge>
              </div>
              <h2 className="mt-1 font-display text-xl font-medium text-foreground transition-colors group-hover:text-primary">
                {q.title}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">{recommended.description}</p>
            </div>
          </div>
          <Link href={`/questions/${q.id}`} className="w-full shrink-0 md:w-auto">
            <Button className="w-full gap-2 px-6 shadow-md shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              Practice Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
