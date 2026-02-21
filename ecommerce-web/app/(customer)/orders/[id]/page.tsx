"use client";

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../lib/providers/auth-provider';
import { fetchOrderById } from '../../../../lib/api/orders';
import { Card, CardContent, CardHeader } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Skeleton } from '../../../../components/ui/skeleton';

interface OrderDetailPageProps {
  params: {
    id: string;
  };
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const router = useRouter();
  const { token, isLoggedIn } = useAuth();
  const orderId = parseInt(params.id, 10);

  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => fetchOrderById(orderId, token!),
    enabled: isLoggedIn && !!token && !isNaN(orderId),
    refetchOnWindowFocus: false,
  });

  if (!isLoggedIn) {
    router.push('/login');
    return null;
  }

  if (isLoading) {
    return (
      <section className="page-section space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="page-section space-y-4">
        <h1 className="text-xl font-semibold text-slate-900">Order Details</h1>
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-sm text-red-600">Failed to load order details.</p>
            <Button variant="ghost" onClick={() => router.push('/orders')} className="mt-4">
              Back to orders
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="page-section space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">Order Details</h1>
        <Button variant="ghost" onClick={() => router.push('/orders')}>
          ← Back to orders
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{order.orderNumber}</h2>
                  <p className="text-sm text-slate-500">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
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
            </CardHeader>
            <CardContent className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{item.variant.product.name}</p>
                    <p className="text-xs text-slate-500">{item.variant.product.brand.name}</p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-600">
                      <span>Size: {item.variant.size.code}</span>
                      <span>•</span>
                      <span>Color: {item.variant.color.name}</span>
                      <span>•</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">SKU: {item.variant.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">
                      ₹{Number(item.totalPrice).toFixed(0)}
                    </p>
                    <p className="text-xs text-slate-500">
                      ₹{Number(item.unitPrice).toFixed(0)} each
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-slate-900">Order Summary</h3>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Items ({order.items.length})</span>
                <span className="font-medium text-slate-900">
                  ₹{Number(order.totalAmount).toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Delivery</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="border-t border-slate-200 pt-2">
                <div className="flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span className="text-slate-900">₹{Number(order.totalAmount).toFixed(0)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-semibold text-slate-900">Status Timeline</h3>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                <div>
                  <p className="font-medium text-slate-900">Order Placed</p>
                  <p className="text-xs text-slate-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              {order.status === 'PAID' && (
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                  <div>
                    <p className="font-medium text-slate-900">Payment Confirmed</p>
                    <p className="text-xs text-slate-500">
                      {new Date(order.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
              {order.status === 'CANCELLED' && (
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-red-500" />
                  <div>
                    <p className="font-medium text-slate-900">Order Cancelled</p>
                    <p className="text-xs text-slate-500">
                      {new Date(order.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
