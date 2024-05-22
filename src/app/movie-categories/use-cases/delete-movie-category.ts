import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IDeleteMovieCategoryUseCase } from '../interfaces';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';
import { CategoryEntity } from 'src/infrastructure/entities/category.entity';

@Injectable()
export class DeleteMovieCategoryUseCase implements IDeleteMovieCategoryUseCase {
  constructor(
    @Inject('categoryRepository')
    protected categoryRepository: CategoryRepository,
  ) {}
  async execute(
    id: number,
  ): Promise<{ deleted: true; category: CategoryEntity }> {
    const category = await this.categoryRepository.loadById(String(id));
    if (!category) throw new NotFoundException('Category does not exists');
    await this.categoryRepository.delete(id);
    return {
      deleted: true,
      category: category,
    };
  }
}
