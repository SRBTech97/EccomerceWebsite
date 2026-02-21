import { apiPost } from './client';

export interface CreateOrderResponse {
  id: number;
  orderNumber: string;
}

export async function createOrder(
  items: Array<{ variantId: number; quantity: number }>,
): Promise<CreateOrderResponse> {
  const body = {
    mockPaymentToken: 'mock-token',
    items: items.map((item) => ({
      variantId: item.variantId,
      quantity: item.quantity,
    })),
  };

  return apiPost<typeof body, CreateOrderResponse>('/orders', body);
}
