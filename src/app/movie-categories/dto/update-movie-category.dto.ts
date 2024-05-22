import { ApiProperty } from '@nestjs/swagger';

export class UpdateMovieCategoryDto {
  @ApiProperty({ enumName: 'id', example: '2' })
  id: number;
  @ApiProperty({ enumName: 'category', example: 'action' })
  category: string;
  @ApiProperty({
    enumName: 'description',
    example: 'any descritpion of category movie',
  })
  description: string;
}
