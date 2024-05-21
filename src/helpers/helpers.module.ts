import { Module } from '@nestjs/common';
import { Encrypter } from './encrypter.helper';
import { JwtHelper } from './jwt.helper';

@Module({
  providers: [
    { useClass: JwtHelper, provide: 'jwtService' },
    { useClass: Encrypter, provide: 'encrypter' },
  ],
  exports: [
    { useClass: JwtHelper, provide: 'jwtService' },
    { useClass: Encrypter, provide: 'encrypter' },
  ],
})
export class HelpersModule {}
