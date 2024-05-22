import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Min } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ name: 'id', example: 12 })
  @IsNotEmpty({ message: 'Id is required!' })
  id: number;
  @ApiProperty({ name: 'name', example: 'gabriel' })
  name: string;
  @ApiProperty({ name: 'email', example: 'gabriel@email.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ name: 'password', example: 'mypassword123' })
  password: string;
}
