import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';

import { CommandHandlers } from './command';
import { JwtConfigService } from '@src/infrastructure/services/jwt.config.service';
import { InfrastructureModule } from '@src/infrastructure/infrastructure.module';

@Module({
  imports: [
    CqrsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
    InfrastructureModule,
  ],
  providers: [...CommandHandlers],
  exports: [...CommandHandlers],
})
export class ApplicationModule {}
