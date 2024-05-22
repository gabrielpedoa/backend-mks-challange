import { CategoryEntity } from 'src/infrastructure/entities/category.entity';
import { CreateMovieCategoryDto } from '../dto/create-movie-category.dto';

export abstract class ICreateMovieCategoryUseCase {
  abstract execute(data: CreateMovieCategoryDto): Promise<CategoryEntity>;
}
