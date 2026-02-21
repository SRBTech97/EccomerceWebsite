"use client";

import { useState } from 'react';
import type { ProductSummary, ProductVariant } from '../../lib/api/products';
import { Button } from '../ui/button';
import { useCart } from '../../lib/hooks/use-cart';

interface ProductVariantSelectorProps {
  product: ProductSummary;
}

export function ProductVariantSelector({ product }: ProductVariantSelectorProps) {
  const { addItem } = useCart();
  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);

  const sizes = Array.from(
    new Map(product.variants.map((v) => [v.size.id, v.size])).values(),
  );
  const colors = Array.from(
    new Map(product.variants.map((v) => [v.color.id, v.color])).values(),
  );

  const selectedVariant: ProductVariant | undefined = product.variants.find((v) => {
    return (
      (selectedSizeId === null || v.size.id === selectedSizeId) &&
      (selectedColorId === null || v.color.id === selectedColorId)
    );
  });

  const disabled = !selectedVariant;

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase text-slate-500">Size</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const isSelected = selectedSizeId === size.id;
            return (
              <button
                key={size.id}
                type="button"
                onClick={() => setSelectedSizeId(size.id)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  isSelected
                    ? 'border-brand bg-brand text-white'
                    : 'border-slate-300 bg-white text-slate-800 hover:border-brand'
                }`}
              >
                {size.code}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-1 text-xs font-semibold uppercase text-slate-500">Color</p>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => {
            const isSelected = selectedColorId === color.id;
            return (
              <button
                key={color.id}
                type="button"
                onClick={() => setSelectedColorId(color.id)}
                className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  isSelected
                    ? 'border-brand bg-brand text-white'
                    : 'border-slate-300 bg-white text-slate-800 hover:border-brand'
                }`}
              >
                <span
                  className="h-3 w-3 rounded-full border border-slate-200"
                  style={{ backgroundColor: color.code }}
                />
                {color.name}
              </button>
            );
          })}
        </div>
      </div>

      {selectedVariant && (
        <p className="text-sm text-slate-700">
          Price: <span className="font-semibold">₹{selectedVariant.price.toFixed(0)}</span>
        </p>
      )}

      <Button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!selectedVariant) return;
          addItem(selectedVariant, product.name, 1);
        }}
        className="w-full"
      >
        Add to bag
      </Button>
    </div>
  );
}
