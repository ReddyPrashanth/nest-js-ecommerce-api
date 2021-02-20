import { Product } from './../products/product.entity';
import { Category } from './../categories/category.entity';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class Subcategory extends BaseEntity {
    @PrimaryGeneratedColumn()    
    id: number;

    @Column()
    name: string;

    @Column()
    categoryId: number;

    @ManyToOne(type => Category, category => category.subcategories, {onDelete: "CASCADE"})
    category: Category;

    @OneToMany(type => Product, product => product.subcategory)
    products: Product[];
}