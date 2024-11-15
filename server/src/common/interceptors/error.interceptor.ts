// error.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(ErrorFilter.name, { timestamp: true });

  catch(exception: any, host: ArgumentsHost) {
    this.logger.error('Exception: ', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ? exception.getResponse() : 'Internal server error';

    response.status(statusCode).json({
      success: false,
      error: message,
      statusCode: statusCode,
    });
  }
}
