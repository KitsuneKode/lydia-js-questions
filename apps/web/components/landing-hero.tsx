'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Flame, Telescope, Workflow } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface LandingHeroProps {
  total: number;
  runnable: number;
  tagCount: number;
}

export function LandingHero({ total, runnable, tagCount }: LandingHeroProps) {
  const stats = [
    { label: 'Questions', value: total, icon: Telescope },
    { label: 'Runnable snippets', value: runnable, icon: Workflow },
    { label: 'Concept cloaks', value: tagCount, icon: Flame },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            Interactive JavaScript Interview Atlas
          </div>
          <h1 className="font-display text-5xl font-medium leading-[1.1] tracking-tight text-foreground md:text-7xl">
            Learn by answering, running, and <span className="text-primary/90">visualizing</span> each JavaScript challenge.
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground/80 md:text-xl">
            Built from the world&apos;s most famous JavaScript dataset with premium sandboxing and event-loop timeline views.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/questions">
              <Button size="lg" className="h-14 gap-2 px-8 text-base shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                Start Practicing
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/credits">
              <Button variant="ghost" size="lg" className="h-14 gap-2 px-8 text-base text-muted-foreground hover:text-foreground">
                View Source
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent blur-2xl" />
          <div className="relative grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {stats.map((item, idx) => (
              <Card key={item.label} className="overflow-hidden border-border/60 bg-card/60 backdrop-blur-md shadow-xl shadow-black/10 transition-transform duration-300 hover:-translate-x-1">
                <CardContent className="flex items-center justify-between p-5">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">{item.label}</p>
                    <p className="font-display text-4xl font-medium text-foreground tracking-tight">{item.value}</p>
                  </div>
                  <motion.div
                    initial={{ rotate: -12, scale: 0.9 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.08 + 0.3 }}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary shadow-sm"
                  >
                    <item.icon className="h-6 w-6" />
                  </motion.div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
