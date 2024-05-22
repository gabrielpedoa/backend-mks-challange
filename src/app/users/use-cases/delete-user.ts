import { Inject } from '@nestjs/common';
import { IDeleteUserUseCase } from '../interfaces';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { NotFoundException } from 'src/config/exceptions/errors/notFound.exception';
import { UserEntity } from 'src/infrastructure/entities/user.entity';

export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(
    @Inject('userRepository')
    protected userRepository: UserRepository,
  ) {}
  async execute(id: number): Promise<{ deleted: true; user: UserEntity }> {
    const user = await this.userRepository.loadById(id);
    if (!user) throw new NotFoundException('User does not exists!');
    await this.userRepository.delete(id);
    return { deleted: true, user: user };
  }
}