"use client";

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, deleteProduct, type ProductSummary } from '../../../../../lib/api/products';
import { Button } from '../../../../../components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';
import { ProductForm } from './product-form';

export function ProductTable() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductSummary | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const queryClient = useQueryClient();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts({ limit: 100 }),
  });

  const deleteMutation = useMutation<void, Error, number>({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete product');
    },
  });

  const filteredProducts = products.filter((product: ProductSummary) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.baseSku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (product: ProductSummary) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search by name or SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 max-w-sm rounded-lg border border-slate-200 px-4 py-2 text-sm"
        />
        <Button onClick={() => setIsFormOpen(true)}>Create Product</Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-xs">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2">Product</th>
              <th className="px-3 py-2">Brand</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2 text-right">Price Range</th>
              <th className="px-3 py-2 text-right">Total Stock</th>
              <th className="px-3 py-2 text-right">Variants</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[11px] text-slate-700">
            {filteredProducts.map((product: ProductSummary) => {
              const prices = product.variants.map((v: any) => Number(v.price));
              const minPrice = Math.min(...prices);
              const maxPrice = Math.max(...prices);
              const totalStock = product.variants.reduce((sum: number, v: any) => sum + v.stockQty, 0);

              return (
                <tr key={product.id}>
                  <td className="px-3 py-2">
                    <div className="max-w-[200px] truncate text-xs font-semibold">
                      {product.name}
                    </div>
                    <div className="text-[11px] text-slate-500">{product.baseSku}</div>
                  </td>
                  <td className="px-3 py-2">{product.brand.name}</td>
                  <td className="px-3 py-2">{product.category.name}</td>
                  <td className="px-3 py-2 text-right">
                    ₹{minPrice.toFixed(0)}
                    {minPrice !== maxPrice && ` - ₹${maxPrice.toFixed(0)}`}
                  </td>
                  <td className="px-3 py-2 text-right">{totalStock}</td>
                  <td className="px-3 py-2 text-right">{product.variants.length}</td>
                  <td className="px-3 py-2 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}/variants`}
                        className="text-brand hover:underline"
                      >
                        Variants
                      </Link>
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-brand hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:underline"
                        disabled={deleteMutation.isPending}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          onClose={handleFormClose}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            handleFormClose();
          }}
        />
      )}
    </div>
  );
}
