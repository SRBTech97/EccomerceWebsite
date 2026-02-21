import { apiPatch } from './client';

export interface UpdateInventoryBody {
  variantId: number;
  quantity: number;
}

export async function updateInventory(body: UpdateInventoryBody): Promise<void> {
  await apiPatch<UpdateInventoryBody, unknown>('/inventory', body);
}
