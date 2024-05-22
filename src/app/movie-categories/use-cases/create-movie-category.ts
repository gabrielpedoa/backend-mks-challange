import { CategoryEntity } from 'src/infrastructure/entities/category.entity';
import { CreateMovieCategoryDto } from '../dto/create-movie-category.dto';
import { ICreateMovieCategoryUseCase } from '../interfaces';

export class CreateMovieCategoryUseCase implements ICreateMovieCategoryUseCase {
  async execute(data: CreateMovieCategoryDto): Promise<CategoryEntity> {
    
  }
}
