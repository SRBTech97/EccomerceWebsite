import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children?: ReactNode;
}

export function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';
  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-brand text-white hover:bg-brand-dark',
    secondary: 'bg-slate-900 text-white hover:bg-slate-800',
    ghost: 'bg-transparent text-slate-900 hover:bg-slate-100',
  };

  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
