export interface OrderCreatedPayload {
  orderId: number;
  orderNumber: string;
  totalAmount: number;
  totalCost: number;
  createdAt: Date;
}
