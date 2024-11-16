import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class GetListQuestionsDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly limit?: number = 10;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  readonly cursor?: string;
}
