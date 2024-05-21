import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Movie Catalogs API Rest')
  .setDescription(
    'Welcome to the Movie Catalog API documentation. Designed for developers and businesses, this API is perfect for integrating movie data into your applications, websites, or services.',
  )
  .setVersion('1.0')
  .build();
