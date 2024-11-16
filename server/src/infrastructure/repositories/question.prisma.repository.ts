import { IQuestionRepository } from '@src/domain/repositories/question.repository.interface';
import { PrismaService } from '../services/prisma.service';
import { Question } from '@prisma/client';
import { CreateQuestionDto } from '@src/application/dto/request/question/create.dto';
import { GetListQuestionsDto } from '@src/application/dto/request/question/get-list.dto';

export class QuestionPrismaRepository implements IQuestionRepository {
  constructor(private readonly prisma: PrismaService) {}

  getListQuestions(userId: string, getListQuestionsDto: GetListQuestionsDto): Promise<Question[]> {
    return this.prisma.question.findMany({
      where: { authorId: userId },
      take: getListQuestionsDto.limit,
      skip: getListQuestionsDto.cursor ? 1 : 0,
      ...(getListQuestionsDto.cursor && { cursor: { id: getListQuestionsDto.cursor } }),
      orderBy: { createdAt: 'desc' },
    });
  }

  createQuestion(userId: string, createQuestionDto: CreateQuestionDto): Promise<Question> {
    return this.prisma.question.create({
      data: {
        ...createQuestionDto,
        authorId: userId,
      },
    });
  }
}
