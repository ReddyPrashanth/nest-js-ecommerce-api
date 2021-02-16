import { SubcategoriesModule } from './../subcategories/subcategories.module';
import { CategoryRepository } from './category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([CategoryRepository]),
        SubcategoriesModule,
    ],
    providers: [CategoriesService],
    controllers: [CategoriesController]
})
export class CategoriesModule {}
