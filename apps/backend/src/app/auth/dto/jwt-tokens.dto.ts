import { IsJWT } from 'class-validator';

export class JwtTokensDto {
  @IsJWT()
  jwtAccessToken: string;

  @IsJWT()
  jwtRefreshToken: string;
}
