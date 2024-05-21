import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = 500;

    Logger.error(exception, GlobalExceptionFilter.name);

    const errorObj = {
      error_code: status,
      error_type: exception.type,
      error_details: {message: exception.message},
    };
    response.status(status).json(errorObj);
  }
}
