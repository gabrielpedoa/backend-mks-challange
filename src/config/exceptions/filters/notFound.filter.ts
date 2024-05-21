import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Response } from 'express';
import { NotFoundException } from '../errors/notFound.exception';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = 404;

    Logger.error(exception, NotFoundExceptionFilter.name);
    console.log(exception);
    const errorObj = {
      error_code: status,
      error_type: exception.error_type,
      error_details: { message: exception.message },
    };

    response.status(status).json(errorObj);
  }
}
