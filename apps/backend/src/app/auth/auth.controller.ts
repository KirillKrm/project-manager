import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  Body,
} from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '../users/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtTokensDto } from './dto/jwt-tokens.dto';
import { JwtRefreshDto } from './dto/jwt-refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() payload: RegisterDto): Promise<User> {
    return this.authService.registerUser(payload);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<JwtTokensDto> {
    return this.authService.getJwtTokens(loginDto.email);
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async googleAuthLogin() {
    return { msg: 'Google Authentication' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    //const jwtToken = await this.authService.getJwtTokens(req.user.email);

    return { msg: 'Success Google Authentication' };
  }

  @Get('status')
  async status(@Req() req) {
    if (req.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }

  @Post('refresh')
  async refresh(@Body() jwtRefreshDto: JwtRefreshDto): Promise<JwtTokensDto> {
    return this.authService.refreshJwt(jwtRefreshDto);
  }
}
