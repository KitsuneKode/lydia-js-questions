import Link from 'next/link';
import { ArrowRight, Search, CheckCircle2, Code2, Eye } from 'lucide-react';

import { Container } from '@/components/container';
import { LandingHero } from '@/components/landing-hero';
import { TagDistribution } from '@/components/tag-distribution';
import { QuestionCard } from '@/components/question-card';
import { ContinueLearningShelf } from '@/components/continue-learning-shelf';
import { Button } from '@/components/ui/button';
import { getManifest, getQuestions } from '@/lib/content/loaders';

const workflowSteps = [
  {
    icon: Search,
    title: 'Find a question',
    description: 'Browse by topic, difficulty, or search for specific concepts.',
  },
  {
    icon: CheckCircle2,
    title: 'Commit to an answer',
    description: 'Choose your answer before seeing the explanation.',
  },
  {
    icon: Code2,
    title: 'Run the code',
    description: 'Execute snippets and see real output in your browser.',
  },
  {
    icon: Eye,
    title: 'Understand why',
    description: 'Read detailed explanations and visualize execution.',
  },
];

export default function HomePage() {
  const manifest = getManifest();
  const questions = getQuestions();

  const featured = questions.slice(0, 6);

  const tagCounts = Object.entries(
    questions.flatMap((question) => question.tags).reduce<Record<string, number>>((acc, tag) => {
      acc[tag] = (acc[tag] ?? 0) + 1;
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7)
    .map(([tag, count]) => ({ tag, count }));

  return (
    <main>
      <Container>
        <LandingHero
          total={manifest.totals.questions}
          runnable={manifest.totals.runnable}
          tagCount={manifest.tags.length}
        />

        <ContinueLearningShelf questions={questions} />

        {/* Two-column section */}
        <section className="grid gap-6 pb-16 lg:grid-cols-2">
          <TagDistribution values={tagCounts} />

          {/* Study Workflow */}
          <div className="rounded-lg border border-border bg-surface p-5 md:p-6">
            <h2 className="font-display text-xl text-foreground">How It Works</h2>
            <p className="mt-1 text-sm text-muted-foreground">Practice loop designed for retention</p>

            <div className="mt-6 space-y-4">
              {workflowSteps.map((step, i) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <step.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="text-sm font-medium text-foreground">{step.title}</h3>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <Link href="/questions">
                <Button className="w-full gap-2 sm:w-auto">
                  Start Practicing
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured questions */}
        <section className="pb-16">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl text-foreground">Featured Questions</h2>
              <p className="mt-1 text-sm text-muted-foreground">Start with these popular challenges</p>
            </div>
            <Link href="/questions" className="group inline-flex items-center gap-1 text-sm font-medium text-primary">
              View all {questions.length}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
