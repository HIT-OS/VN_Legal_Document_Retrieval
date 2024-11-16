import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';

import { GetListQuestionsQuery } from '../interfaces';
import { IQuestionRepository } from '@src/domain/repositories/question.repository.interface';
import { QUESTION_REPOSITORY_TOKEN } from '@src/infrastructure/providers/question.repository.provider';

@Injectable()
@QueryHandler(GetListQuestionsQuery)
export class GetListQuestionsHandler implements IQueryHandler<GetListQuestionsQuery> {
  constructor(
    @Inject(QUESTION_REPOSITORY_TOKEN)
    private readonly questionRepository: IQuestionRepository
  ) {}

  async execute(query: GetListQuestionsQuery): Promise<any> {
    const { userId, getListQuestionsDto } = query;
    return this.questionRepository.getListQuestions(userId, getListQuestionsDto);
  }
}
