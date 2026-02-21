import { apiGet, apiPost } from './client';

export interface OrderItem {
  id: number;
  variantId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  variant: {
    variantId: number;
    sku: string;
    price: number;
    size: {
      id: number;
      label: string;
      code: string;
    };
    color: {
      id: number;
      name: string;
      code: string;
    };
    product: {
      id: number;
      name: string;
      brand: {
        id: number;
        name: string;
      };
    };
  };
}

export interface Order {
  id: number;
  customerId?: string;
  orderNumber: string;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  totalAmount: number;
  totalCost: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface CreateOrderResponse {
  id: number;
  orderNumber: string;
}

export async function createOrder(
  items: Array<{ variantId: number; quantity: number }>,
  token?: string,
): Promise<CreateOrderResponse> {
  const body = {
    mockPaymentToken: 'mock-token',
    items: items.map((item) => ({
      variantId: item.variantId,
      quantity: item.quantity,
    })),
  };

  return apiPost<typeof body, CreateOrderResponse>('/orders', body, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

export async function fetchOrders(token: string): Promise<Order[]> {
  return apiGet<Order[]>('/orders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchOrderById(id: number, token: string): Promise<Order> {
  return apiGet<Order>(`/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
