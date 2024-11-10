import { UserPrismaRepository } from '../repositories/user.prisma.repository';
import { PrismaService } from '../services/prisma.service';

export const USER_REPOSITORY_TOKEN = 'USER_REPOSITORY_TOKEN';

export const UsersRepositoryProvider = {
  provide: USER_REPOSITORY_TOKEN,
  useFactory: (prisma: PrismaService) => {
    return new UserPrismaRepository(prisma);
  },
  inject: [PrismaService],
};
