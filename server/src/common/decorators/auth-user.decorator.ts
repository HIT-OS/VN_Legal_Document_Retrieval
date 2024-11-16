import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AppConstants } from '@src/common/constants';

export const AuthUser = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request[AppConstants.Auth.AUTH_USER_KEY];
});
