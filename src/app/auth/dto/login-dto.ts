import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ enumName: 'email', example: 'example@email.com' })
  @IsNotEmpty({ message: 'Email is required!' })
  @IsEmail()
  email: string;
  @ApiProperty({ enumName: 'password', example: 'any_pass' })
  @IsNotEmpty({ message: 'Password is required!' })
  password: string;
}
