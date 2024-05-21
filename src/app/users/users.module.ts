import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { RepositoryModule } from 'src/infrastructure/repositories/repository.module';
import { JwtHelper } from 'src/helpers/jwt.helper';
import { Encrypter } from 'src/helpers/encrypter.helper';
import {
  ICreateUserUseCase,
  IDeleteUserUseCase,
  IFindAllUsersUseCase,
  IFindOneUserUseCase,
  IUpdateUserUseCase,
} from './interfaces';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  FindAllUserUseCase,
  FindOneUserUseCase,
  UpdateUserUseCase,
} from './use-cases';
import { HelpersModule } from 'src/helpers/helpers.module';

@Module({
  imports: [RepositoryModule, HelpersModule],
  controllers: [UsersController],
  providers: [
    { provide: ICreateUserUseCase, useClass: CreateUserUseCase },
    { provide: IFindAllUsersUseCase, useClass: FindAllUserUseCase },
    { provide: IFindOneUserUseCase, useClass: FindOneUserUseCase },
    { provide: IUpdateUserUseCase, useClass: UpdateUserUseCase },
    { provide: IDeleteUserUseCase, useClass: DeleteUserUseCase },
  ],
})
export class UsersModule {}
