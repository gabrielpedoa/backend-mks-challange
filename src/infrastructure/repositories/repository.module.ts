import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CategoryRepository } from './category.repository';

@Module({
  providers: [
    { useClass: UserRepository, provide: 'userRepository' },
    { useClass: CategoryRepository, provide: 'categoryRepository' },
  ],
  exports: [
    { useClass: UserRepository, provide: 'userRepository' },
    { useClass: CategoryRepository, provide: 'categoryRepository' },
  ],
})
export class RepositoryModule {}
