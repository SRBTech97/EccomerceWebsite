import Image from 'next/image';
import Link from 'next/link';
import { fetchProducts } from '../../lib/api/products';
import { ProductGrid } from '../../components/product/product-grid';

export default async function CustomerHomePage() {
  const products = await fetchProducts({ limit: 8 });

  return (
    <div className="space-y-10">
      <section className="page-section grid gap-6 md:grid-cols-[3fr,2fr]">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            new season
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Fashion that moves with you.
          </h1>
          <p className="max-w-md text-sm text-slate-600">
            Discover hand-picked styles inspired by the latest runway trends.
            Curated for everyday wear, from work to weekend.
          </p>
          <div className="flex gap-3">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark"
            >
              Shop now
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-800 hover:border-brand"
            >
              Explore categories
            </Link>
          </div>
        </div>
        <div className="relative h-64 overflow-hidden rounded-3xl md:h-80">
          <Image
            src="https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Fashion banner"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="page-section space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Trending now</h2>
          <Link
            href="/products"
            className="text-xs font-semibold uppercase tracking-wide text-brand"
          >
            View all
          </Link>
        </div>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
