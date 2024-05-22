import { CategoryEntity } from 'src/infrastructure/entities/category.entity';

export abstract class IDeleteMovieCategory {
  abstract execute(
    id: number,
  ): Promise<{ deleted: true; category: CategoryEntity }>;
}
