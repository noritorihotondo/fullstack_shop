import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

import { OrdersEntity } from '../types/Orders';
import { Product } from './Product';

@Entity()
export class Orders extends BaseEntity implements OrdersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
}
