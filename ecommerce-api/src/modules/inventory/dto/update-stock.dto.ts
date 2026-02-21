import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class UpdateStockDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  readonly variantId!: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  readonly quantity!: number;
}
