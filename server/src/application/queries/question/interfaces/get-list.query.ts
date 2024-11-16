import { IQuery } from '@nestjs/cqrs';
import { GetListQuestionsDto } from '@src/application/dto/request/question/get-list.dto';

export class GetListQuestionsQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly getListQuestionsDto: GetListQuestionsDto
  ) {}
}
