import { Inject, Injectable } from '@nestjs/common';
import { ValidationException } from 'src/config/exceptions/errors/validation.exception';
import { Encrypter } from 'src/helpers/encrypter.helper';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { ICreateUserUseCase } from '../interfaces/create-user.interface';
import { UserEntity } from 'src/infrastructure/entities/user.entity';

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @Inject('userRepository')
    protected userRepository: UserRepository,
    @Inject('encrypter')
    protected encrypter: Encrypter,
  ) {}

  async execute(data: CreateUserDto): Promise<Omit<UserEntity, 'password'>> {
    console.log(1)
    const emailAreadyUsed = await this.userRepository.loadByEmail(data.email);
    if (emailAreadyUsed)
      throw new ValidationException('This email already in use!');
    console.log(data);
    const hashPassword = await this.encrypter.generateHash(data.password);
    const user = await this.userRepository.create({
      ...data,
      password: hashPassword,
    });
    delete user.password;
    return user;
  }
}
