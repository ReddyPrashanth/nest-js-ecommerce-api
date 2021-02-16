import { Category } from './../categories/category.entity';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { SubcategoryNotFoundException } from './exceptions/subcategory-not-found.exception';
import { SubcategoryRepository } from './subcategory.repository';
import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subcategory } from './subcategory.entity';
import { PostgresErrorCode } from 'src/database/postgres-error-code.enum';

@Injectable()
export class SubcategoriesService {
    constructor(
        @InjectRepository(SubcategoryRepository)
        private readonly subcategoryRepository: SubcategoryRepository
    ) {}
    
    async getAllSubcategories(): Promise<Subcategory[]> {
        return await this.subcategoryRepository.find();
    }

    async getSubcategoryById(id: number): Promise<Subcategory> {
        const subcategory = await this.subcategoryRepository.findOne(id);
        if(subcategory){
            return subcategory;
        }
        throw new SubcategoryNotFoundException(id);
    }

    async getSubcategoriesForCategory(categoryId: number): Promise<Subcategory[]> {
        return await this.subcategoryRepository.find({categoryId});
    }

    async createSubcategory(id: number, createSubcategoryDto:  CreateSubcategoryDto): Promise<Subcategory> {
        const subcategory = this.subcategoryRepository.create(createSubcategoryDto);
        subcategory.categoryId = id;
        try{
            await subcategory.save();
            return subcategory;
        }catch(error) {
            console.log(error);
            if(error?.code === PostgresErrorCode.UniqueViolation){
                throw new BadRequestException('Subcategory name is taken.')
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createSubcategories(category: Category, subcategoriesDto: CreateSubcategoryDto[]): Promise<Subcategory[]> {
        const subcategories = this.subcategoryRepository.create(subcategoriesDto)
                                  .map(subcategory => {
                                    subcategory.categoryId = category.id;
                                    return subcategory;
                                  });
        try{
            await this.subcategoryRepository.save(subcategories);
            return subcategories;
        }catch(error) {
            if(error?.code === PostgresErrorCode.UniqueViolation){
                const detail = error?.detail as string;
                const matched = detail.match(/\(([^)]+)\)/g);
                throw new BadRequestException(`Subcategory ${matched[1]} is taken.`);
            }
            throw new HttpException('Something went wrong.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

    async updateSubcategoryName(id: number, createSubcategoryDto: CreateSubcategoryDto): Promise<Subcategory> {
        const subcategory = await this.getSubcategoryById(id);
        subcategory.name = createSubcategoryDto.name;
        subcategory.save();
        return subcategory;
    }

    async deleteSubcategory(id: number) {
        const deleted = await this.subcategoryRepository.delete({id});
        if(deleted.affected === 0){
            throw new SubcategoryNotFoundException(id);
        }
    }
}
