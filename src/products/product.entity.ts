import { Subcategory } from './../subcategories/subcategory.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['name'])
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {length: 40})
    name: string;

    @Column("varchar", {length: 500})
    shortdescription: string;

    @Column("float")
    price: number;

    @ManyToOne(type => Subcategory, subcategory => subcategory.products, {onDelete: "CASCADE"})
    subcategory: Subcategory;

    @Column()
    stock: number;

    @CreateDateColumn()
    @Exclude()
    createdat?: Date;

    @UpdateDateColumn()
    @Exclude()
    updatedat?: Date;

    @Column()
    subcategoryId?: number;
}