import { Category } from './../categories/category.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class Subcategory extends BaseEntity {
    @PrimaryGeneratedColumn()    
    id: number;

    @Column()
    name: string;

    @Column()
    categoryId: number;

    @ManyToOne(type => Category, category => category.subcategories)
    category: Category;
}