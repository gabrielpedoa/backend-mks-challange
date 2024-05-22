import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';
import { IJwtPayload } from 'src/@types/jwt.type';

config();

const SECRET = process.env.JWT_SECRET;

@Injectable()
export class JwtHelper {
  private readonly jwt = new JwtService({
    secret: SECRET,
  });

  async genToken(data: IJwtPayload): Promise<string> {
    const token = await this.jwt.signAsync(JSON.stringify(data));
    console.log("helper: ",token)
    return token;
  }

  async verify(token: string): Promise<IJwtPayload> {
    const payload = await this.jwt.verifyAsync(token);
    return payload as IJwtPayload;
  }
}
