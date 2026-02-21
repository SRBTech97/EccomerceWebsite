import type { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children?: ReactNode;
  className?: string;
  // Allow React key and other JSX-only props without strict checking.
  [key: string]: unknown;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={clsx('rounded-2xl bg-white shadow-card ring-1 ring-slate-100', className)}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children?: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={clsx('px-4 pt-4 pb-2', className)}>{children}</div>;
}

interface CardContentProps {
  children?: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={clsx('px-4 pb-4', className)}>{children}</div>;
}
