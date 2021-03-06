import { CreateSubcategoryDto } from 'src/subcategories/dto/create-subcategory.dto';
import { SubcategoriesService } from './../subcategories/subcategories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryNotFoundException } from './exceptions/category-not-found.exception';
import { CategoryRepository } from './category.repository';
import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { PostgresErrorCode } from '../database/postgres-error-code.enum';
import { Subcategory } from 'src/subcategories/subcategory.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoryRepository)
        private readonly categoryRepository: CategoryRepository,
        private readonly subcategoryService: SubcategoriesService
    ) {}

    async getAllcategories(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async getCategoryById(id: number): Promise<Category> {
        const category =  await this.categoryRepository.findOne(id);
        if(category) {
            return category;
        }
        throw new CategoryNotFoundException(id);
    }

    async getSubcategories(categoryId: number): Promise<Subcategory[]> {
        return await this.subcategoryService.getSubcategoriesForCategory(categoryId);
    }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = this.categoryRepository.create(createCategoryDto);
        try{
            await category.save();
            return category;
        }catch(error) {
            if(error?.code === PostgresErrorCode.UniqueViolation){
                throw new BadRequestException('Category name is taken.');
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createSubcategory(id: number, createSubcategoryDto: CreateSubcategoryDto): Promise<Subcategory> {
         const category = await this.getCategoryById(id);
         return await this.subcategoryService.createSubcategory(id, createSubcategoryDto);
    }

    async createSubcategories(id: number, subcategories: CreateSubcategoryDto[]): Promise<Subcategory[]> {
        const category = await this.getCategoryById(id);
        return await this.subcategoryService.createSubcategories(category, subcategories);
    }

    async updateCategoryName(id: number, createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = await this.getCategoryById(id);
        category.name = createCategoryDto.name;
        await category.save();
        return category;
    }   

    async deleteCategory(id: number) {
        const deleted = await this.categoryRepository.delete({id});
        if(deleted.affected === 0){
            throw new CategoryNotFoundException(id);
        }
    }
}
