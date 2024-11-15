import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RegisterCommand } from '../interface';
import { IUserRepository } from '@src/domain/repositories/user.repository.interface';
import { USER_REPOSITORY_TOKEN } from '@src/infrastructure/providers/user.repository.provider';

@Injectable()
@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(command: RegisterCommand): Promise<any> {
    const { registerDto } = command;

    const isEmailExist = await this.userRepository.getByEmail(registerDto.email);
    if (isEmailExist) {
      throw new BadRequestException('Email already exists');
    }

    const user = await this.userRepository.createNewUser(registerDto);

    return { message: 'Register successfully', user };
  }
}
