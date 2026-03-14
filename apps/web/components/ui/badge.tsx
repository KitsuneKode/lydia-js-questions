import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium leading-none transition-colors',
  {
    variants: {
      variant: {
        default: 'border-border bg-surface text-muted-foreground',
        secondary: 'border-transparent bg-muted/60 text-muted-foreground',
        outline: 'border-border bg-transparent text-foreground',
        success: 'border-success/30 bg-success/10 text-success',
        warning: 'border-warning/30 bg-warning/10 text-warning',
        danger: 'border-danger/30 bg-danger/10 text-danger',
        primary: 'border-primary/30 bg-primary/10 text-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  tone?: 'default' | 'success' | 'warning' | 'danger';
}

export function Badge({ className, variant, tone, ...props }: BadgeProps) {
  const finalVariant = variant || (tone === 'default' ? 'default' : tone) || 'default';
  return <span className={cn(badgeVariants({ variant: finalVariant as any }), className)} {...props} />;
}
