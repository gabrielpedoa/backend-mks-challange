import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Response } from 'express';
import { UnauthorizedException } from '../errors/unauthorized.exception';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = 401;

    Logger.error(exception, UnauthorizedExceptionFilter.name);

    const errorObj = {
      error_code: status,
      error_type: exception.error_type,
      error_details: { message: exception.message },
    };
    response.status(status).json(errorObj);
  }
}
