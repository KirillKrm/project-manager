import { IsDefined, IsNumberString, IsString } from 'class-validator';

export class EnvConfigSchema {
  @IsDefined()
  @IsNumberString()
  PORT: string;

  @IsDefined()
  @IsString()
  GOOGLE_CLIENT_ID: string;

  @IsDefined()
  @IsString()
  GOOGLE_CLIENT_SECRET: string;

  @IsDefined()
  @IsString()
  GOOGLE_CALLBACK_URL: string;

  @IsDefined()
  @IsString()
  DB_TYPE: string;

  @IsDefined()
  @IsString()
  DB_USERNAME: string;

  @IsDefined()
  @IsString()
  DB_HOST: string;

  @IsDefined()
  @IsString()
  DB_DATABASE: string;

  @IsDefined()
  @IsString()
  DB_PASSWORD: string;

  @IsDefined()
  @IsNumberString()
  DB_PORT: number;

  @IsDefined()
  @IsString()
  JWT_SECRET: string;

  @IsDefined()
  @IsString()
  JWT_ACCESS_EXPIRE: string;

  @IsDefined()
  @IsString()
  JWT_REFRESH_SECRET: string;

  @IsDefined()
  @IsString()
  JWT_REFRESH_EXPIRE: string;

  @IsDefined()
  @IsString()
  SESSION_SECRET: string;
}
