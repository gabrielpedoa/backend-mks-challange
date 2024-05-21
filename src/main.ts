import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';

dotenv.config();

const PORT = process.env.SV_PORT ?? 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: '*' } });
  app.setGlobalPrefix('api/v1');
  await app.listen(PORT);
  Logger.log(`Server running on ${await app.getUrl()} 🚀`, AppModule.name);
}
bootstrap();
