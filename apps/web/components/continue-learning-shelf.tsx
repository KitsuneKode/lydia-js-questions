'use client';

import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

import type { QuestionRecord } from '@/lib/content/types';
import { useAnalytics } from '@/lib/progress/use-analytics';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ContinueLearningShelfProps {
  questions: QuestionRecord[];
}

export function ContinueLearningShelf({ questions }: ContinueLearningShelfProps) {
  const { ready, continueLearning, overall } = useAnalytics(questions);

  if (!ready || overall.totalAnswered === 0 || !continueLearning.question) {
    return null;
  }

  const q = continueLearning.question;

  return (
    <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Card className="overflow-hidden border-primary/20 bg-gradient-to-r from-primary/10 via-card/50 to-card shadow-lg shadow-black/20">
        <CardContent className="flex flex-col items-center justify-between gap-6 p-6 md:flex-row">
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary ring-1 ring-primary/30">
              <Play className="h-6 w-6 fill-current" />
            </div>
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Resume Practice</p>
              <h2 className="font-display text-xl font-medium text-foreground md:text-2xl">{q.title}</h2>
              <div className="mt-1 flex flex-wrap gap-2">
                {q.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs text-muted-foreground/60">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex w-full shrink-0 items-center gap-3 md:w-auto">
            <Link href={`/questions/${q.id}`} className="flex-1 md:flex-none">
              <Button size="lg" className="w-full shadow-md shadow-primary/20">
                Continue learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard" className="hidden md:block">
              <Button variant="secondary" size="lg">
                View hub
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
