import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Body, Controller, Get, Param, Patch, ParseIntPipe, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { SubcategoriesService } from './subcategories.service';

@Controller('subcategories')
@UseGuards(JwtAuthGuard)
export class SubcategoriesController {
    constructor(
        private readonly subcategoryService: SubcategoriesService
    ) {}
    
    @Get('')
    async getAllSubcategories() {
        return await this.subcategoryService.getAllSubcategories(); 
    }

    @Get('/:id')
    async getSubcategoryById(@Param('id', ParseIntPipe) id: number) {
        return await this.subcategoryService.getSubcategoryById(id);
    }

    @Patch('/:id')
    async updateSubcategoryName(@Param('id', ParseIntPipe) id: number,@Body() updateSubcategoryDto: CreateSubcategoryDto) {
        return await this.subcategoryService.updateSubcategoryName(id, updateSubcategoryDto);
    }

    @Delete('/:id')
    @HttpCode(204)
    async deleteSubcategory(@Param('id', ParseIntPipe) id: number) {
        await this.subcategoryService.deleteSubcategory(id);
    }
}
