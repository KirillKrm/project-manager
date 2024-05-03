import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { generateFromEmail } from 'unique-username-generator';

import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtPayload } from './strategies/jwt.strategy';
import { Hash } from '../../common/hash';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { JwtTokensDto } from './dto/jwt-tokens.dto';
import { JwtRefreshDto } from './dto/jwt-refresh.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async registerUser(payload: RegisterDto): Promise<User> {
    const userPayload: CreateUserDto = payload;
    const user = await this.usersService.create(userPayload);

    return this.usersService.findOne(user.id);
  }

  async validateUser(
    email: string,
    password: string
  ): Promise<JwtPayload | null> {
    const user = await this.userRepository.findOneBy({ email });

    if (user && Hash.compare(password, user.password)) {
      return { id: user.id, email: user.email };
    }
    return null;
  }

  async validateGoogleUser(userDetails: {
    email: string;
    username: string;
    photo: string;
  }): Promise<JwtPayload | null> {
    const user = await this.userRepository.findOneBy({
      email: userDetails.email,
    });

    if (user) return user;

    const newUser = this.userRepository.create(userDetails);

    return this.userRepository.save(newUser);
  }

  async getJwtTokens(email: string): Promise<JwtTokensDto> {
    const user = await this.userRepository.findOneBy({ email });

    const payload: JwtPayload = { id: user.id, email: user.email };

    const jwtAccessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRE'),
    });

    const jwtRefreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRE'),
    });

    return {
      jwtAccessToken,
      jwtRefreshToken,
    };
  }

  async refreshJwt(jwtRefreshDto: JwtRefreshDto): Promise<JwtTokensDto> {
    let jwtVerifyRes: JwtPayload;
    try {
      jwtVerifyRes = this.jwtService.verify(jwtRefreshDto.refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });
    } catch (e) {
      throw new UnauthorizedException('Invalid JWT');
    }

    const user: User = await this.usersService.findOne(jwtVerifyRes.id);
    const payload: JwtPayload = { id: user.id, email: user.email };
    const jwtAccessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRE'),
    });

    return {
      jwtAccessToken,
      jwtRefreshToken: jwtRefreshDto.refreshToken,
    };
  }
}
