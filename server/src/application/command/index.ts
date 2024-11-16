import { AuthHandlers } from './auth/handler';
import { QuestionHandlers } from './question/handlers';

export const CommandHandlers = [...AuthHandlers, ...QuestionHandlers];
