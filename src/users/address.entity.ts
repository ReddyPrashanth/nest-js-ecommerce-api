import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Address extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {length: 100})
    address1: string;

    @Column("varchar", {length: 50, nullable: true})
    address2: string;

    @Column("varchar", {length: 90})
    city: string;

    @Column("varchar", {length: 20})
    state: string;

    @Column("varchar", {length: 30})
    country: string;

    @Column("varchar", {length: 12})
    zipCode: string;

    @Column("varchar", {length: 20})
    phone: string;

    @Column()
    userId: number;

    @ManyToOne(type=> User, user => user.addresses)
    user:User;
}