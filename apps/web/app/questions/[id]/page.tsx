import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Container } from '@/components/container';
import { QuestionIDEClient } from '@/components/ide/question-ide-client';
import { QuestionCard } from '@/components/question-card';
import { getQuestionById, getQuestions, getRelatedQuestions } from '@/lib/content/loaders';

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
    <main className="min-h-screen bg-void overflow-x-hidden pt-12 flex flex-col">
      {/* Decorative ambient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08)_0%,transparent_70%)] pointer-events-none -z-10" />

      <QuestionIDEClient
        key={question.id}
        question={question}
        prevId={prev?.id ?? null}
        nextId={next?.id ?? null}
      />

      {related.length > 0 && (
        <div className="relative border-t border-border-subtle bg-surface/30 backdrop-blur-sm mt-auto">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <Container>
            <section className="pt-12 pb-24 max-w-[1200px] mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                    <Sparkles className="h-3 w-3" /> Keep Practicing
                  </div>
                  <h2 className="font-display text-2xl text-foreground">
                    Related Concepts
                  </h2>
                </div>
                <Link
                  href={`/questions?tag=${question.tags[0]}`}
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-secondary transition-colors hover:text-primary"
                >
                  View All
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <QuestionCard key={item.id} question={item} />
                ))}
              </div>
            </section>
          </Container>
        </div>
      )}
    </main>
  );
}
