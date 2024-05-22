import { CategoryEntity } from 'src/infrastructure/entities/category.entity';

export abstract class IFindOneMovieCategoryUseCase {
  abstract execute(category: string): Promise<CategoryEntity>;
}
