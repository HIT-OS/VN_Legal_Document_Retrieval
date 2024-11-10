import { User } from '@prisma/client';
import { RegisterDto } from '@src/application/dto/request/auth/register.dto';

export interface IUserRepository {
  getByEmail(email: string): Promise<User>;
  createNewUser(user: RegisterDto): Promise<User>;
}
