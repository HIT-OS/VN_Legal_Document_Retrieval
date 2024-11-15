import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginCommand } from '../interface';
import { USER_REPOSITORY_TOKEN } from '@src/infrastructure/providers/user.repository.provider';
import { IUserRepository } from '@src/domain/repositories/user.repository.interface';
import { AppConstants } from '@src/common/constants';

@Injectable()
@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(command: LoginCommand): Promise<any> {
    const { email, password } = command.loginDto;

    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      throw new BadRequestException('The username or password is incorrect. Please try again.');
    }
    await this.verifyPassword(password, user.password);

    const accessTokenPayload = {
      id: user.id,
      email: user.email,
      type: AppConstants.Auth.TokenType.ACCESS,
    };
    const refreshTokenPayload = {
      ...accessTokenPayload,
      type: AppConstants.Auth.TokenType.REFRESH,
    };
    const accessToken = await this.jwtService.signAsync(accessTokenPayload);
    const refreshToken = await this.jwtService.signAsync(refreshTokenPayload);

    return { accessToken, refreshToken };
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordMatching) {
      throw new BadRequestException('The username or password is incorrect. Please try again.');
    }
  }
}
