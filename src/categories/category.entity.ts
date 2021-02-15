import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {length: 20})
    name: string;
}