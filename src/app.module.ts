import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfig } from 'src/config/database/database.config';
import { RedisConfig } from 'src/config/redis/redis.config';
import { UsersModule } from './app/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(DBConfig),
    CacheModule.registerAsync(RedisConfig),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
