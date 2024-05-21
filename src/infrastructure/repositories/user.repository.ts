import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export class UserRepository {
  private readonly userRepository: Repository<UserEntity>;
  constructor(dataSource: DataSource) {
    this.userRepository = dataSource.getRepository(UserEntity);
  }

  async create() {}
  async loadAll() {}
  async loadById() {}
  async loadByEmail() {}
  async update() {}
  async delete() {}
}
