import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Max } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Max(100)
  readonly limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  readonly offset?: number;
}
