export class DefaultException extends Error {
    error_code: number;
    error_type: string;
    error_message: string;
    error_details: {};
    constructor(message: string, code: number) {
      super(message);
      this.error_type = this.constructor.name;
      this.error_code = code;
      this.error_message = message;
    }
  }
  