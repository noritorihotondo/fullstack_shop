import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity
} from 'typeorm'

import {UserEntity} from "../types";

@Entity()
export class User extends BaseEntity implements UserEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    firstname: string

    @Column({
        unique: true
    })
    email: string

    @Column({
        nullable: true
    })
    password: string

    @Column()
    lastname: string

    @Column({
        default: true
    })
    active: boolean

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
console.log(__dirname)