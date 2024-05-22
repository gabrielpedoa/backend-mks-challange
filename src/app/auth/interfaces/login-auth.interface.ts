import { LoginDto } from '../dto/login-dto';

export abstract class ILoginAuthUseCase {
  abstract execute(data: LoginDto): Promise<{ access_token: string }>;
}
