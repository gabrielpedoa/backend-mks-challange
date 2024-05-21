import { DefaultException } from './default.exception';

export class ValidationException extends DefaultException {
  constructor(message = 'Validation Error') {
    super(message, 400);
  }
}
