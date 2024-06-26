import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(8, 20)
  readonly password: string;
}
