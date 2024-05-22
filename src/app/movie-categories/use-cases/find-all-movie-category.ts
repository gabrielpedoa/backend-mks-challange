import { CategoryEntity } from 'src/infrastructure/entities/category.entity';
import { IFindAllMovieCategoryUseCase } from '../interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';

@Injectable()
export class FindAllMovieCategoryUseCase
  implements IFindAllMovieCategoryUseCase
{
  constructor(
    @Inject('categoryRepository')
    protected categoryRepository: CategoryRepository,
  ) {}
  async execute(): Promise<CategoryEntity | CategoryEntity[]> {
    const categories = await this.categoryRepository.loadAll();
    return categories;
  }
}
