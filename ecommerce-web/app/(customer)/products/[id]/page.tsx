import Image from 'next/image';
import { fetchProductById } from '../../../../lib/api/products';
import { ProductVariantSelector } from '../../../../components/product/product-variant-selector';

interface ProductDetailPageProps {
  params: { id: string };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const id = Number(params.id);
  const product = await fetchProductById(id);

  return (
    <section className="page-section grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <div className="relative h-80 overflow-hidden rounded-3xl md:h-[420px]">
          <Image
            src="https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {product.brand.name}
          </p>
          <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">{product.name}</h1>
          <p className="mt-1 text-sm text-slate-600">{product.description}</p>
        </div>
        <ProductVariantSelector product={product} />
      </div>
    </section>
  );
}
