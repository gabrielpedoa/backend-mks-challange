import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtHelper } from '../../helpers/jwt.helper';
import { Request } from 'express';
import { UnauthorizedException } from '../exceptions/errors/unauthorized.exception';

@Injectable()
export class AuthGuard {
  private jwtService = new JwtHelper();
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token)
      throw new UnauthorizedException(
        'Token not provided. Please generate a new token and try again.',
      );
    try {
      const payload = await this.jwtService.verify(token);
      request.body['id'] = payload.id;
    } catch {
      throw new UnauthorizedException(
        'Invalid token. Please provide a valid token',
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
