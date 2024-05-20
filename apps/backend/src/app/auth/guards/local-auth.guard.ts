import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') implements CanActivate {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;
    try {
      const user = await this.authService.validateUser(email, password);
      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
    } catch (e) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
