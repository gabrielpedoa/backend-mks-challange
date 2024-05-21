import { Inject } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { IFindOneUserUseCase } from '../interfaces';
import { UserEntity } from 'src/infrastructure/entities/user.entity';

export class FindOneUserUseCase implements IFindOneUserUseCase {
  constructor(
    @Inject('userRepository')
    protected userRepository: UserRepository,
  ) {}

  async execute(id: number): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.userRepository.loadById(id);
    return user;
  }
}
