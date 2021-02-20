import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Put, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';

@Controller('products')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ) {}

    @Get('')
    async getProducts() {
        return await this.productsService.getProducts();
    }

    @Get("/:id")
    async getProductById(@Param('id', ParseIntPipe) id: number) {
        return await this.productsService.getProductById(id);
    }

    @Put('/:id')
    async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: CreateProductDto) {
        return await this.productsService.updateProduct(id, updateProductDto);
    }

    @Delete('/:id')
    @HttpCode(204)
    async deleteProduct(@Param('id', ParseIntPipe) id: number) {
        await this.productsService.deleteProduct(id);
    }
}
