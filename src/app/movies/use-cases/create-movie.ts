import { Inject, Injectable } from '@nestjs/common';
import { ICreateMovieUseCase } from '../interfaces';
import { MovieRepository } from 'src/infrastructure/repositories/movie.repository';
import { MovieEntity } from 'src/infrastructure/entities/movie.entity';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { ValidationException } from 'src/config/exceptions/errors/validation.exception';

@Injectable()
export class CreateMovieUseCase implements ICreateMovieUseCase {
  constructor(
    @Inject('movieRepository')
    protected movieRepository: MovieRepository,
  ) {}

  async execute(data: CreateMovieDto): Promise<MovieEntity> {
    const isTitleUsed = await this.movieRepository.loadByName(data.title);
    if (isTitleUsed)
      throw new ValidationException('Movie title already exists');
    const movie = await this.movieRepository.create({ ...data });
    return movie;
  }
}
