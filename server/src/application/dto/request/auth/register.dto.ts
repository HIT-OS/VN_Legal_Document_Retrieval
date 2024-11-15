import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly lastName?: string;
}
