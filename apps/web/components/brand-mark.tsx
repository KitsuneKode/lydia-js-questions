import { cn } from '@/lib/utils';

interface BrandMarkProps {
  compact?: boolean;
  className?: string;
}

export function BrandMark({ compact = false, className }: BrandMarkProps) {
  return (
    <span className={cn('inline-flex items-center gap-3.5', compact && 'gap-3', className)}>
      <span
        className={cn(
          'relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-primary/18 via-primary/10 to-code-accent/12 shadow-[0_0_24px_rgba(245,158,11,0.12)]',
          compact && 'h-9 w-9 rounded-[1.15rem]',
        )}
      >
        <span
          className={cn(
            'absolute inset-[1px] rounded-[14px] border border-white/6',
            compact && 'rounded-[1rem]',
          )}
        />
        <span
          className={cn(
            'absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-primary/70 shadow-[0_0_10px_rgba(245,158,11,0.5)]',
            compact && 'left-[7px] top-[7px]',
          )}
        />
        <span className="relative flex flex-col items-center leading-none">
          <span
            className={cn(
              'font-mono text-[12px] font-black tracking-[-0.18em] text-primary drop-shadow-[0_0_10px_rgba(245,158,11,0.35)]',
              compact && 'text-[11px]',
            )}
          >
            JS
          </span>
          <span className={cn('mt-1 h-px w-4 rounded-full bg-primary/55', compact && 'w-3')} />
        </span>
      </span>
      <span className="flex flex-col justify-center">
        <span
          className={cn(
            'font-display text-[1.06rem] leading-none tracking-[-0.04em] text-foreground',
            compact && 'text-[0.96rem]',
          )}
        >
          <span className="text-primary/85">JS</span>{' '}
          <span className="text-foreground">Questions</span>
        </span>
        <span className={cn('mt-1.5 flex items-center gap-2', compact && 'mt-1 gap-1.5')}>
          <span className={cn('h-px w-3.5 rounded-full bg-primary/30', compact && 'w-3')} />
          <span
            className={cn(
              'text-[0.56rem] font-semibold uppercase tracking-[0.4em] text-muted-foreground',
              compact && 'text-[0.5rem] tracking-[0.34em]',
            )}
          >
            LAB
          </span>
        </span>
      </span>
    </span>
  );
}
