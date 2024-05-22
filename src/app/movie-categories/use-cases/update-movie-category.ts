import { CategoryEntity } from 'src/infrastructure/entities/category.entity';
import { UpdateMovieCategoryDto } from '../dto/update-movie-category.dto';
import { IUpdateMovieCategoryUseCase } from '../interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';
import { ValidationException } from 'src/config/exceptions/errors/validation.exception';

@Injectable()
export class UpdateMovieCategoryUseCase implements IUpdateMovieCategoryUseCase {
  constructor(
    @Inject('categoryRepository')
    protected categoryRepository: CategoryRepository,
  ) {}
  async execute(data: UpdateMovieCategoryDto): Promise<CategoryEntity> {
    const existingCategory = await this.categoryRepository.loadById(data.id);
    if (!existingCategory)
      throw new ValidationException('This category does not exist');
    await this.categoryRepository.update({ ...data });
    const updatedCategory = await this.categoryRepository.loadById(data.id);
    return updatedCategory;
  }
}
