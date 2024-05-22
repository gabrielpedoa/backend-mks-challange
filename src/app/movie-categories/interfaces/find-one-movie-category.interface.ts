import { CategoryEntity } from 'src/infrastructure/entities/category.entity';

export abstract class IFindOneMovieCategory {
  abstract execute(category: string): Promise<CategoryEntity>;
}
