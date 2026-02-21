export interface InventoryUpdatedPayload {
  variantId: number;
  previousStock: number;
  newStock: number;
  change: number;
}
