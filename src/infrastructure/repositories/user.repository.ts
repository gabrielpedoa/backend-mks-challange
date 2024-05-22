import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from 'src/app/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/app/users/dto/update-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private readonly userRepository: Repository<UserEntity>;
  constructor(dataSource: DataSource) {
    this.userRepository = dataSource.getRepository(UserEntity);
  }

  async create(data: CreateUserDto) {
    const user = await this.userRepository.save(data);
    return user;
  }

  async loadAll() {
    const users = await this.userRepository.find({ where: { enable: 1 } });
    return users;
  }

  async loadById(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    return user;
  }

  async loadByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }

  async update(data: UpdateUserDto) {
    await this.userRepository.update({ id: data.id }, data);
    const updatedUser = await this.userRepository.findOne({
      where: { id: data.id },
    });
    return updatedUser;
  }

  async delete(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    user.enable = 0;
    await this.userRepository.save(user);
    const updatedUser = await this.userRepository.findOne({
      where: { id: id },
    });
    const {createdAt, enable, password, updatedAt, ...rest} = updatedUser
    return { deleted: true, user: rest };
  }
}
