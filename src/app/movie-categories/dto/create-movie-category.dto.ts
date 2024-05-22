import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMovieCategoryDto {
  @ApiProperty({ enumName: 'category', example: 'action' })
  @IsNotEmpty({ message: 'category is required!' })
  category: string;
  @ApiProperty({ enumName: 'description', example: 'any descritpion of category movie' })
  @IsNotEmpty({ message: 'description is required!' })
  description: string;
}
