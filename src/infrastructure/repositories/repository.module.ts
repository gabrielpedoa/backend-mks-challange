import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Module({
  providers: [{ useClass: UserRepository, provide: 'userRepository' }],
  exports: [{ useClass: UserRepository, provide: 'userRepository' }],
})
export class RepositoryModule {}
