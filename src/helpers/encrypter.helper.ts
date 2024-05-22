import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Encrypter {
  async compareHash(hash: string, value: string): Promise<boolean> {
    const isEqual = await bcrypt.compare(value, hash);
    return isEqual;
  }
  private readonly rounds = 10;

  async generateHash(value: string) {
    const salt = await bcrypt.genSalt(this.rounds);
    const hash = await bcrypt.hash(value, salt);
    return hash;
  }
}
