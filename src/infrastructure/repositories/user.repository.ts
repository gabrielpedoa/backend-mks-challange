import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from 'src/app/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/app/users/dto/update-user.dto';

export class UserRepository {
  private readonly userRepository: Repository<UserEntity>;
  constructor(dataSource: DataSource) {
    this.userRepository = dataSource.getRepository(UserEntity);
  }

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.save(dto);
    return user;
  }

  async loadAll() {
    const users = await this.userRepository.find();
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

  async update(dto: UpdateUserDto) {
    await this.userRepository.update({ id: dto.id }, dto);
  }

  async delete(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    user.enable = 0;
    await this.userRepository.save(user);
  }
}
