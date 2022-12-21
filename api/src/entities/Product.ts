import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';

import { ProductEntity } from '../types';
import { File } from './Files';
import { Orders } from './Orders';

@Entity()
export class Product extends BaseEntity implements ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  productname: string;

  @Column({
    default: 0,
  })
  price: number;

  @Column({ default: 0 })
  rate: number;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @OneToMany(() => File, (file) => file.product)
  files: File[];

  @ManyToMany(() => Orders, (order) => order.products)
  orders: Orders;
}
