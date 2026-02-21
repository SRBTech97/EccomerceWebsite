import { Body, Controller, Patch } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Patch('deduct')
  deduct(@Body() dto: UpdateStockDto) {
    return this.inventoryService.deductStock(dto);
  }
}
