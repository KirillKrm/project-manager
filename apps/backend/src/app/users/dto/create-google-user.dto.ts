import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';

export class CreateGoogleUserDto extends PickType(CreateUserDto, [
  'email',
  'username',
]) {
  @IsString()
  readonly photo: string;
}
