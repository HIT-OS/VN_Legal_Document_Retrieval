import { ICommand } from '@nestjs/cqrs';

import { RegisterDto } from '@src/application/dto/request/auth/register.dto';

export class RegisterCommand implements ICommand {
  constructor(public readonly registerDto: RegisterDto) {}
}
