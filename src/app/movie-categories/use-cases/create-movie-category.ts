import { CategoryEntity } from 'src/infrastructure/entities/category.entity';
import { CreateMovieCategoryDto } from '../dto/create-movie-category.dto';
import { ICreateMovieCategoryUseCase } from '../interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';
import { ValidationException } from 'src/config/exceptions/errors/validation.exception';

@Injectable()
export class CreateMovieCategoryUseCase implements ICreateMovieCategoryUseCase {
  constructor(
    @Inject('categoryRepository')
    protected categoryRepository: CategoryRepository,
  ) {}
  
  async execute(data: CreateMovieCategoryDto): Promise<CategoryEntity> {
    const verifyIfNameAlreadUsed = await this.categoryRepository.loadByName(
      data.category,
    );
    if (verifyIfNameAlreadUsed)
      throw new ValidationException("Category's name alread used");
    const category = await this.categoryRepository.create({
      ...data,
    });
    return category;
  }
}
