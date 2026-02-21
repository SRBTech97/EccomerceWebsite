"use client";

import { ProductTable } from './components/product-table';

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Products</h1>
        <p className="text-sm text-slate-600">
          Manage your product catalog and variants.
        </p>
      </div>
      <ProductTable />
    </div>
  );
}
