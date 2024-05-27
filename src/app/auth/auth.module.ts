import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginAuthUseCase } from './use-cases/login-auth';
import { ILoginAuthUseCase } from './interfaces/login-auth.interface';
import { HelpersModule } from 'src/helpers/helpers.module';
import { RepositoryModule } from 'src/infrastructure/repositories/repository.module';

@Module({
  imports: [HelpersModule, RepositoryModule],
  controllers: [AuthController],
  providers: [{ useClass: LoginAuthUseCase, provide: ILoginAuthUseCase }],
})
export class AuthModule {}
