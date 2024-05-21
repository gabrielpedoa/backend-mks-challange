import { UserEntity } from 'src/infrastructure/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

export abstract class ICreateUserUseCase {
  abstract execute(dto: CreateUserDto): Promise<Omit<UserEntity, 'password'>>;
}
