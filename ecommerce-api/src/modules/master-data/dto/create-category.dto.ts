import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MaxLength(100)
  readonly name!: string;

  @IsString()
  @MaxLength(120)
  readonly slug!: string;

  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;
}
