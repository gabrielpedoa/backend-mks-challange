import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

export const RedisConfig: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async () => ({
    isGlobal: true,
    store: await redisStore({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
      ttl: 60 * 1000,
    }),
  }),
  inject: [ConfigService],
};
