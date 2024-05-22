import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { UnauthorizedExceptionFilter } from './config/exceptions/filters/anauthorized.filter';
import { GlobalExceptionFilter } from './config/exceptions/filters/global.filter';
import { NotFoundExceptionFilter } from './config/exceptions/filters/notFound.filter';
import { PayloadExceptionFilter } from './config/exceptions/filters/validation.filter';
import { swaggerConfig } from './config/swagger/swagger.config';

dotenv.config();

const PORT = process.env.SV_PORT ?? 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: '*' } });

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new PayloadExceptionFilter(),
    new NotFoundExceptionFilter(),
    new UnauthorizedExceptionFilter(),
  );

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api-docs', app, document);
  await app.listen(PORT);
  Logger.log(`Server running on ${await app.getUrl()} 🚀`, AppModule.name);
}
bootstrap();
