import type { ProductSummary } from '../../lib/api/products';

interface InventoryTableProps {
  products: ProductSummary[];
}

export function InventoryTable({ products }: InventoryTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="min-w-full text-left text-xs">
        <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-3 py-2">Product</th>
            <th className="px-3 py-2">Variant</th>
            <th className="px-3 py-2">SKU</th>
            <th className="px-3 py-2 text-right">Price</th>
            <th className="px-3 py-2 text-right">Stock</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-[11px] text-slate-700">
          {products.flatMap((product) =>
            product.variants.map((variant) => (
              <tr key={variant.variantId}>
                <td className="px-3 py-2 align-top text-slate-900">
                  <div className="max-w-[200px] truncate text-xs font-semibold">
                    {product.name}
                  </div>
                  <div className="text-[11px] text-slate-500">{product.brand.name}</div>
                </td>
                <td className="px-3 py-2 align-top">
                  <div>{variant.size.code}</div>
                  <div className="text-[11px] text-slate-500">{variant.color.name}</div>
                </td>
                <td className="px-3 py-2 align-top">{variant.sku}</td>
                <td className="px-3 py-2 align-top text-right">
                  ₹{variant.price.toFixed(0)}
                </td>
                <td className="px-3 py-2 align-top text-right">{variant.stockQty}</td>
              </tr>
            )),
          )}
        </tbody>
      </table>
    </div>
  );
}
