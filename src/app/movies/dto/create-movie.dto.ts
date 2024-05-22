import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({ enumName: 'title', example: 'any movie title' })
  @IsNotEmpty({ message: 'Title is required!' })
  title: string;
  @ApiProperty({
    enumName: 'description',
    example: 'any descritpion of category movie',
  })
  @IsNotEmpty({ message: 'Description is required!' })
  description: string;
  @ApiProperty({ enumName: 'year', example: 2024 })
  @IsNotEmpty({ message: 'Year is required!' })
  year: number;
  @ApiProperty({ enumName: 'category_id', example: '1,2' })
  @IsNotEmpty({ message: 'CategorryId is required!' })
  category_id: string;
}
