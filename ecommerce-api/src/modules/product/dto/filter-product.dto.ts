import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';

export class FilterProductDto extends PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  readonly categoryId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  readonly sizeId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  readonly colorId?: number;
}
