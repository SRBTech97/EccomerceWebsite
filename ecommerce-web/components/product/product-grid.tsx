import type { ProductSummary } from '../../lib/api/products';
import { ProductCard } from './product-card';

interface ProductGridProps {
  products: ProductSummary[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
