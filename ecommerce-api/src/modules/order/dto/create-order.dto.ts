import { Type } from 'class-transformer';
import { IsArray, IsString, MaxLength, ValidateNested } from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @IsString()
  @MaxLength(50)
  readonly mockPaymentToken!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  readonly items!: CreateOrderItemDto[];
}
