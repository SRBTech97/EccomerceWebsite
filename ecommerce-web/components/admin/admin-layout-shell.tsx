"use client";

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminLayoutShellProps {
  children: ReactNode;
}

export function AdminLayoutShell({ children }: AdminLayoutShellProps) {
  const pathname = usePathname();

  const items = [
    { href: '/admin/dashboard', label: 'Dashboard' },
    { href: '/admin/products', label: 'Products' },
    { href: '/admin/inventory', label: 'Inventory' },
    { href: '/admin/analytics', label: 'Analytics' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white px-4 py-6 md:flex">
        <div className="mb-6 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Admin Console
        </div>
        <nav className="flex flex-1 flex-col gap-1 text-sm">
          {items.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 font-medium transition-colors ${
                  active
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1">
        <div className="border-b border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 md:hidden">
          Admin Console
        </div>
        <div className="container-max py-6 md:py-8">{children}</div>
      </main>
    </div>
  );
}
