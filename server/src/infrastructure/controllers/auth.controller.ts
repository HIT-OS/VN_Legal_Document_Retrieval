import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { RegisterDto } from '../../application/dto/request/auth/register.dto';
import { LoginDto } from '../../application/dto/request/auth/login.dto';
import { LoginCommand, RegisterCommand } from '@src/application/command/auth/interface';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  login(@Body() loginDto: LoginDto) {
    return this.commandBus.execute(new LoginCommand(loginDto));
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register a new account' })
  register(@Body() registerDto: RegisterDto) {
    return this.commandBus.execute(new RegisterCommand(registerDto));
  }
}
