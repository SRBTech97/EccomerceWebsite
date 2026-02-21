import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsInt, IsOptional, IsPositive, IsString, MaxLength, ValidateNested } from 'class-validator';
import { CreateProductVariantDto } from './create-product-variant.dto';

export class CreateProductDto {
  @IsString()
  @MaxLength(200)
  readonly name!: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  readonly brandId!: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  readonly categoryId!: number;

  @IsString()
  @MaxLength(100)
  readonly baseSku!: string;

  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDto)
  readonly variants!: CreateProductVariantDto[];
}
