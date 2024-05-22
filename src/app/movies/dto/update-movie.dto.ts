import { ApiProperty } from '@nestjs/swagger';

export class UpdateMovieDto {
  @ApiProperty({ enumName: 'id', example: '2' })
  id: number;
  @ApiProperty({ enumName: 'title', example: 'any movie title' })
  title: string;
  @ApiProperty({
    enumName: 'description',
    example: 'any descritpion of category movie',
  })
  description: string;
  @ApiProperty({ enumName: 'year', example: 2024 })
  year: number;
  @ApiProperty({ enumName: 'category_id', example: '1,2' })
  category_id: string;
}
