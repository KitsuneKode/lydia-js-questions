'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Terminal, Zap, BookOpen } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface LandingHeroProps {
  total: number;
  runnable: number;
  tagCount: number;
}

const sampleCode = `function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    getCount: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // ?
console.log(counter.getCount());  // ?`;

export function LandingHero({ total, runnable, tagCount }: LandingHeroProps) {
  const stats = [
    { label: 'Questions', value: total },
    { label: 'Runnable', value: runnable },
    { label: 'Topics', value: tagCount },
  ];

  return (
    <section className="relative py-16 md:py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            Open-source JavaScript Interview Practice
          </div>

          <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Master JavaScript interviews through{' '}
            <span className="text-primary">practice</span>.
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Answer real interview questions, run code in your browser, and visualize execution. Built from the world&apos;s most popular JavaScript questions dataset.
          </p>

          {/* Stats inline */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="flex items-baseline gap-1.5"
              >
                <span className="font-display text-2xl font-medium text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <Link href="/questions">
              <Button size="lg" className="gap-2">
                Start Practicing
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/credits">
              <Button variant="secondary" size="lg">
                View Source
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Right: Code preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          {/* Glow */}
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-primary/8 via-transparent to-accent/5 blur-2xl" />

          {/* Terminal window */}
          <div className="relative overflow-hidden rounded-xl border border-border bg-[#0a0c10] shadow-2xl">
            {/* Title bar */}
            <div className="flex items-center gap-2 border-b border-border/50 bg-surface/50 px-4 py-2.5">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-danger/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-warning/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-success/60" />
              </div>
              <span className="ml-2 text-[11px] font-medium text-muted-foreground">closures.js</span>
            </div>

            {/* Code content */}
            <div className="p-5">
              <pre className="font-mono text-[13px] leading-6 text-foreground/80">
                <code>{sampleCode}</code>
              </pre>
            </div>

            {/* Footer with output hint */}
            <div className="border-t border-border/50 bg-surface/30 px-4 py-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Terminal className="h-3.5 w-3.5" />
                <span>What&apos;s the output? Practice to find out.</span>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute -right-2 top-8 flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 shadow-lg md:-right-4"
          >
            <Zap className="h-4 w-4 text-warning" />
            <span className="text-xs font-medium">In-browser execution</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="absolute -left-2 bottom-16 flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 shadow-lg md:-left-4"
          >
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium">Detailed explanations</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
