import { UserEntity } from 'src/infrastructure/entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUpdateUserUseCase } from '../interfaces';
import { Inject } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { NotFoundException } from 'src/config/exceptions/errors/notFound.exception';
import { ValidationException } from 'src/config/exceptions/errors/validation.exception';

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    @Inject('userRepository')
    protected userRepository: UserRepository,
  ) {}
  async execute(data: UpdateUserDto): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.userRepository.loadById(data.id);
    if (!user) throw new NotFoundException('User not found!');
    if (user.email != data.email) {
      const emailAlreadyUSed = await this.userRepository.loadByEmail(
        data.email,
      );
      if (emailAlreadyUSed)
        throw new ValidationException('This email already in use!');
    }
    const updatedUser = await this.userRepository.update({
      ...data,
      id: Number(data.id),
    });
    
    return updatedUser;
  }
}
