import { Question } from '@prisma/client';
import { CreateQuestionDto } from '@src/application/dto/request/question/create.dto';
import { GetListQuestionsDto } from '@src/application/dto/request/question/get-list.dto';

export interface IQuestionRepository {
  getListQuestions(userId: string, getListQuestionsDto: GetListQuestionsDto): Promise<Question[]>;
  createQuestion(userId: string, createQuestionDto: CreateQuestionDto): Promise<Question>;
}
