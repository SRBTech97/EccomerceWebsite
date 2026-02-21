import { apiGet, apiPost, apiPatch, apiDelete } from './client';

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

export interface CreateProductDto {
  name: string;
  description?: string;
  brandId: number;
  categoryId: number;
  baseSku: string;
  variants: Array<{
    sizeId: number;
    colorId: number;
    price: number;
    costPrice: number;
    stockQty: number;
    sku: string;
  }>;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  brandId?: number;
  categoryId?: number;
}

export async function createProduct(dto: CreateProductDto): Promise<ProductSummary> {
  return apiPost<CreateProductDto, ProductSummary>('/products', dto);
}

export async function updateProduct(id: number, dto: UpdateProductDto): Promise<ProductSummary> {
  return apiPatch<UpdateProductDto, ProductSummary>(`/products/${id}`, dto);
}

export async function deleteProduct(id: number): Promise<void> {
  await apiDelete<void>(`/products/${id}`);
}
