import { UserEntity } from 'src/infrastructure/entities/user.entity';

export abstract class IFindOneUserUseCase {
  abstract execute(id: number): Promise<Omit<UserEntity, 'password'>>;
}
