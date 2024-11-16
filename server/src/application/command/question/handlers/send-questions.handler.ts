import { CommandHandler, IQueryHandler, QueryBus } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { SendQuestionCommand } from '../interfaces';
import { QUESTION_REPOSITORY_TOKEN } from '@src/infrastructure/providers/question.repository.provider';
import { IQuestionRepository } from '@src/domain/repositories/question.repository.interface';
import { GetUserByIdQuery } from '@src/application/queries/user/interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
@CommandHandler(SendQuestionCommand)
export class SendQuestionHandler implements IQueryHandler<SendQuestionCommand> {
  constructor(
    @Inject(QUESTION_REPOSITORY_TOKEN)
    private readonly questionRepository: IQuestionRepository,
    private readonly queryBus: QueryBus,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  async execute(command: SendQuestionCommand): Promise<any> {
    const {
      userId,
      sendQuestionDto: { question },
    } = command;
    const user = await this.queryBus.execute(new GetUserByIdQuery(userId));
    if (!user) {
      throw new Error('User not found');
    }

    const crawlApiUrl = this.configService.get('CRAWL_API_URL');
    const crawledData = await this.httpService.axiosRef.post(`${crawlApiUrl}/api/v1/question`, {
      question,
    });

    return this.questionRepository.createQuestion(userId, {
      question,
      answer: crawledData.data.response,
    });
  }
}
