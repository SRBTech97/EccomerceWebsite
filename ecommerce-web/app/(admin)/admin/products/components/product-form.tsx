"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createProduct, updateProduct, type ProductSummary } from '../../../../../lib/api/products';
import { fetchBrands, fetchCategories, fetchSizes, fetchColors } from '../../../../../lib/api/master-data';
import { Button } from '../../../../../components/ui/button';
import { Input } from '../../../../../components/ui/input';
import { toast } from 'sonner';
import { useEffect } from 'react';

const variantSchema = z.object({
  sizeId: z.number().positive('Size is required'),
  colorId: z.number().positive('Color is required'),
  price: z.number().positive('Price must be positive'),
  costPrice: z.number().positive('Cost price must be positive'),
  stockQty: z.number().int().min(0, 'Stock must be non-negative'),
  sku: z.string().min(1, 'SKU is required'),
});

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().optional(),
  brandId: z.number().positive('Brand is required'),
  categoryId: z.number().positive('Category is required'),
  baseSku: z.string().min(1, 'Base SKU is required'),
  variants: z.array(variantSchema).min(1, 'At least one variant is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: ProductSummary | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function ProductForm({ product, onClose, onSuccess }: ProductFormProps) {
  const isEdit = !!product;

  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const { data: sizes = [] } = useQuery({
    queryKey: ['sizes'],
    queryFn: fetchSizes,
  });

  const { data: colors = [] } = useQuery({
    queryKey: ['colors'],
    queryFn: fetchColors,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      brandId: product?.brand.id || 0,
      categoryId: product?.category.id || 0,
      baseSku: product?.baseSku || '',
      variants: product?.variants.map((v: any) => ({
        sizeId: v.size.id,
        colorId: v.color.id,
        price: Number(v.price),
        costPrice: Number(v.price) * 0.6,
        stockQty: v.stockQty,
        sku: v.sku,
      })) || [
        {
          sizeId: 0,
          colorId: 0,
          price: 0,
          costPrice: 0,
          stockQty: 0,
          sku: '',
        },
      ],
    },
  });

  const createMutation = useMutation<ProductSummary, Error, ProductFormData>({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success('Product created successfully');
      onSuccess();
    },
    onError: () => {
      toast.error('Failed to create product');
    },
  });

  const updateMutation = useMutation<ProductSummary, Error, { id: number; data: any }>({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateProduct(id, data),
    onSuccess: () => {
      toast.success('Product updated successfully');
      onSuccess();
    },
    onError: () => {
      toast.error('Failed to update product');
    },
  });

  const onSubmit = (data: ProductFormData) => {
    if (isEdit && product) {
      updateMutation.mutate({
        id: product.id,
        data: {
          name: data.name,
          description: data.description,
          brandId: data.brandId,
          categoryId: data.categoryId,
        },
      });
    } else {
      createMutation.mutate(data);
    }
  };

  const variants = watch('variants');

  const addVariant = () => {
    setValue('variants', [
      ...variants,
      {
        sizeId: 0,
        colorId: 0,
        price: 0,
        costPrice: 0,
        stockQty: 0,
        sku: '',
      },
    ]);
  };

  const removeVariant = (index: number) => {
    setValue(
      'variants',
      variants.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{isEdit ? 'Edit Product' : 'Create Product'}</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Product Name</label>
            <Input {...register('name')} />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Description</label>
            <textarea
              {...register('description')}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Brand</label>
              <select
                {...register('brandId', { valueAsNumber: true })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                <option value={0}>Select brand</option>
                {(brands as any[]).map((brand: any) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              {errors.brandId && (
                <p className="mt-1 text-xs text-red-600">{errors.brandId.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Category</label>
              <select
                {...register('categoryId', { valueAsNumber: true })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                <option value={0}>Select category</option>
                {(categories as any[]).map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="mt-1 text-xs text-red-600">{errors.categoryId.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Base SKU</label>
            <Input {...register('baseSku')} />
            {errors.baseSku && (
              <p className="mt-1 text-xs text-red-600">{errors.baseSku.message}</p>
            )}
          </div>

          {!isEdit && (
            <div className="space-y-3 rounded-lg border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Variants</h3>
                <button
                  type="button"
                  onClick={addVariant}
                  className="text-xs text-brand hover:underline"
                >
                  + Add Variant
                </button>
              </div>

              {variants.map((variant, index) => (
                <div key={index} className="space-y-2 rounded border border-slate-100 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Variant {index + 1}</span>
                    {variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-slate-600">Size</label>
                      <select
                        {...register(`variants.${index}.sizeId`, { valueAsNumber: true })}
                        className="w-full rounded border border-slate-200 px-2 py-1 text-xs"
                      >
                        <option value={0}>Select</option>
                        {(sizes as any[]).map((size: any) => (
                          <option key={size.id} value={size.id}>
                            {size.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-600">Color</label>
                      <select
                        {...register(`variants.${index}.colorId`, { valueAsNumber: true })}
                        className="w-full rounded border border-slate-200 px-2 py-1 text-xs"
                      >
                        <option value={0}>Select</option>
                        {(colors as any[]).map((color: any) => (
                          <option key={color.id} value={color.id}>
                            {color.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-600">Price</label>
                      <Input
                        type="number"
                        step="0.01"
                        {...register(`variants.${index}.price`, { valueAsNumber: true })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-600">Cost Price</label>
                      <Input
                        type="number"
                        step="0.01"
                        {...register(`variants.${index}.costPrice`, { valueAsNumber: true })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-600">Stock</label>
                      <Input
                        type="number"
                        {...register(`variants.${index}.stockQty`, { valueAsNumber: true })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-600">SKU</label>
                      <Input {...register(`variants.${index}.sku`)} />
                    </div>
                  </div>

                  {errors.variants?.[index] && (
                    <p className="text-xs text-red-600">
                      {errors.variants[index]?.sizeId?.message ||
                        errors.variants[index]?.colorId?.message ||
                        errors.variants[index]?.price?.message ||
                        errors.variants[index]?.stockQty?.message ||
                        errors.variants[index]?.sku?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-3 border-t pt-4">
            <Button type="button" onClick={onClose} className="bg-slate-200 hover:bg-slate-300">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {isEdit ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
