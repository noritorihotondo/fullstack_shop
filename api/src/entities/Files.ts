import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';

import { FilesEntity } from '../types';
import { Product } from './Product';

@Entity()
export class File extends BaseEntity implements FilesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'image' })
  name: string;

  @Column()
  path: string;

  @ManyToOne(() => Product, (product) => product.files)
  product: Product;
}
