import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateProductVariantDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  readonly sizeId!: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  readonly colorId!: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  readonly price!: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  readonly costPrice!: number;

  @Type(() => Number)
  @IsInt()
  readonly stockQty!: number;

  @IsString()
  @MaxLength(100)
  readonly sku!: string;
}
