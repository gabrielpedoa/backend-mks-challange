import { UserEntity } from 'src/infrastructure/entities/user.entity';
import { IFindAllUsersUseCase } from '../interfaces';
import { Inject } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

export class FindAllUserUseCase implements IFindAllUsersUseCase {
  constructor(
    @Inject('userRepository')
    protected userRepository: UserRepository,
  ) {}

  async execute(): Promise<UserEntity | UserEntity[]> {
    const users = await this.userRepository.loadAll();
    return users;
  }
}
