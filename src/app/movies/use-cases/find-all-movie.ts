import { Inject, Injectable } from '@nestjs/common';
import { MovieEntity } from 'src/infrastructure/entities/movie.entity';
import { MovieRepository } from 'src/infrastructure/repositories/movie.repository';
import { IFindAllMovieUseCase } from '../interfaces';

@Injectable()
export class FindAllMovieUseCase implements IFindAllMovieUseCase {
  constructor(
    @Inject('movieRepository')
    protected movieRepository: MovieRepository,
  ) {}

  async execute(): Promise<MovieEntity | MovieEntity[]> {
    const movies = await this.movieRepository.loadAll();
    return movies;
  }
}
