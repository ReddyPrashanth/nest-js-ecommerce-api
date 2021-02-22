import { Option } from './option.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class Optionset extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 15})
    name: string;

    @Column()
    shortdescription: string;

    @OneToMany(type => Option, option => option.optionset, {eager: true})
    options: Option[];
}