import { Inject, Injectable } from '@nestjs/common';
import { MovieEntity } from 'src/infrastructure/entities/movie.entity';
import { MovieRepository } from 'src/infrastructure/repositories/movie.repository';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { IUpdateMovieUseCase } from '../interfaces';
import { NotFoundException } from 'src/config/exceptions/errors/notFound.exception';

@Injectable()
export class UpdateMovieUseCase implements IUpdateMovieUseCase {
  constructor(
    @Inject('movieRepository')
    protected movieRepository: MovieRepository,
  ) {}
  async execute(data: UpdateMovieDto): Promise<MovieEntity> {
    const movie = await this.movieRepository.loadById(data.id);
    if (!movie) throw new NotFoundException('Movie not found!');
    await this.movieRepository.update({
      ...data,
      id: Number(data.id),
    });
    const updatedmovie = await this.movieRepository.loadById(data.id);
    return updatedmovie;
  }
}
