import { ProductsModule } from './../products/products.module';
import { SubcategoryRepository } from './subcategory.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SubcategoriesController } from './subcategories.controller';
import { SubcategoriesService } from './subcategories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubcategoryRepository]),
    ProductsModule
  ],
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService],
  exports: [SubcategoriesService]
})
export class SubcategoriesModule {}
