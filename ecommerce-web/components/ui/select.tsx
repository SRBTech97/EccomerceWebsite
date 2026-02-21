import type { SelectHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={clsx(
        'w-full rounded-full border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
