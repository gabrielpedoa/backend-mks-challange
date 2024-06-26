import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/config/exceptions/errors/notFound.exception';
import { ValidationException } from 'src/config/exceptions/errors/validation.exception';
import { Encrypter } from 'src/helpers/encrypter.helper';
import { JwtHelper } from 'src/helpers/jwt.helper';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { LoginDto } from '../dto/login-dto';
import { ILoginAuthUseCase } from '../interfaces/login-auth.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class LoginAuthUseCase implements ILoginAuthUseCase {
  constructor(
    @Inject('userRepository')
    protected userRepository: UserRepository,
    @Inject('encrypter')
    protected encrypter: Encrypter,
    @Inject('jwtService')
    protected jwtService: JwtHelper,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}
  async execute(data: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userRepository.loadByEmail(data.email);
    if (!user) throw new NotFoundException('User not found!');
    const isPasswordValid = await this.encrypter.compareHash(
      user.password,
      data.password,
    );
    if (!isPasswordValid)
      throw new ValidationException('email or password invalid!');
    const cacheKey = `access_token_${user.id}`;
    let token = await this.cacheManager.get<string>(cacheKey);
    if (!token) {
      token = await this.jwtService.genToken({
        id: String(user.id),
        email: user.email,
      });
      await this.cacheManager.set(cacheKey, token, 3600);
    }
    return {
      access_token: token,
    };
  }
}
