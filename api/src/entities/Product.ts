import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

import { ProductEntity } from '../types';

@Entity()
export class Product extends BaseEntity implements ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  productname: string;

  @Column({
    nullable: true,
  })
  price: number;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
