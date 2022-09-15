import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

import { UserEntity, UserStatus } from '../types';

@Entity()
export class User extends BaseEntity implements UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 10 })
  firstname: string;

  @Column({
    unique: true,
    length: 255,
  })
  email: string;

  @Column({
    nullable: true,
    length: 20,
  })
  password: string;

  @Column({ length: 10 })
  lastname: string;

  @Column({
    default: UserStatus.Pending,
    type: 'enum',
    enum: UserStatus,
  })
  status: UserStatus;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
