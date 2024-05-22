import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CategoryRepository } from './category.repository';
import { MovieRepository } from './movie.repository';

@Module({
  providers: [
    { useClass: UserRepository, provide: 'userRepository' },
    { useClass: MovieRepository, provide: 'movieRepository' },
    { useClass: CategoryRepository, provide: 'categoryRepository' },
  ],
  exports: [
    { useClass: UserRepository, provide: 'userRepository' },
    { useClass: CategoryRepository, provide: 'categoryRepository' },
    { useClass: MovieRepository, provide: 'movieRepository' },
  ],
})
export class RepositoryModule {}
