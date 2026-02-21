"use client";

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useAuth } from '../../../lib/providers/auth-provider';
import { fetchOrders } from '../../../lib/api/orders';
import { Card, CardContent } from '../../../components/ui/card';
import { Skeleton } from '../../../components/ui/skeleton';

export default function OrdersPage() {
  const { token, isLoggedIn, user } = useAuth();

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders', user?.userId],
    queryFn: () => fetchOrders(token!),
    enabled: isLoggedIn && !!token,
    refetchOnWindowFocus: false,
  });

  if (!isLoggedIn) {
    return (
      <section className="page-section space-y-4">
        <h1 className="text-xl font-semibold text-slate-900">Orders</h1>
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-sm text-slate-600">Please log in to view your orders.</p>
            <Link
              href="/login"
              className="mt-4 inline-block rounded-full bg-brand px-6 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Sign in
            </Link>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="page-section space-y-4">
        <h1 className="text-xl font-semibold text-slate-900">Orders</h1>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page-section space-y-4">
        <h1 className="text-xl font-semibold text-slate-900">Orders</h1>
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-sm text-red-600">Failed to load orders. Please try again.</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="page-section space-y-4">
      <h1 className="text-xl font-semibold text-slate-900">My Orders</h1>

      {!orders || orders.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-sm text-slate-600">You haven't placed any orders yet.</p>
            <Link
              href="/products"
              className="mt-4 inline-block rounded-full bg-brand px-6 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Start shopping
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <Link href={`/orders/${order.id}`}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-slate-900">{order.orderNumber}</p>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            order.status === 'PAID'
                              ? 'bg-green-100 text-green-700'
                              : order.status === 'CANCELLED'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-slate-600">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-2">
                      <p className="text-lg font-bold text-slate-900">
                        ₹{Number(order.totalAmount).toFixed(0)}
                      </p>
                      <span className="text-xs font-medium text-brand hover:text-brand-dark">
                        View details →
                      </span>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
