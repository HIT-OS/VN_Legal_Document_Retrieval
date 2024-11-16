import { ICommand } from '@nestjs/cqrs';
import { SendQuestionDto } from '@src/application/dto/request/question/send-question.dto';

export class SendQuestionCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly sendQuestionDto: SendQuestionDto
  ) {}
}
