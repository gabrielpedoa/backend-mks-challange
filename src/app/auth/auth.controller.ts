import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login-dto';
import { ILoginAuthUseCase } from './interfaces/login-auth.interface';
import { ApiCreatedResponse } from 'src/config/swagger/swagger.decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginAuthUseCase: ILoginAuthUseCase) {}

  @Post('login')
  @ApiCreatedResponse('Created')
  create(@Body() createAuthDto: LoginDto) {
    console.log(1);
    return this.loginAuthUseCase.execute(createAuthDto);
  }
}
