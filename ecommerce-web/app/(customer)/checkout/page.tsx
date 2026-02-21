"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../../lib/hooks/use-cart';
import { useAuth } from '../../../lib/providers/auth-provider';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { createOrder } from '../../../lib/api/orders';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const { token, isLoggedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      toast.error('Please login to place an order');
      router.push('/login');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await createOrder(items, token!);
      clear();
      toast.success('Order placed successfully!');
      router.push('/orders');
    } catch (err) {
      const message = (err as Error).message ?? 'Failed to place order';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-section grid gap-8 md:grid-cols-[2fr,1fr]">
      <div className="space-y-4">
        <h1 className="text-xl font-semibold text-slate-900">Checkout</h1>
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Shipping details
          </p>
          <Input placeholder="Full name" />
          <Input placeholder="Address" />
          <Input placeholder="City" />
          <div className="flex gap-2">
            <Input placeholder="State" className="w-1/2" />
            <Input placeholder="PIN code" className="w-1/2" />
          </div>
        </div>
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Payment (mock)
          </p>
          <Input placeholder="Card number" />
          <div className="flex gap-2">
            <Input placeholder="MM/YY" className="w-1/2" />
            <Input placeholder="CVV" className="w-1/2" />
          </div>
          <p className="text-xs text-slate-500">
            Payments are mocked in this environment. No real charges will be made.
          </p>
        </div>
      </div>
      <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm">
        <h2 className="text-sm font-semibold text-slate-900">Order summary</h2>
        <div className="flex justify-between">
          <span>Items</span>
          <span>{items.length}</span>
        </div>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(0)}</span>
        </div>
        <div className="flex justify-between text-xs text-emerald-600">
          <span>Delivery</span>
          <span>Free</span>
        </div>
        <div className="mt-1 flex justify-between border-t border-dashed border-slate-200 pt-3 text-sm font-semibold">
          <span>Total amount</span>
          <span>₹{subtotal.toFixed(0)}</span>
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
        <Button className="mt-2 w-full" onClick={handleCheckout} disabled={loading || items.length === 0}>
          {loading ? 'Placing order...' : 'Place order'}
        </Button>
      </div>
    </section>
  );
}
