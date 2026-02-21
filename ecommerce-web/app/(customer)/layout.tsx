import type { ReactNode } from 'react';
import { CartProvider } from '../../lib/hooks/use-cart';
import { Navbar } from '../../components/ui/navbar';

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1 pb-10 pt-4 md:pt-6">{children}</main>
      </div>
    </CartProvider>
  );
}
