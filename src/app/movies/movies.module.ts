import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/infrastructure/repositories/repository.module';
import { MoviesController } from './movies.controller';
import {
  ICreateMovieUseCase,
  IDeleteMovieUseCase,
  IFindAllMovieUseCase,
  IFindOneMovieUseCase,
  IUpdateMovieUseCase,
} from './interfaces';
import {
  CreateMovieUseCase,
  DeleteMovieUseCase,
  FindAllMovieUseCase,
  FindOneMovieUseCase,
  UpdateMovieUseCase,
} from './use-cases';

@Module({
  imports: [RepositoryModule],
  controllers: [MoviesController],
  providers: [
    { useClass: CreateMovieUseCase, provide: ICreateMovieUseCase },
    { useClass: FindAllMovieUseCase, provide: IFindAllMovieUseCase },
    { useClass: FindOneMovieUseCase, provide: IFindOneMovieUseCase },
    { useClass: UpdateMovieUseCase, provide: IUpdateMovieUseCase },
    { useClass: DeleteMovieUseCase, provide: IDeleteMovieUseCase },
  ],
})
export class MoviesModule {}
