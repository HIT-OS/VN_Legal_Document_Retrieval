import { QuestionHandlers } from './question/handlers';
import { UserHandlers } from './user/handlers';

export const QueryHandlers = [...UserHandlers, ...QuestionHandlers];
