import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  Body,
  HttpCode,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtRefreshDto } from './dto/jwt-refresh.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() payload: RegisterDto,
    @Res() res: Response
  ): Promise<Response> {
    const user = await this.authService.registerUser(payload);
    const { jwtAccessToken, jwtRefreshToken } =
      await this.authService.getJwtTokens(user.email);

    this.setJwtCookies(res, jwtAccessToken, jwtRefreshToken);
    res.json({ message: 'User created' });

    return res;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(
    @Body() loginDto: LoginDto,
    @Res() res: Response
  ): Promise<Response> {
    const { jwtAccessToken, jwtRefreshToken } =
      await this.authService.getJwtTokens(loginDto.email);

    this.setJwtCookies(res, jwtAccessToken, jwtRefreshToken);
    res.json({ message: 'Logged in' });

    return res;
  }

  @Get('google/login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(GoogleAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuthLogin() {}

  @Get('google/redirect')
  @HttpCode(HttpStatus.OK)
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(
    @Req() req,
    @Res() res: Response
  ): Promise<Response> {
    const { jwtAccessToken, jwtRefreshToken } =
      await this.authService.getJwtTokens(req.user.email);

    this.setJwtCookies(res, jwtAccessToken, jwtRefreshToken);
    res.json({ message: 'Logged in with Google' });

    return res;
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const refreshToken = req.cookies.refreshToken;

    const { jwtAccessToken, jwtRefreshToken } =
      await this.authService.refreshJwt({
        refreshToken: refreshToken,
      } as JwtRefreshDto);

    this.setJwtCookies(res, jwtAccessToken, jwtRefreshToken);
    res.json({ message: 'Token refreshed' });

    return res;
  }

  private setJwtCookies(
    response: Response,
    accessToken: string,
    refreshToken: string
  ) {
    response.cookie('accessToken', accessToken, {
      sameSite: 'strict',
      expires: new Date(
        Date.now() + 1000 * this.jwtService.decode(accessToken)['exp']
      ),
    });
    response.cookie('refreshToken', refreshToken, {
      sameSite: 'strict',
      expires: new Date(
        Date.now() + 1000 * this.jwtService.decode(refreshToken)['exp']
      ),
    });
  }
}
