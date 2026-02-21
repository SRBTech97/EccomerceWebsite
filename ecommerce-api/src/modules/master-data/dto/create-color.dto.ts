import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateColorDto {
  @IsString()
  @MaxLength(50)
  readonly name!: string;

  @IsString()
  @MaxLength(20)
  readonly code!: string;

  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;
}
