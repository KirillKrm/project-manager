import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UUID } from 'crypto';

import { PasswordTransformer } from '../../common/password.transformer';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'varchar', length: '64' })
  username: string;

  @Column({ nullable: true, type: 'varchar', length: '255' })
  photo: string;

  @Column({ unique: true, type: 'varchar', length: '255' })
  email: string;

  @Column({
    nullable: true,
    transformer: new PasswordTransformer(),
  })
  @Exclude({ toPlainOnly: true })
  password: string;
}
