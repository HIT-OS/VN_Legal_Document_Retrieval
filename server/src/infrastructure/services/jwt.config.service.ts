import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get<string>('JWT_SECRET') || 'VN_LDA_SERVER',
      signOptions: {
        expiresIn: this.configService.get<number>('JWT_EXPIRATION_TIME') || '7d',
      },
    };
  }
}
