import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Response } from 'express';
import { ValidationException } from '../errors/validation.exception';

@Catch(ValidationException)
export class PayloadExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = 400;

    Logger.error(exception, PayloadExceptionFilter.name);

    const errorObj = {
      error_code: status,
      error_type: exception.error_type,
      error_details: { message: exception.message },
    };
    response.status(status).json(errorObj);
  }
}
