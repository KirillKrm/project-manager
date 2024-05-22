import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
import { UUID } from 'crypto';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsUUID()
  @MaxLength(255)
  projectId: UUID;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  status: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  priority: string;
}
