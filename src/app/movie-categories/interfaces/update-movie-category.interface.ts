import { CategoryEntity } from 'src/infrastructure/entities/category.entity';
import { UpdateMovieCategoryDto } from '../dto/update-movie-category.dto';

export abstract class IUpdateMovieCategoryUseCase {
  abstract execute(data: UpdateMovieCategoryDto): Promise<CategoryEntity>;
}
