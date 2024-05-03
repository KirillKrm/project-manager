import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  /**
   * - At least 1 uppercase letter
   * - at least 1 special character !@#$&*^()
   * - at least 1 number
   * - at least 1 lowercase letter
   * - min length 8
   * **/
  @Matches(/^(?=.*[A-Z].*)(?=.*[!@#$&*^()\-_])(?=.*[0-9].*)(?=.*[a-z].*).{8,}$/)
  readonly password: string;
}
