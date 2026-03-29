'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Search, CheckCircle2, Code2, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CardTilt } from '@/components/ui/card-tilt';

interface LandingSectionsProps {
  tagCounts: { tag: string; count: number }[];
}

const workflowSteps = [
  {
    id: 1,
    icon: Search,
    title: 'Find a question',
    description: 'Filter by topic, dial in the difficulty, or command palette directly to concepts.',
  },
  {
    id: 2,
    icon: CheckCircle2,
    title: 'Commit to an answer',
    description: 'No peeking. Force yourself to commit to an outcome before the explanation reveals.',
  },
  {
    id: 3,
    icon: Code2,
    title: 'Run the code',
    description: 'Pop open the scratchpad. Execute snippets. See the raw output immediately.',
  },
  {
    id: 4,
    icon: Eye,
    title: 'Understand why',
    description: 'Deep dive into the explanation. Deconstruct the event loop and execution context.',
  },
];

function StickyCard({ step, index, total }: { step: any; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const filter = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(10px)']);

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        opacity,
        filter,
        zIndex: index,
        top: `calc(15vh + ${index * 24}px)`,
        perspective: "1000px"
      }}
      className="sticky min-h-[50vh] w-full max-w-4xl mx-auto mb-24"
    >
      <CardTilt maxTilt={8} scale={1.01} className="rounded-[24px] border border-border-subtle bg-surface shadow-2xl overflow-hidden flex flex-col md:flex-row h-full transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(245,158,11,0.08)]">
        {/* Card Content */}
        <div className="p-8 md:p-12 flex-1 flex flex-col justify-center bg-gradient-to-br from-surface to-elevated" style={{ transform: "translateZ(30px)" }}>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-8 border border-primary/20 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
          >
            <step.icon className="h-7 w-7" />
          </motion.div>
          <h3 className="font-display text-4xl text-foreground mb-4">{step.title}</h3>
          <p className="text-secondary text-lg leading-relaxed">{step.description}</p>
          <div className="mt-auto pt-8">
            <span className="font-mono text-border font-bold text-5xl opacity-40">
              0{step.id}
            </span>
          </div>
        </div>
        {/* Placeholder Visuals */}
        <div className="flex-1 bg-[#09090B] border-l border-border-subtle p-8 flex items-center justify-center relative overflow-hidden" style={{ transform: "translateZ(50px)" }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
          <motion.div
            initial={{ rotate: -10, scale: 0.9 }}
            whileInView={{ rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', bounce: 0.4, delay: 0.2 }}
            className="w-full aspect-square max-w-[280px] rounded-3xl border border-primary/20 bg-[#111113] flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.15)] relative z-10 backdrop-blur-sm"
          >
            <step.icon className="h-24 w-24 text-primary opacity-20" />
          </motion.div>
        </div>
      </CardTilt>
    </motion.div>
  );
}

export function LandingSections({ tagCounts }: LandingSectionsProps) {
  return (
    <div className="w-full">
      {/* How It Works - Sticky Scroll */}
      <section className="py-32 relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.05)_0%,transparent_50%)]" />
        
        <div className="max-w-4xl mx-auto px-4 mb-24 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="font-display text-4xl md:text-6xl text-foreground mb-6 tracking-tight"
          >
            The Dark Forge Method
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="text-secondary text-lg max-w-2xl mx-auto"
          >
            A precision-engineered practice loop designed to commit advanced JavaScript concepts to your long-term memory.
          </motion.p>
        </div>

        <div className="px-4 pb-32">
          {workflowSteps.map((step, i) => (
            <StickyCard key={step.id} step={step} index={i} total={workflowSteps.length} />
          ))}
        </div>
      </section>

      {/* Topic Coverage - Bento Grid */}
      <section className="py-32 px-4 max-w-6xl mx-auto border-t border-border-subtle relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.03)_0%,transparent_50%)]" />

        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="font-display text-4xl md:text-5xl text-foreground mb-4 tracking-tight"
          >
            Master Every Concept
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="text-secondary text-lg"
          >
            Comprehensive coverage across {tagCounts.length} core topics
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[200px]">
          {tagCounts.map((tagObj, i) => {
            const isFeatured = i === 0 || i === 3;
            const maxCount = Math.max(...tagCounts.map((t) => t.count));

            return (
              <motion.div
                key={tagObj.tag}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                className={cn(
                  'group relative rounded-[24px] border border-border-subtle bg-surface p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-10px_rgba(245,158,11,0.15)] hover:border-primary/40',
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : ''
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="font-display text-3xl text-foreground group-hover:text-primary transition-colors capitalize">
                      {tagObj.tag}
                    </h3>
                    <p className="text-sm text-secondary mt-2 font-mono group-hover:text-foreground transition-colors">
                      {tagObj.count} challenges
                    </p>
                  </div>

                  {/* Heat indicator */}
                  <div className="flex gap-2 mt-8">
                    {[...Array(5)].map((_, idx) => {
                      const fillThreshold = Math.ceil((tagObj.count / maxCount) * 5);
                      const isFilled = idx < fillThreshold;
                      return (
                        <div
                          key={idx}
                          className={cn(
                            'h-2 flex-1 rounded-full transition-colors duration-500',
                            isFilled
                              ? 'bg-primary/70 group-hover:bg-primary shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                              : 'bg-border-subtle group-hover:bg-border-focus'
                          )}
                        />
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}