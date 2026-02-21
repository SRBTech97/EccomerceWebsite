"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../../lib/hooks/use-cart';

export function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  const isCustomer = pathname.startsWith('/(customer)') || pathname === '/';

  return (
    <header className="border-b border-slate-100 bg-white/80 backdrop-blur">
      <div className="container-max flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="rounded-full bg-brand px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            MyntraX
          </span>
        </Link>

        {isCustomer ? (
          <nav className="flex items-center gap-4 text-sm font-medium text-slate-700">
            <Link href="/(customer)/products" className="hover:text-brand">
              Women
            </Link>
            <Link href="/(customer)/products" className="hover:text-brand">
              Men
            </Link>
            <Link href="/(customer)/products" className="hover:text-brand">
              Kids
            </Link>
          </nav>
        ) : (
          <nav className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wide text-slate-600">
            <Link href="/(admin)/dashboard" className="hover:text-brand">
              Admin
            </Link>
          </nav>
        )}

        {isCustomer && (
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/(customer)/orders" className="text-slate-700 hover:text-brand">
              Orders
            </Link>
            <Link
              href="/(customer)/cart"
              className="relative rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
            >
              Bag
              {totalItems > 0 && (
                <span className="ml-2 rounded-full bg-brand px-1.5 py-0.5 text-[10px]">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
