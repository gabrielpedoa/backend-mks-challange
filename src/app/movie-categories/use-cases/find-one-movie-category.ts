import { CategoryEntity } from 'src/infrastructure/entities/category.entity';
import { IFindOneMovieCategoryUseCase } from '../interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';
import { NotFoundException } from 'src/config/exceptions/errors/notFound.exception';

@Injectable()
export class FindOneMovieCategoryUseCase
  implements IFindOneMovieCategoryUseCase
{
  constructor(
    @Inject('categoryRepository')
    protected categoryRepository: CategoryRepository,
  ) {}
  async execute(categoryName: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.loadByName(categoryName);
    if(!category) throw new NotFoundException('Category not found')
    return category;
  }
}
