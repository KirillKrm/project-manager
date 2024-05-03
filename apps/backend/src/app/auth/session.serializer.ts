import { PassportSerializer } from '@nestjs/passport';

import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: any) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: any) {
    const user = await this.usersService.findOneByEmail(payload.email);

    return user ? done(null, user) : done(null, null);
  }
}
