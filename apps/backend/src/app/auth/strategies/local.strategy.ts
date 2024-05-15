import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // async validate(email: string, password: string): Promise<JwtPayload> {
  async validate(...payload): Promise<JwtPayload> {
    console.log(payload);
    return payload as any;
    // const user = await this.authService.validateUser(email, password);
    // console.log('user', user);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return user;
  }
}
