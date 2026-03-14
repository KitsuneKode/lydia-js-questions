import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium uppercase tracking-wide transition-colors',
  {
    variants: {
      variant: {
        default: 'border-border bg-card text-muted-foreground',
        secondary: 'border-muted/30 bg-muted/20 text-muted-foreground',
        outline: 'border-border bg-transparent text-foreground',
        success: 'border-success/40 bg-success/10 text-success',
        warning: 'border-warning/40 bg-warning/10 text-warning',
        danger: 'border-danger/40 bg-danger/10 text-danger',
        primary: 'border-primary/50 bg-primary/10 text-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  tone?: 'default' | 'success' | 'warning' | 'danger'; // Keep for compatibility
}

export function Badge({ className, variant, tone, ...props }: BadgeProps) {
  // Map tone to variant for backward compatibility
  const finalVariant = variant || (tone === 'default' ? 'default' : tone) || 'default';
  return <span className={cn(badgeVariants({ variant: finalVariant as any }), className)} {...props} />;
}
