"use client";

import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../../../../../../lib/api/products';
import { VariantTable } from './components/variant-table';
import Link from 'next/link';

export default function ProductVariantsPage({ params }: { params: { id: string } }) {
  const productId = Number(params.id);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
    refetchInterval: 5000, // Auto-refresh every 5 seconds for real-time sync
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading product...</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Product not found</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/products"
          className="text-sm text-brand hover:underline mb-2 inline-block"
        >
          ← Back to Products
        </Link>
        <h1 className="text-xl font-semibold text-slate-900">{product.name}</h1>
        <p className="text-sm text-slate-600">
          Manage variants for this product. Stock updates sync in real-time.
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Brand:</span> {product.brand.name}
          </div>
          <div>
            <span className="font-medium">Category:</span> {product.category.name}
          </div>
          <div>
            <span className="font-medium">Base SKU:</span> {product.baseSku}
          </div>
          <div>
            <span className="font-medium">Total Variants:</span> {product.variants.length}
          </div>
        </div>
      </div>

      <VariantTable product={product} />
    </div>
  );
}
