"use client";

import { useRouter } from 'next/navigation';
import { useCart } from '../../../lib/hooks/use-cart';
import { Button } from '../../../components/ui/button';

export default function CartPage() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();
  const router = useRouter();

  const hasItems = items.length > 0;

  return (
    <section className="page-section space-y-6">
      <h1 className="text-xl font-semibold text-slate-900">Your bag</h1>
      {!hasItems ? (
        <p className="text-sm text-slate-600">Your shopping bag is empty.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.variantId}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">
                    {item.sizeLabel} · {item.colorName}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-600">
                    <span>Qty</span>
                    <select
                      value={item.quantity}
                      onChange={(e: unknown) =>
                        updateQuantity(item.variantId, Number((e as any).target.value))
                      }
                      className="rounded-full border border-slate-200 px-2 py-1 text-xs"
                    >
                      {[1, 2, 3, 4, 5].map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeItem(item.variantId)}
                      className="text-xs text-slate-500 hover:text-brand"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right text-sm font-semibold text-slate-900">
                  ₹{(item.price * item.quantity).toFixed(0)}
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm">
            <h2 className="text-sm font-semibold text-slate-900">Price details</h2>
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
            <Button
              className="mt-2 w-full"
              disabled={!hasItems}
              onClick={() => router.push('/checkout')}
            >
              Place order
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
