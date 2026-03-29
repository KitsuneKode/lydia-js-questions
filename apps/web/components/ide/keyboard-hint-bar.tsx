'use client';

import { AnimatePresence, motion } from 'motion/react';

interface Shortcut {
  keys: string[];
  label: string;
  active?: boolean;
}

interface KeyboardHintBarProps {
  isAnswered: boolean;
  isRunnable: boolean;
  hasPrev: boolean;
  hasNext: boolean;
}

function Key({ label }: { label: string }) {
  return (
    <kbd className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded bg-elevated border border-border/60 px-1.5 font-mono text-[9px] font-semibold text-muted-foreground shadow-[0_1px_0_0_rgba(0,0,0,0.4)]">
      {label}
    </kbd>
  );
}

export function KeyboardHintBar({
  isAnswered,
  isRunnable,
  hasPrev,
  hasNext,
}: KeyboardHintBarProps) {
  const preAnswerShortcuts: Shortcut[] = [
    { keys: ['A', 'B', 'C', 'D'], label: 'select option', active: !isAnswered },
    { keys: ['1', '2', '3', '4'], label: 'or use numbers', active: !isAnswered },
  ];

  const postAnswerShortcuts: Shortcut[] = [
    { keys: ['Space'], label: 'toggle explanation', active: isAnswered },
    ...(isRunnable ? [{ keys: ['R'], label: 'run code', active: isAnswered }] : []),
    { keys: ['K'], label: 'scratchpad', active: true },
    ...(hasPrev ? [{ keys: ['←'], label: 'prev', active: true }] : []),
    ...(hasNext ? [{ keys: ['→'], label: 'next', active: isAnswered }] : []),
  ];

  const shortcuts = isAnswered
    ? postAnswerShortcuts
    : [...preAnswerShortcuts, { keys: ['K'], label: 'scratchpad', active: true }];

  return (
    <div className="flex h-7 items-center gap-4 border-t border-border/30 bg-void/80 px-4 shrink-0 overflow-x-auto scrollbar-none">
      <AnimatePresence mode="popLayout">
        {shortcuts.map((s) => (
          <motion.div
            key={s.keys.join('+')}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: s.active ? 1 : 0.3, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="flex shrink-0 items-center gap-1.5"
          >
            <span className="flex items-center gap-1">
              {s.keys.map((k) => (
                <Key key={k} label={k} />
              ))}
            </span>
            <span className="text-[10px] text-muted-foreground/60">{s.label}</span>
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="ml-auto shrink-0 text-[9px] font-mono uppercase tracking-widest text-muted-foreground/30">
        keyboard
      </div>
    </div>
  );
}
