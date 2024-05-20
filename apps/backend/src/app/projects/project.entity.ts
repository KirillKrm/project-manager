import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UUID } from 'crypto';

import { User } from '../users/user.entity';

@Entity({ name: 'projects' })
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'varchar', length: '255' })
  title: string;
}
