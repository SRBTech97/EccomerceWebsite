"use client";

import { useCart } from '../../../lib/hooks/use-cart';

// Simple local order history powered by last cleared cart; in a real app,
// this would query GET /orders for the authenticated customer.

export default function OrdersPage() {
  const { items } = useCart();

  return (
    <section className="page-section space-y-4">
      <h1 className="text-xl font-semibold text-slate-900">Orders</h1>
      <p className="text-sm text-slate-600">
        This MVP view is ready to be wired to a real order history API.
      </p>
      {items.length === 0 ? (
        <p className="text-sm text-slate-500">
          Your recent orders will appear here after checkout is integrated with your
          customer identity.
        </p>
      ) : (
        <p className="text-sm text-slate-500">
          You have an active cart with {items.length} item(s). Once the backend
          exposes GET /orders, this page can show full history.
        </p>
      )}
    </section>
  );
}
