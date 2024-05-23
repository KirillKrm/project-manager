import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthorizeDto {
  @IsNotEmpty()
  @IsString()
  client_id: string;

  @IsNotEmpty()
  @IsString()
  redirect_uri: string;

  @IsNotEmpty()
  @IsString()
  grant_type: string;

  @IsNotEmpty()
  @IsString()
  response_type: string;

  @IsNotEmpty()
  @IsEmail()
  userEmail: string;

  @IsNotEmpty()
  @IsString()
  userPassword: string;
}

export class GetAccessTokenDto {
  @IsNotEmpty()
  @IsString()
  grant_type: string;
}
