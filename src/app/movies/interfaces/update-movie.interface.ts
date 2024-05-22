import { MovieEntity } from 'src/infrastructure/entities/movie.entity';
import { UpdateMovieDto } from '../dto/update-movie.dto';

export abstract class IUpdateMovieUseCase {
  abstract execute(data: UpdateMovieDto): Promise<MovieEntity>;
}
