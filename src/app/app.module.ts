import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfig } from 'src/config/database/database.config';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisConfig } from 'src/config/redis/redis.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(DBConfig),
    CacheModule.registerAsync(RedisConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
