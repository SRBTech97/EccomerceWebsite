import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UpdateStockDto } from './dto/update-stock.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { INVENTORY_UPDATED_EVENT } from '../../common/events/events.constants';

@Injectable()
export class InventoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * Deduct stock atomically at variant level and emit inventory.updated event.
   */
  async deductStock(dto: UpdateStockDto) {
    const { variantId, quantity } = dto;

    return this.prisma.$transaction(async (tx) => {
      const variant = await tx.productVariant.findUnique({
        where: { variantId },
        select: {
          variantId: true,
          stockQty: true,
        },
      });

      if (!variant) {
        throw new NotFoundException(`Variant ${variantId} not found`);
      }

      if (variant.stockQty < quantity) {
        throw new BadRequestException('Insufficient stock');
      }

      const updated = await tx.productVariant.update({
        where: { variantId },
        data: {
          stockQty: {
            decrement: quantity,
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
        change: -quantity,
      });

      return updated;
    });
  }
}
