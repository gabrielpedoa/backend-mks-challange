import { MovieEntity } from 'src/infrastructure/entities/movie.entity';

export abstract class IDeleteMovieUseCase {
  abstract execute(id: number): Promise<{ deleted: true; movie: MovieEntity }>;
}
