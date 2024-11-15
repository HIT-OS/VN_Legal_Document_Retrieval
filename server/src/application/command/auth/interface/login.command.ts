import { ICommand } from '@nestjs/cqrs';

import { LoginDto } from '@src/application/dto/request/auth/login.dto';

export class LoginCommand implements ICommand {
  constructor(public readonly loginDto: LoginDto) {}
}
