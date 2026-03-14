import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow-[0_1px_2px_hsl(var(--background)/0.4),0_0_16px_hsl(var(--primary)/0.15)] hover:bg-primary/90 hover:shadow-[0_1px_2px_hsl(var(--background)/0.4),0_0_24px_hsl(var(--primary)/0.25)]',
        secondary:
          'border border-border bg-surface text-foreground shadow-sm hover:bg-surface-elevated hover:border-border-strong',
        ghost:
          'text-muted-foreground hover:bg-surface-elevated hover:text-foreground',
        success:
          'bg-success/15 text-success border border-success/30 hover:bg-success/25',
        danger:
          'bg-danger/15 text-danger border border-danger/30 hover:bg-danger/25',
        link:
          'text-primary underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        sm: 'h-8 rounded-md px-3 text-xs',
        md: 'h-9 px-4 text-sm',
        lg: 'h-11 px-6 text-sm',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = 'Button';

export { buttonVariants };
