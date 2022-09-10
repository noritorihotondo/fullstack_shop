import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

import { UserEntity } from '../types';

@Entity()
export class User extends BaseEntity implements UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 10 })
  firstname: string;

  @Column({
    unique: true,
    length: 20,
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
    default: true,
  })
  active: boolean;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
