import { PassportSerializer } from '@nestjs/passport';

import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  serializeUser(user: any, done: Function) {
    done(null, user);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async deserializeUser(payload: any, done: Function) {
    try {
      const user = await this.usersService.findOneByEmail(payload.email);
      if (user) {
        done(null, user);
      } else {
        done(null, null);
      }
    } catch (error) {
      done(error);
    }
  }
}
