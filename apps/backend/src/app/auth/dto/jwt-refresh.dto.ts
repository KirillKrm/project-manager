import { IsJWT } from 'class-validator';

export class JwtRefreshDto {
  @IsJWT()
  refreshToken: string;
}
