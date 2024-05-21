import { DefaultException } from './default.exception';

export class NotFoundException extends DefaultException {
  constructor(message = 'NOT FOUND') {
    super(message, 404);
  }
}
