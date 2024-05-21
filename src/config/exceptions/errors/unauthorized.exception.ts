import { DefaultException } from './default.exception';

export class UnauthorizedException extends DefaultException {
  constructor(message = 'UNAUTHORIZED') {
    super(message, 401);
  }
}
