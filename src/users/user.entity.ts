import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Exclude } from "class-transformer";
import { Address } from "./address.entity";

export enum UserGender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({
        type: "enum",
        enum: UserGender,
        default: UserGender.MALE
    })
    gender: UserGender;

    @Column()
    @Exclude()
    password: string;

    @Column()
    @Exclude()
    salt: string;

    @CreateDateColumn()
    @Exclude()
    createdAt: string;

    @UpdateDateColumn()
    @Exclude()
    updatedAt: string;

    @OneToMany(type => Address, address => address.user)
    addresses: Address[];

    async validatePassword(password: string) {
        const hashedPassword =  await bcrypt.hash(password, this.salt);
        return hashedPassword === this.password;
    }
}