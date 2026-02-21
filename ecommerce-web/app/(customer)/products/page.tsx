import { Suspense } from 'react';
import { fetchProducts } from '../../../lib/api/products';
import { ProductGrid } from '../../../components/product/product-grid';
import { ProductFilters } from '../../../components/product/product-filters';
import { Skeleton } from '../../../components/ui/skeleton';

interface ProductsPageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

async function ProductsList({ searchParams }: ProductsPageProps) {
  const categoryId = Number(searchParams?.categoryId ?? '') || undefined;
  const sizeId = Number(searchParams?.sizeId ?? '') || undefined;
  const colorId = Number(searchParams?.colorId ?? '') || undefined;

  const products = await fetchProducts({ categoryId, sizeId, colorId, limit: 24 });
  return <ProductGrid products={products} />;
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <section className="page-section space-y-5">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">All Products</h1>
          <p className="text-xs text-slate-500">Filters inspired by Myntra for size, color, and category.</p>
        </div>
      </div>
      <ProductFilters />
      <Suspense
        fallback={
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, idx) => (
              <Skeleton key={idx} className="h-72 w-full rounded-2xl" />
            ))}
          </div>
        }
      >
        {/* @ts-expect-error Async Server Component */}
        <ProductsList searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
