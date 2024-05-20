import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;
}
