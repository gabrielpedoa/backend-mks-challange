import { UserEntity } from 'src/infrastructure/entities/user.entity';

export abstract class IFindAllUsersUseCase {
  abstract execute(): Promise<UserEntity | UserEntity[]>;
}
