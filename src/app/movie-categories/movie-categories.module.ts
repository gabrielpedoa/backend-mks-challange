import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/infrastructure/repositories/repository.module';
import { MovieCategoriesController } from './movie-categories.controller';
import { CreateMovieCategoryUseCase } from './use-cases/create-movie-category';
import {
  ICreateMovieCategoryUseCase,
  IDeleteMovieCategoryUseCase,
  IFindAllMovieCategoryUseCase,
  IFindOneMovieCategoryUseCase,
  IUpdateMovieCategoryUseCase,
} from './interfaces';
import { FindAllMovieCategoryUseCase } from './use-cases/find-all-movie-category';
import { FindOneMovieCategoryUseCase } from './use-cases/find-one-movie-category';
import { UpdateMovieCategoryUseCase } from './use-cases/update-movie-category';
import { DeleteMovieCategoryUseCase } from './use-cases/delete-movie-category';

@Module({
  imports: [RepositoryModule],
  controllers: [MovieCategoriesController],
  providers: [
    {
      useClass: CreateMovieCategoryUseCase,
      provide: ICreateMovieCategoryUseCase,
    },
    {
      useClass: FindAllMovieCategoryUseCase,
      provide: IFindAllMovieCategoryUseCase,
    },
    {
      useClass: FindOneMovieCategoryUseCase,
      provide: IFindOneMovieCategoryUseCase,
    },
    {
      useClass: UpdateMovieCategoryUseCase,
      provide: IUpdateMovieCategoryUseCase,
    },
    {
      useClass: DeleteMovieCategoryUseCase,
      provide: IDeleteMovieCategoryUseCase,
    },
  ],
})
export class MovieCategoriesModule {}
