import { applyDecorators, HttpCode } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiOkResponse(description: string) {
  return applyDecorators(
    HttpCode(200),
    ApiResponse({
      status: 200,
      description,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
    }),
  );
}

export function ApiCreatedResponse(description: string) {
  return applyDecorators(
    HttpCode(201),
    ApiResponse({
      status: 201,
      description,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
    }),
  );
}
