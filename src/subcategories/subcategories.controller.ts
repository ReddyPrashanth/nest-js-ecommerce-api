import { ProductPaginationParamsDto } from './../products/dto/product-pagination-params.dto';
import { CreateProductsDto } from './../products/dto/create-products.dto';
import { CreateProductDto } from './../products/dto/create-product.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Body, Controller, Get, Param, Patch, ParseIntPipe, Delete, HttpCode, UseGuards, Post, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { SubcategoriesService } from './subcategories.service';

@Controller('subcategories')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class SubcategoriesController {
    constructor(
        private readonly subcategoryService: SubcategoriesService
    ) {}
    
    @Get('')
    async getAllSubcategories() {
        return await this.subcategoryService.getAllSubcategories(); 
    }

    @Get('/:id/products')
    async getProducts(@Param('id', ParseIntPipe) id: number, @Query() params: ProductPaginationParamsDto) {
        const [products, count] = await this.subcategoryService.getProducts(id, params);
        return {
            data: products,
            limit: params.limit,
            count
        };
    }   

    @Get('/:id')
    async getSubcategoryById(@Param('id', ParseIntPipe) id: number) {
        return await this.subcategoryService.getSubcategoryById(id);
    }

    @Post('/:id/product')
    async createProduct(@Param('id', ParseIntPipe) id: number, @Body() createProductDto: CreateProductDto) {
        return await this.subcategoryService.createProduct(id, createProductDto);
    }

    @Post('/:id/products')
    async createProductsForSubcategory(@Param('id', ParseIntPipe) id: number, @Body() productsDto: CreateProductsDto) {
        return await this.subcategoryService.createProducts(id, productsDto.products);
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
