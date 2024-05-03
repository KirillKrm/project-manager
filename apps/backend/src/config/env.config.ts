import { IsDefined, IsNumberString, IsString } from 'class-validator';

export class EnvConfigSchema {
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
  @IsNumberString()
  JWT_ACCESS_EXPIRE: number;

  @IsDefined()
  @IsString()
  JWT_REFRESH_SECRET: string;

  @IsDefined()
  @IsNumberString()
  JWT_REFRESH_EXPIRE: number;
}
