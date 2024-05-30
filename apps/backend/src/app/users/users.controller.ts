import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './user.entity';
import { JwtPayload } from '../auth/strategies/jwt.strategy';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() req: JwtPayload): Promise<User> {
    return this.usersService.findOne(req['user'].sub);
  }
}
