import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
    constructor(
        private readonly categoryService: CategoriesService
    ) {}

    @Get('')
    async getAllCategories() {
        return await this.categoryService.getAllcategories();
    }

    @Get('/:id')
    async getCategoryById(@Param('id', ParseIntPipe) id: number) {
        return await this.categoryService.getCategoryById(id);
    }

    @Post('')
    async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoryService.createCategory(createCategoryDto);
    }

    @Patch('/:id/name')
    async updateCategoryName(@Param('id', ParseIntPipe)id: number,@Body() createCategoryDto: CreateCategoryDto) {

    }

    @Delete('/:id')
    @HttpCode(204)
    async deleteCategory(@Param('id', ParseIntPipe) id: number) {
        await this.categoryService.deleteCategory(id);
    }
}
