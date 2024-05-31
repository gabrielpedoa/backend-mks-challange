import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { AuthGuard } from 'src/config/security/auth.guard';
import {
  ICreateUserUseCase,
  IDeleteUserUseCase,
  IFindAllUsersUseCase,
  IFindOneUserUseCase,
  IUpdateUserUseCase,
} from '../interfaces';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UnauthorizedException } from 'src/config/exceptions/errors/unauthorized.exception';
import { UserEntity } from 'src/infrastructure/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

// Mock classes
class MockCreateUserUseCase implements ICreateUserUseCase {
  execute = jest.fn();
}

class MockDeleteUserUseCase implements IDeleteUserUseCase {
  execute = jest.fn();
}

class MockFindAllUsersUseCase implements IFindAllUsersUseCase {
  execute = jest.fn();
}

class MockFindOneUserUseCase implements IFindOneUserUseCase {
  execute = jest.fn();
}

class MockUpdateUserUseCase implements IUpdateUserUseCase {
  execute = jest.fn();
}

describe('UsersController', () => {
  let controller: UsersController;
  let createUserUseCase: ICreateUserUseCase;
  let deleteUserUseCase: IDeleteUserUseCase;
  let findOneUserUseCase: IFindOneUserUseCase;
  let findAllUsersUseCase: IFindAllUsersUseCase;
  let updateUserUseCase: IUpdateUserUseCase;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: ICreateUserUseCase, useClass: MockCreateUserUseCase },
        { provide: IFindAllUsersUseCase, useClass: MockFindAllUsersUseCase },
        { provide: IFindOneUserUseCase, useClass: MockFindOneUserUseCase },
        { provide: IUpdateUserUseCase, useClass: MockUpdateUserUseCase },
        { provide: IDeleteUserUseCase, useClass: MockDeleteUserUseCase },
        AuthGuard,
        Reflector,
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: jest.fn((context: ExecutionContext) => {
          const request = context.switchToHttp().getRequest();
          if (!request.headers.authorization) {
            throw new UnauthorizedException(
              'Token not provided. Please generate a new token and try again.',
            );
          }
          return true;
        }),
      })
      .compile();

    controller = module.get<UsersController>(UsersController);
    createUserUseCase = module.get<ICreateUserUseCase>(ICreateUserUseCase);
    deleteUserUseCase = module.get<IDeleteUserUseCase>(IDeleteUserUseCase);
    findOneUserUseCase = module.get<IFindOneUserUseCase>(IFindOneUserUseCase);
    findAllUsersUseCase =
      module.get<IFindAllUsersUseCase>(IFindAllUsersUseCase);
    updateUserUseCase = module.get<IUpdateUserUseCase>(IUpdateUserUseCase);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should call createUserUseCase.execute with the provided dto', async () => {
    const createUserDto = {} as CreateUserDto;
    const response = {} as UserEntity;
    jest.spyOn(createUserUseCase, 'execute').mockResolvedValue(response);
    const result = await controller.create(createUserDto);
    expect(createUserUseCase.execute).toHaveBeenCalledWith(createUserDto);
    expect(result).toBe(response);
  });

  it('should call findAllUsersUseCase.execute', async () => {
    const response = {} as UserEntity[];
    jest.spyOn(findAllUsersUseCase, 'execute').mockResolvedValue(response);
    const result = await controller.findAll();
    expect(findAllUsersUseCase.execute).toHaveBeenCalled();
    expect(result).toBe(response);
  });

  it('should call findOneUserUseCase.execute with the provided id', async () => {
    const userId = '1';
    const response = {} as UserEntity;
    jest.spyOn(findOneUserUseCase, 'execute').mockResolvedValue(response);
    const result = await controller.findOne(userId);
    expect(findOneUserUseCase.execute).toHaveBeenCalledWith(Number(userId));
    expect(result).toBe(response);
  });

  it('should call updateUserUseCase.execute with the provided dto', async () => {
    const userId = '1';
    const updateUserDto = {} as UpdateUserDto;
    const response = {} as UserEntity;
    jest.spyOn(updateUserUseCase, 'execute').mockResolvedValue(response);
    const result = await controller.update(userId, updateUserDto);
    expect(updateUserUseCase.execute).toHaveBeenCalledWith({
      ...updateUserDto,
      id: Number(userId),
    });
    expect(result).toBe(response);
  });

  it('should call deleteUserUseCase.execute with the provided id', async () => {
    const userId = '1';
    const userResponse = {} as UserEntity;
    const { createdAt, enable, password, updatedAt, ...rest } = userResponse;
    const response = { deleted: true, user: rest };
    /* jest.spyOn(deleteUserUseCase, 'execute').mockResolvedValue(response); */
    const result = await controller.remove(userId);
    expect(deleteUserUseCase.execute).toHaveBeenCalledWith(Number(userId));
    expect(result).toBe(response);
  });
});
