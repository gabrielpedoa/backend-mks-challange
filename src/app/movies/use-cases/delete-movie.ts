import { Inject, Injectable } from '@nestjs/common';
import { MovieEntity } from 'src/infrastructure/entities/movie.entity';
import { MovieRepository } from 'src/infrastructure/repositories/movie.repository';
import { IDeleteMovieUseCase } from '../interfaces';
import { NotFoundException } from 'src/config/exceptions/errors/notFound.exception';

@Injectable()
export class DeleteMovieUseCase implements IDeleteMovieUseCase {
  constructor(
    @Inject('movieRepository')
    protected movieRepository: MovieRepository,
  ) {}

  async execute(id: number): Promise<{ deleted: true; movie: MovieEntity }> {
    const movie = await this.movieRepository.loadById(id);
    if (!movie) throw new NotFoundException('Movie does not exists');
    await this.movieRepository.delete(id);
    return {
      deleted: true,
      movie: movie,
    };
  }
}
