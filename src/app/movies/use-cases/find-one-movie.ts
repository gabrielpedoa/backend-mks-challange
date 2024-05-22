import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/config/exceptions/errors/notFound.exception';
import { MovieEntity } from 'src/infrastructure/entities/movie.entity';
import { MovieRepository } from 'src/infrastructure/repositories/movie.repository';
import { IFindOneMovieUseCase } from '../interfaces';

@Injectable()
export class FindOneMovieUseCase implements IFindOneMovieUseCase {
  constructor(
    @Inject('movieRepository')
    protected movieRepository: MovieRepository,
  ) {}

  async execute(title: string): Promise<MovieEntity> {
    const movie = await this.movieRepository.loadByName(title);
    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }
}
