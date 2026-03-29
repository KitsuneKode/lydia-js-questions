'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

type OptionKey = 'A' | 'B' | 'C' | 'D';

interface UseQuestionKeyboardOptions {
  isAnswered: boolean;
  options: { key: string }[];
  prevHref: string | null;
  nextHref: string | null;
  onSelectOption: (key: string) => void;
  onRevealToggle?: () => void;
  onRunCode?: () => void;
  onOpenScratchpad?: () => void;
}

const OPTION_KEYS: Record<string, OptionKey> = {
  a: 'A',
  '1': 'A',
  b: 'B',
  '2': 'B',
  c: 'C',
  '3': 'C',
  d: 'D',
  '4': 'D',
};

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName.toLowerCase();
  // Monaco mounts inside a div with data-monaco-editor-root; also reject textareas, inputs
  return (
    tag === 'input' ||
    tag === 'textarea' ||
    target.isContentEditable ||
    !!target.closest('[data-monaco-editor-root]') ||
    !!target.closest('.monaco-editor')
  );
}

export function useQuestionKeyboard({
  isAnswered,
  options,
  prevHref,
  nextHref,
  onSelectOption,
  onRevealToggle,
  onRunCode,
  onOpenScratchpad,
}: UseQuestionKeyboardOptions) {
  const router = useRouter();

  const handler = useCallback(
    (e: KeyboardEvent) => {
      // Never fire on modifier combos (Ctrl+R, Cmd+K, etc.)
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (isEditableTarget(e.target)) return;

      const key = e.key.toLowerCase();

      // 1-4 or a-d → select option (only before answering)
      if (!isAnswered && key in OPTION_KEYS) {
        const optionKey = OPTION_KEYS[key];
        const exists = options.some((o) => o.key === optionKey);
        if (exists) {
          e.preventDefault();
          onSelectOption(optionKey);
        }
        return;
      }

      // Arrow navigation
      if (e.key === 'ArrowLeft' && prevHref) {
        e.preventDefault();
        router.push(prevHref);
        return;
      }

      // Only allow forward navigation after answering — enforces practice discipline
      if (e.key === 'ArrowRight' && nextHref && isAnswered) {
        e.preventDefault();
        router.push(nextHref);
        return;
      }

      // Space → reveal/toggle explanation (after answering)
      if (e.key === ' ' && isAnswered && onRevealToggle) {
        e.preventDefault();
        onRevealToggle();
        return;
      }

      // r → run code (after answering)
      if (key === 'r' && isAnswered && onRunCode) {
        e.preventDefault();
        onRunCode();
        return;
      }

      // k → open scratchpad
      if (key === 'k' && onOpenScratchpad) {
        e.preventDefault();
        onOpenScratchpad();
        return;
      }
    },
    [
      isAnswered,
      options,
      prevHref,
      nextHref,
      onSelectOption,
      onRevealToggle,
      onRunCode,
      onOpenScratchpad,
      router,
    ],
  );

  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handler]);
}
