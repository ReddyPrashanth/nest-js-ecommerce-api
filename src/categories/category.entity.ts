import { Subcategory } from './../subcategories/subcategory.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {length: 20})
    name: string;

    @OneToMany(type => Subcategory, subcategory => subcategory.category)
    subcategories: Subcategory[];
}