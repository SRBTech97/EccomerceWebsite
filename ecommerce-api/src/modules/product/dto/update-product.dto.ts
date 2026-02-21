import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  readonly brandId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  readonly categoryId?: number;
}
