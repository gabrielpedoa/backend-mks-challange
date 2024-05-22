import { MovieEntity } from 'src/infrastructure/entities/movie.entity';

export abstract class IFindOneMovieUseCase {
  abstract execute(title: string): Promise<MovieEntity>;
}
