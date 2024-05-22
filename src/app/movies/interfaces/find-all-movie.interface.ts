import { MovieEntity } from 'src/infrastructure/entities/movie.entity';

export abstract class IFindAllMovieUseCase {
  abstract execute(): Promise<MovieEntity | MovieEntity[]>;
}
