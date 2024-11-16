import { QuestionPrismaRepository } from '../repositories/question.prisma.repository';
import { PrismaService } from '../services/prisma.service';

export const QUESTION_REPOSITORY_TOKEN = 'QUESTION_REPOSITORY_TOKEN';

export const QuestionRepositoryProvider = {
  provide: QUESTION_REPOSITORY_TOKEN,
  useFactory: (prisma: PrismaService) => {
    return new QuestionPrismaRepository(prisma);
  },
  inject: [PrismaService],
};
