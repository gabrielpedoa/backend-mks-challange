import { CategoryEntity } from 'src/infrastructure/entities/category.entity';

export abstract class IFindAllMovieCategory {
  abstract execute(): Promise<CategoryEntity>;
}
