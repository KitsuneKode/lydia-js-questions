import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Container } from '@/components/container';
import { QuestionClientShell } from '@/components/question-client-shell';
import { getQuestionById, getQuestions, getRelatedQuestions } from '@/lib/content/loaders';
import { QuestionCard } from '@/components/question-card';

interface QuestionDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function QuestionDetailPage({ params }: QuestionDetailPageProps) {
  const resolvedParams = await params;
  const id = Number.parseInt(resolvedParams.id, 10);

  if (!Number.isFinite(id)) {
    notFound();
  }

  const question = getQuestionById(id);
  if (!question) {
    notFound();
  }

  const all = getQuestions();
  const prev = all.find((item) => item.id === id - 1) ?? null;
  const next = all.find((item) => item.id === id + 1) ?? null;
  const related = getRelatedQuestions(question, 3);

  return (
    <main className="py-8 md:py-10">
      <Container>
        <div className="space-y-16">
          <QuestionClientShell
            key={question.id}
            question={question}
            prevId={prev?.id ?? null}
            nextId={next?.id ?? null}
          />

          {related.length > 0 && (
            <section className="space-y-6 pt-10 border-t border-border/40">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="font-display text-2xl font-medium tracking-tight">Keep Practicing</h2>
                  <p className="text-sm text-muted-foreground">Related questions based on similar JavaScript concepts.</p>
                </div>
                <Link href="/questions" className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                  View Library <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <QuestionCard key={item.id} question={item} />
                ))}
              </div>
            </section>
          )}
        </div>
      </Container>
    </main>
  );
}
