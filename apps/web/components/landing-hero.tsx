'use client';

import { ArrowRight, CheckCircle2, ChevronRight, XCircle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LandingHeroProps {
  total: number;
  runnable: number;
  tagCount: number;
}

const TextGenerateEffect = ({ words }: { words: string }) => {
  const wordsArray = words.split(' ');
  return (
    <motion.div>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{
            duration: 0.8,
            delay: idx * 0.08,
            type: 'spring',
            bounce: 0.1,
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export function LandingHero({ total, runnable, tagCount }: LandingHeroProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const demoQuestion = {
    code: `function getAge() {
  'use strict';
  age = 21;
  console.log(age);
}

getAge();`,
    options: [
      { id: 1, text: '21' },
      { id: 2, text: 'ReferenceError' },
      { id: 3, text: 'undefined' },
      { id: 4, text: 'TypeError' },
    ],
    correctId: 2,
    explanation:
      "With 'use strict', you cannot accidentally declare global variables. Since 'age' is not declared with let, const, or var, it throws a ReferenceError.",
  };

  const handleSelect = (id: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(id);
    }
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-32 min-h-[90vh] flex flex-col justify-center overflow-hidden">
      {/* Dynamic Background Spotlight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-0 right-0 h-[80vh] w-[80vw] translate-x-1/4 -translate-y-1/4 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.12)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 left-0 h-[60vh] w-[60vw] -translate-x-1/3 translate-y-1/3 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08)_0%,transparent_60%)]" />
        <div className="absolute top-1/2 left-1/2 h-[50vh] w-[50vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03)_0%,transparent_50%)]" />
      </motion.div>

      <div className="mx-auto max-w-7xl grid gap-16 lg:grid-cols-2 lg:items-center w-full">
        {/* Left: Copy */}
        <div className="space-y-8 z-10 relative">
          {/* Subtle accent badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary shadow-[0_0_15px_rgba(245,158,11,0.1)]"
          >
            <Zap className="h-3 w-3 fill-primary" />
            Atlas v2.0
          </motion.div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[clamp(3rem,2rem+3vw,4.5rem)] font-normal leading-[1.05] tracking-tight text-foreground">
            <TextGenerateEffect words="Master JavaScript. One question at a time." />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, type: 'spring', bounce: 0.1 }}
            className="max-w-[540px] text-lg font-sans leading-relaxed text-secondary"
          >
            Execute code in-browser, visualize execution flow, and master the core mechanics. A
            precision instrument forged for advanced JavaScript mastery.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, type: 'spring', bounce: 0.1 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <Link href="/questions">
              <Button
                size="lg"
                className="relative h-12 gap-2 bg-primary text-primary-foreground font-medium px-8 rounded-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.97] shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
              >
                Start Practicing
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/credits">
              <Button
                variant="ghost"
                size="lg"
                className="h-12 px-8 font-medium text-secondary hover:text-foreground transition-all duration-300 hover:bg-white/5 active:scale-[0.97]"
              >
                View on GitHub
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right: Live Interactive Demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.5, type: 'spring', bounce: 0.15 }}
          className="relative lg:ml-auto w-full max-w-[500px] z-10 group"
        >
          {/* Floating animation wrapper */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6, ease: 'easeInOut' }}
            className="rounded-2xl border border-border-subtle bg-surface shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl transition-all duration-500 hover:border-border-focus group-hover:shadow-[0_20px_50px_rgba(245,158,11,0.1)]"
          >
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle bg-elevated/50">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-border-subtle" />
                <div className="h-3 w-3 rounded-full bg-border-subtle" />
                <div className="h-3 w-3 rounded-full bg-border-subtle" />
              </div>
              <span className="ml-2 text-xs font-mono text-tertiary">demo.js</span>
            </div>

            {/* Code Block */}
            <div className="p-5 bg-code font-mono text-[13px] leading-relaxed text-primary">
              <pre>
                <code>
                  <span className="text-code-accent">function</span>{' '}
                  <span className="text-primary">getAge</span>() {'{\n'}
                  {'  '}
                  <span className="text-status-correct">'use strict'</span>;\n{'  '}age ={' '}
                  <span className="text-[#F59E0B]">21</span>;\n{'  '}console.
                  <span className="text-code-accent">log</span>(age);\n{'}\n\n'}
                  <span className="text-primary">getAge</span>();
                </code>
              </pre>
            </div>

            {/* Answers */}
            <div className="p-5 flex flex-col gap-2 bg-surface relative">
              {/* Subtle inner gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 pointer-events-none" />

              {demoQuestion.options.map((opt, i) => {
                const isSelected = selectedAnswer === opt.id;
                const isCorrect = opt.id === demoQuestion.correctId;
                const showStatus = selectedAnswer !== null;

                let stateClass =
                  'border-border-subtle hover:border-tertiary hover:bg-elevated text-secondary';
                if (showStatus) {
                  if (isSelected && isCorrect)
                    stateClass =
                      'border-status-correct bg-status-correct/10 text-status-correct shadow-[0_0_15px_rgba(34,197,94,0.15)]';
                  else if (isSelected && !isCorrect)
                    stateClass = 'border-status-wrong bg-status-wrong/10 text-status-wrong';
                  else if (isCorrect)
                    stateClass = 'border-status-correct/50 bg-status-correct/5 text-status-correct';
                  else stateClass = 'border-border-subtle/30 text-ghost opacity-40';
                }

                return (
                  <motion.button
                    key={opt.id}
                    initial={false}
                    animate={
                      showStatus && !isSelected && !isCorrect ? { scale: 0.98, opacity: 0.6 } : {}
                    }
                    onClick={() => handleSelect(opt.id)}
                    disabled={selectedAnswer !== null}
                    className={cn(
                      'relative z-10 w-full text-left px-4 py-3 rounded-lg border transition-all duration-300 flex items-center justify-between font-mono text-sm active:scale-[0.98]',
                      stateClass,
                    )}
                  >
                    <span>{opt.text}</span>
                    {showStatus && isSelected && (
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', bounce: 0.5 }}
                      >
                        {isCorrect ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <XCircle className="h-4 w-4" />
                        )}
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {selectedAnswer !== null && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.6 }}
                  className="overflow-hidden border-t border-border-subtle bg-elevated/80 relative"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                  <div className="p-5 pl-6 space-y-3">
                    <h4 className="text-sm font-semibold text-primary flex items-center gap-2">
                      <ChevronRight className="h-4 w-4" /> Explanation
                    </h4>
                    <p className="text-[13px] text-secondary leading-relaxed">
                      {demoQuestion.explanation}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Ticker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1, ease: 'easeOut' }}
        className="absolute bottom-0 inset-x-0 border-t border-border-subtle bg-surface/80 backdrop-blur-xl py-4 overflow-hidden"
      >
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-12 px-6 text-[13px] font-medium text-tertiary"
            >
              <span className="text-primary">{total} Questions</span>
              <span>•</span>
              <span className="text-foreground">{tagCount} Topics</span>
              <span>•</span>
              <span>100% Free</span>
              <span>•</span>
              <span>Open Source</span>
              <span>•</span>
              <span className="text-foreground">{runnable} Runnable Snippets</span>
              <span>•</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
