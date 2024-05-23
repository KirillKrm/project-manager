import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
import { UUID } from 'crypto';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsUUID('4')
  readonly projectId: UUID;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly status: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly priority: string;
}
