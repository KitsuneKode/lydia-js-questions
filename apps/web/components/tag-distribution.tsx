'use client';

import { motion } from 'motion/react';

interface TagDistributionProps {
  values: Array<{ tag: string; count: number }>;
}

export function TagDistribution({ values }: TagDistributionProps) {
  if (values.length === 0) {
    return null;
  }

  const max = Math.max(...values.map((item) => item.count));

  return (
    <div className="rounded-lg border border-border bg-surface p-5 md:p-6">
      <h2 className="font-display text-xl text-foreground">Topic Coverage</h2>
      <p className="mt-1 text-sm text-muted-foreground">Questions by concept area</p>

      <div className="mt-6 space-y-4">
        {values.map((item, index) => {
          const width = Math.max((item.count / max) * 100, 8);

          return (
            <div key={item.tag} className="group">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground capitalize">{item.tag}</span>
                <span className="font-mono text-xs text-muted-foreground">{item.count}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${width}%` }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.05,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
