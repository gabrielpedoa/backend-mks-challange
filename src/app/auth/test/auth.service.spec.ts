import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from 'src/config/exceptions/errors/notFound.exception';
import { ValidationException } from 'src/config/exceptions/errors/validation.exception';
import { Encrypter } from 'src/helpers/encrypter.helper';
import { JwtHelper } from 'src/helpers/jwt.helper';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { LoginAuthUseCase } from '../use-cases/login-auth';

describe('LoginAuthUseCase', () => {
  let useCase: LoginAuthUseCase;
  let userRepositoryMock: Partial<UserRepository>;
  let encrypterMock: Partial<Encrypter>;
  let jwtServiceMock: Partial<JwtHelper>;
  let cacheManagerMock: Partial<any>;

  beforeEach(async () => {
    userRepositoryMock = {
      loadByEmail: jest.fn(),
    };
    encrypterMock = {
      compareHash: jest.fn(),
    };
    jwtServiceMock = {
      genToken: jest.fn(),
    };
    cacheManagerMock = {
      get: jest.fn(),
      set: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginAuthUseCase,
        { provide: 'userRepository', useValue: userRepositoryMock },
        { provide: 'encrypter', useValue: encrypterMock },
        { provide: 'jwtService', useValue: jwtServiceMock },
        { provide: 'CACHE_MANAGER', useValue: cacheManagerMock },
      ],
    }).compile();

    useCase = module.get<LoginAuthUseCase>(LoginAuthUseCase);
  });

  test('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    test('should throw NotFoundException when user is not found', async () => {
      userRepositoryMock.loadByEmail = jest
        .fn()
        .mockResolvedValueOnce(undefined);
      await expect(
        useCase.execute({ email: 'test@example.com', password: 'password' }),
      ).rejects.toThrow(NotFoundException);
    });

    test('should throw ValidationException when password is invalid', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
      };
      userRepositoryMock.loadByEmail = jest.fn().mockResolvedValueOnce(user);
      encrypterMock.compareHash = jest.fn().mockResolvedValueOnce(false);
      await expect(
        useCase.execute({
          email: 'test@example.com',
          password: 'invalidPassword',
        }),
      ).rejects.toThrow(ValidationException);
    });

    test('should generate and return access token when user is found and password is valid', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
      };
      userRepositoryMock.loadByEmail = jest.fn().mockResolvedValueOnce(user);
      encrypterMock.compareHash = jest.fn().mockResolvedValueOnce(true);
      jwtServiceMock.genToken = jest.fn().mockResolvedValueOnce('accessToken');
      cacheManagerMock.get = jest.fn().mockResolvedValueOnce(undefined);
      await expect(
        useCase.execute({
          email: 'test@example.com',
          password: 'validPassword',
        }),
      ).resolves.toEqual({ access_token: 'accessToken' });
    });

    test('should return access token from cache when available', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
      };
      userRepositoryMock.loadByEmail = jest.fn().mockResolvedValueOnce(user);
      encrypterMock.compareHash = jest.fn().mockResolvedValueOnce(true);
      cacheManagerMock.get = jest
        .fn()
        .mockResolvedValueOnce('cachedAccessToken');
      await expect(
        useCase.execute({
          email: 'test@example.com',
          password: 'validPassword',
        }),
      ).resolves.toEqual({ access_token: 'cachedAccessToken' });
    });
  });
});
