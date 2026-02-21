import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class CreateOrderItemDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  readonly variantId!: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  readonly quantity!: number;
}
