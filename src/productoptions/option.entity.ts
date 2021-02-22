import { Optionset } from './optionset.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class Option extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 15})
    name: string;

    @Column('varchar', {length: 10})
    shortname: string;

    @Column()
    optionsetId: number;

    @ManyToOne(type => Optionset, optionset => optionset.options, {onDelete: 'CASCADE'})
    optionset: Optionset;
}