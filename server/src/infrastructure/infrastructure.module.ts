import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';

import { ErrorFilter } from '@src/common/interceptors/error.interceptor';
import { ResponseInterceptor } from '@src/common/interceptors/response.interceptor';
import { JwtConfigService } from './services/jwt.config.service';
import { HttpControllers } from './controllers';
import { RepositoryProviders } from './providers';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [
    CqrsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
  ],
  controllers: [...HttpControllers],
  providers: [
    ...RepositoryProviders,
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
  exports: [...RepositoryProviders, PrismaService],
})
export class InfrastructureModule {}
