import { IsEmail, IsString, MinLength, MaxLength, IsOptional, Matches } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  readonly email!: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  readonly password!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly firstName!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly lastName!: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone number must be a valid format',
  })
  readonly phone?: string;
}
