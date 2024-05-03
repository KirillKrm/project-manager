import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule, PassportModule],
  providers: [
    AuthService,
    UsersService,
    JwtService,
    ConfigService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    SessionSerializer,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
