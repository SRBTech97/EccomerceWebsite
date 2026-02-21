import { fetchProducts } from '../../../../lib/api/products';
import { InventoryTable } from '../../../../components/admin/inventory-table';

export default async function AdminProductsPage() {
  const products = await fetchProducts({ limit: 50 });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Products</h1>
          <p className="text-sm text-slate-600">
            Manage your product catalog and variants.
          </p>
        </div>
      </div>
      <InventoryTable products={products} />
    </div>
  );
}
