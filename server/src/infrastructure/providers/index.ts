import { QuestionRepositoryProvider } from './question.repository.provider';
import { UsersRepositoryProvider } from './user.repository.provider';

export const RepositoryProviders = [UsersRepositoryProvider, QuestionRepositoryProvider];
