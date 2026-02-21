import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateSizeDto {
  @IsString()
  @MaxLength(50)
  readonly label!: string;

  @IsString()
  @MaxLength(20)
  readonly code!: string;

  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;
}
