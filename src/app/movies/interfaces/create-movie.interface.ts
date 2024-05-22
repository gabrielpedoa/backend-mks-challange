import { MovieEntity } from 'src/infrastructure/entities/movie.entity';
import { CreateMovieDto } from '../dto/create-movie.dto';

export abstract class ICreateMovieUseCase {
  abstract execute(data: CreateMovieDto): Promise<MovieEntity>;
}
