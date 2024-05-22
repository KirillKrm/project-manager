import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UUID } from 'crypto';

import { Project } from '../projects/project.entity';

@Entity({ name: 'tasks' })
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => Project)
  project: Project;

  @Column({ type: 'varchar', length: '255' })
  title: string;

  @Column({ type: 'varchar', length: '255' })
  status: string;

  @Column({ type: 'varchar', length: '255' })
  priority: string;
}
