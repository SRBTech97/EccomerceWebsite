import { fetchProducts } from '../../../../lib/api/products';
import { InventoryTable } from '../../../../components/admin/inventory-table';

export default async function AdminInventoryPage() {
  const products = await fetchProducts({ limit: 100 });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Inventory</h1>
        <p className="text-sm text-slate-600">
          View current stock levels across all variants.
        </p>
      </div>
      <InventoryTable products={products} />
    </div>
  );
}
