import { UserEntity } from 'src/infrastructure/entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

export abstract class IUpdateUserUseCase {
  abstract execute(data: UpdateUserDto): Promise<Omit<UserEntity, 'password'>>;
}
