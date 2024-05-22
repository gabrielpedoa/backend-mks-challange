import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MovieEntity } from '../entities/movie.entity';
import { CreateMovieDto } from 'src/app/movies/dto/create-movie.dto';
import { UpdateMovieDto } from 'src/app/movies/dto/update-movie.dto';

@Injectable()
export class MovieRepository {
  private readonly movieRepository: Repository<MovieEntity>;
  constructor(dataSource: DataSource) {
    this.movieRepository = dataSource.getRepository(MovieEntity);
  }

  async create(data: CreateMovieDto) {
    const movie = await this.movieRepository.save(data);
    return movie;
  }

  async loadAll() {
    const movies = await this.movieRepository.find({ where: { enable: 1 } });
    return movies;
  }

  async loadById(id: number) {
    const movie = await this.movieRepository.findOne({ where: { id: id } });
    return movie;
  }

  async loadByName(title: string) {
    const movie = await this.movieRepository.findOne({
      where: { title: title },
    });
    return movie;
  }

  async update(data: UpdateMovieDto) {
    await this.movieRepository.update({ id: data.id }, data);
  }

  async delete(id: number) {
    const movie = await this.movieRepository.findOne({
      where: {
        id: id,
      },
    });

    movie.enable = 0;
    await this.movieRepository.save(movie);
    const updatedMovie = await this.movieRepository.findOne({
      where: { id: id },
    });
    return { deleted: true, updatedMovie };
  }
}
