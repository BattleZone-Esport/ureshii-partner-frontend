import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = {
  variant: {
    default: 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/20',
    destructive: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20',
    outline: 'border border-surface-border bg-transparent hover:bg-surface-elevated hover:text-accent-foreground',
    secondary: 'bg-surface-elevated text-secondary-foreground hover:bg-surface-overlay',
    ghost: 'hover:bg-surface-elevated hover:text-accent-foreground',
    link: 'text-primary-600 underline-offset-4 hover:underline',
    gradient: 'bg-gradient-primary text-white hover:opacity-90 shadow-lg',
  },
  size: {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    xl: 'h-12 rounded-md px-10 text-lg',
    icon: 'h-10 w-10',
  },
};

const Button = React.forwardRef(
  ({ 
    className, 
    variant = 'default', 
    size = 'default', 
    loading = false,
    disabled = false,
    children,
    ...props 
  }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          'active:scale-95',
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };