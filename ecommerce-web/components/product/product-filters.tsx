"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '../ui/input';
import { Select } from '../ui/select';

export function ProductFilters() {
  const router = useRouter();
  const params = useSearchParams();

  const handleChange = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    router.push(`/products?${next.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
      <Input placeholder="Search brands or products" className="max-w-xs" />
      <Select
        defaultValue={params.get('sizeId') ?? ''}
        onChange={(e: unknown) => handleChange('sizeId', (e as any).target.value)}
        className="w-32"
      >
        <option value="">Size</option>
        <option value="1">S</option>
        <option value="2">M</option>
        <option value="3">L</option>
      </Select>
      <Select
        defaultValue={params.get('colorId') ?? ''}
        onChange={(e: unknown) => handleChange('colorId', (e as any).target.value)}
        className="w-32"
      >
        <option value="">Color</option>
        <option value="1">Black</option>
        <option value="2">White</option>
        <option value="3">Blue</option>
      </Select>
      <Select
        defaultValue={params.get('categoryId') ?? ''}
        onChange={(e: unknown) => handleChange('categoryId', (e as any).target.value)}
        className="w-40"
      >
        <option value="">Category</option>
        <option value="1">Tops</option>
        <option value="2">Jeans</option>
        <option value="3">Dresses</option>
      </Select>
    </div>
  );
}
