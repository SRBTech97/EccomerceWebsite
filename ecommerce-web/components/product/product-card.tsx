import Image from 'next/image';
import Link from 'next/link';
import type { ProductSummary } from '../../lib/api/products';
import { Card, CardContent } from '../ui/card';

interface ProductCardProps {
  product: ProductSummary;
}

export function ProductCard({ product }: ProductCardProps) {
  const firstVariant = product.variants[0];
  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group h-full overflow-hidden">
        <div className="relative h-72 w-full overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="space-y-1 pt-3 pb-4">
          <p className="truncate text-sm font-semibold text-slate-900">{product.name}</p>
          <p className="text-xs text-slate-500">{product.brand.name}</p>
          {firstVariant && (
            <p className="text-sm font-medium text-slate-900">
              ₹{firstVariant.price.toFixed(0)}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
