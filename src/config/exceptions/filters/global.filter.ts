import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = 500;

    console.log(exception);
    Logger.error(exception, GlobalExceptionFilter.name);

    const errorObj = {
      error_code: exception.status ? exception.status : status,
      error_type: exception.response
        ? exception.response.error
        : 'NOT_IMPLEMENTED',
      error_details: { message: exception.message },
    };
    response.status(errorObj.error_code).json(errorObj);
  }
}
