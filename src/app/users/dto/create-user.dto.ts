import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Min } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ name: 'name', example: 'gabriel' })
  @IsNotEmpty({ message: 'Name is required!' })
  @Min(3, { message: 'Name must be have 3 characters!' })
  name: string;
  @ApiProperty({ name: 'email', example: 'gabriel@email.com' })
  @IsNotEmpty({ message: 'Email is required!' })
  @IsEmail()
  email: string;
  @ApiProperty({ name: 'password', example: 'mypassword123' })
  @IsNotEmpty({ message: 'Password is required!' })
  password: string;
}
