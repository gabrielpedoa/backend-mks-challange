import { CategoryEntity } from 'src/infrastructure/entities/category.entity';

export abstract class IFindAllMovieCategoryUseCase {
  abstract execute(): Promise<CategoryEntity | CategoryEntity[]>;
}
