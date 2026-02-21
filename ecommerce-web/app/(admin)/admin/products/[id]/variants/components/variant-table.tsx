"use client";

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type ProductSummary } from '../../../../../../../lib/api/products';
import { updateInventory } from '../../../../../../../lib/api/inventory';
import { Button } from '../../../../../../../components/ui/button';
import { Input } from '../../../../../../../components/ui/input';
import { toast } from 'sonner';

interface VariantTableProps {
  product: ProductSummary;
}

export function VariantTable({ product }: VariantTableProps) {
  const [editingVariantId, setEditingVariantId] = useState<number | null>(null);
  const [editingStock, setEditingStock] = useState<number>(0);
  
  const queryClient = useQueryClient();

  const updateStockMutation = useMutation({
    mutationFn: ({ variantId, quantity }: { variantId: number; quantity: number }) =>
      updateInventory({ variantId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', product.id] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Stock updated successfully');
      setEditingVariantId(null);
    },
    onError: () => {
      toast.error('Failed to update stock');
    },
  });

  const handleEditStock = (variantId: number, currentStock: number) => {
    setEditingVariantId(variantId);
    setEditingStock(currentStock);
  };

  const handleSaveStock = (variantId: number, oldStock: number) => {
    const stockDiff = editingStock - oldStock;
    updateStockMutation.mutate({ variantId, quantity: stockDiff });
  };

  const handleCancelEdit = () => {
    setEditingVariantId(null);
    setEditingStock(0);
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-xs">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2">SKU</th>
              <th className="px-3 py-2">Size</th>
              <th className="px-3 py-2">Color</th>
              <th className="px-3 py-2 text-right">Price</th>
              <th className="px-3 py-2 text-right">Stock</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[11px] text-slate-700">
            {product.variants.map((variant) => {
              const isEditing = editingVariantId === variant.variantId;

              return (
                <tr key={variant.variantId}>
                  <td className="px-3 py-2">
                    <div className="text-xs font-semibold">{variant.sku}</div>
                  </td>
                  <td className="px-3 py-2">{variant.size.code}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-3 w-3 rounded-full border border-slate-200"
                        style={{ backgroundColor: variant.color.code }}
                      />
                      {variant.color.name}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-right">₹{variant.price.toFixed(0)}</td>
                  <td className="px-3 py-2 text-right">
                    {isEditing ? (
                      <div className="flex items-center justify-end gap-2">
                        <Input
                          type="number"
                          value={editingStock}
                          onChange={(e: any) => setEditingStock(Number(e.target.value))}
                          className="w-20 text-right"
                          min="0"
                          autoFocus
                        />
                      </div>
                    ) : (
                      <span
                        className={
                          variant.stockQty === 0
                            ? 'text-red-600 font-semibold'
                            : variant.stockQty < 10
                            ? 'text-orange-600'
                            : ''
                        }
                      >
                        {variant.stockQty}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleSaveStock(variant.variantId, variant.stockQty)}
                            disabled={updateStockMutation.isPending}
                            className="text-brand hover:underline disabled:opacity-50"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            disabled={updateStockMutation.isPending}
                            className="text-slate-600 hover:underline disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEditStock(variant.variantId, variant.stockQty)}
                          className="text-brand hover:underline"
                        >
                          Edit Stock
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-semibold mb-2">Real-Time Sync</h3>
        <p className="text-xs text-slate-600">
          Stock updates are synced in real-time. The table auto-refreshes every 5 seconds to show
          the latest inventory from the database. Click "Edit Stock" to modify quantities.
        </p>
      </div>
    </div>
  );
}
