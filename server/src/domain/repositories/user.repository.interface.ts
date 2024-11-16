import { User } from '@prisma/client';
import { RegisterDto } from '@src/application/dto/request/auth/register.dto';

export interface IUserRepository {
  getById(userId: string): Promise<User>;
  getByEmail(email: string): Promise<User>;
  createNewUser(user: RegisterDto): Promise<User>;
}
