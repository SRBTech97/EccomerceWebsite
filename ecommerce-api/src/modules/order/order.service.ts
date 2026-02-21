import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ORDER_CREATED_EVENT } from '../../common/events/events.constants';
import { INVENTORY_UPDATED_EVENT } from '../../common/events/events.constants';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * Mock payment processing. In real-world, integrate PG here.
   */
  private async mockPayment(_: string): Promise<void> {
    // Simulate async payment IO
    await Promise.resolve();
  }

  async createOrder(dto: CreateOrderDto, customerId?: string) {
    if (dto.items.length === 0) {
      throw new BadRequestException('Order must contain at least one item');
    }

    await this.mockPayment(dto.mockPaymentToken);

    return this.prisma.$transaction(async (tx) => {
      const variantIds = dto.items.map((item) => item.variantId);

      const variants = await tx.productVariant.findMany({
        where: {
          variantId: { in: variantIds },
        },
        select: {
          variantId: true,
          price: true,
          costPrice: true,
          stockQty: true,
        },
      });

      if (variants.length !== variantIds.length) {
        throw new NotFoundException('One or more variants not found');
      }

      const variantMap = new Map(
        variants.map((v) => [v.variantId, v]),
      );

      let totalAmount = 0;
      let totalCost = 0;

      for (const item of dto.items) {
        const variant = variantMap.get(item.variantId);
        if (!variant) {
          throw new NotFoundException(`Variant ${item.variantId} not found`);
        }

        if (variant.stockQty < item.quantity) {
          throw new BadRequestException('Insufficient stock for variant');
        }

        const linePrice = Number(variant.price) * item.quantity;
        const lineCost = Number(variant.costPrice) * item.quantity;
        totalAmount += linePrice;
        totalCost += lineCost;
      }

      const orderNumber = `ORD-${Date.now()}`;

      const order = await tx.order.create({
        data: {
          customerId,
          orderNumber,
          totalAmount,
          totalCost,
          items: {
            create: dto.items.map((item) => {
              const variant = variantMap.get(item.variantId)!;
              const unitPrice = Number(variant.price);
              const unitCostPrice = Number(variant.costPrice);
              const totalPrice = unitPrice * item.quantity;
              const totalLineCost = unitCostPrice * item.quantity;

              return {
                variantId: item.variantId,
                quantity: item.quantity,
                unitPrice,
                unitCostPrice,
                totalPrice,
                totalCost: totalLineCost,
              };
            }),
          },
        },
        include: {
          items: {
            select: {
              id: true,
              variantId: true,
              quantity: true,
              totalPrice: true,
            },
          },
        },
      });

      for (const item of dto.items) {
        const variant = variantMap.get(item.variantId)!;

        const updated = await tx.productVariant.update({
          where: { variantId: item.variantId },
          data: {
            stockQty: {
              decrement: item.quantity,
            },
          },
          select: {
            variantId: true,
            stockQty: true,
          },
        });

        this.eventEmitter.emit(INVENTORY_UPDATED_EVENT, {
          variantId: updated.variantId,
          previousStock: variant.stockQty,
          newStock: updated.stockQty,
          change: -item.quantity,
        });
      }

      this.eventEmitter.emit(ORDER_CREATED_EVENT, {
        orderId: order.id,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount as unknown as number,
        totalCost: order.totalCost as unknown as number,
        createdAt: order.createdAt,
      });

      return order;
    });
  }

  async getOrders(customerId?: string) {
    return this.prisma.order.findMany({
      where: customerId ? { customerId } : {},
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        items: {
          include: {
            variant: {
              select: {
                sku: true,
                price: true,
                size: {
                  select: {
                    label: true,
                    code: true,
                  },
                },
                color: {
                  select: {
                    name: true,
                    code: true,
                  },
                },
                product: {
                  select: {
                    id: true,
                    name: true,
                    brand: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getOrderById(id: number, customerId?: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            variant: {
              select: {
                variantId: true,
                sku: true,
                price: true,
                size: {
                  select: {
                    id: true,
                    label: true,
                    code: true,
                  },
                },
                color: {
                  select: {
                    id: true,
                    name: true,
                    code: true,
                  },
                },
                product: {
                  select: {
                    id: true,
                    name: true,
                    brand: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // Verify user owns this order (if customerId is provided)
    if (customerId && order.customerId !== customerId) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }
}
