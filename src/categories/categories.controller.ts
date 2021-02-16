import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateSubcategoryDto } from 'src/subcategories/dto/create-subcategory.dto';
import { CreateSubcategoriesDto } from 'src/subcategories/dto/create-subcategories.dto';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
    constructor(
        private readonly categoryService: CategoriesService,
    ) {}

    @Get('')
    async getAllCategories() {
        return await this.categoryService.getAllcategories();
    }

    @Get('/:id')
    async getCategoryById(@Param('id', ParseIntPipe) id: number) {
        return await this.categoryService.getCategoryById(id);
    }

    @Get('/:id/subcategories')
    async getSubcategories(@Param('id', ParseIntPipe) id: number) {
        return await this.categoryService.getSubcategories(id);
    }

    @Post('')
    async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoryService.createCategory(createCategoryDto);
    }

    @Patch('/:id/name')
    async updateCategoryName(@Param('id', ParseIntPipe)id: number,@Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoryService.updateCategoryName(id, createCategoryDto);
    }

    @Post('/:id/subcategories')
    async createSubcategories(@Param('id', ParseIntPipe) id: number, @Body() createSubcategories: CreateSubcategoriesDto) {
        return await this.categoryService.createSubcategories(id, createSubcategories.subcategories);
    }

    @Post('/:id/subcategory')
    async createSubcategory(@Param('id', ParseIntPipe) id: number, @Body() createSubcategoryDto: CreateSubcategoryDto) {
        return await this.categoryService.createSubcategory(id, createSubcategoryDto);
    }

    @Delete('/:id')
    @HttpCode(204)
    async deleteCategory(@Param('id', ParseIntPipe) id: number) {
        await this.categoryService.deleteCategory(id);
    }
}
