import { ApiProperty } from '@nestjs/swagger';

export class SendQuestionDto {
  @ApiProperty()
  readonly question: string;
}
