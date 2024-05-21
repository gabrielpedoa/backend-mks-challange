import { UserEntity } from 'src/infrastructure/entities/user.entity';

export abstract class IDeleteUserUseCase {
  abstract execute(id: number): Promise<{ deleted: true; user: UserEntity }>;
}
