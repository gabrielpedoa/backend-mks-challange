import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, ValidateIf } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ enumName: 'id', example: '2' })
  id: number;
  @ApiProperty({ enumName: 'name', example: 'gabriel' })
  name?: string;
  @ApiProperty({ enumName: 'email', example: 'example@email.com' })
  @IsEmail()
  @ValidateIf(object => object.email)
  email?: string;
  @ApiProperty({ enumName: 'password', example: 'any_pass' })
  password?: string;
}
