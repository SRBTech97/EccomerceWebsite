import { apiGet } from './client';

export interface ProductVariant {
  variantId: number;
  price: number;
  stockQty: number;
  sku: string;
  size: {
    id: number;
    label: string;
    code: string;
  };
  color: {
    id: number;
    name: string;
    code: string;
  };
}

export interface ProductSummary {
  id: number;
  name: string;
  description?: string | null;
  baseSku: string;
  brand: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  variants: ProductVariant[];
}

export interface ProductFilter {
  limit?: number;
  offset?: number;
  categoryId?: number;
  sizeId?: number;
  colorId?: number;
}

export async function fetchProducts(filter?: ProductFilter): Promise<ProductSummary[]> {
  const params = new URLSearchParams();
  if (filter?.limit !== undefined) params.set('limit', String(filter.limit));
  if (filter?.offset !== undefined) params.set('offset', String(filter.offset));
  if (filter?.categoryId !== undefined) params.set('categoryId', String(filter.categoryId));
  if (filter?.sizeId !== undefined) params.set('sizeId', String(filter.sizeId));
  if (filter?.colorId !== undefined) params.set('colorId', String(filter.colorId));

  const query = params.toString();
  const path = query ? `/products?${query}` : '/products';
  return apiGet<ProductSummary[]>(path);
}

export async function fetchProductById(id: number): Promise<ProductSummary> {
  return apiGet<ProductSummary>(`/products/${id}`);
}
