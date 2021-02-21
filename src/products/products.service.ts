import { CreateProductDto } from './dto/create-product.dto';
import { ProductPaginationParamsDto } from './dto/product-pagination-params.dto';
import { Subcategory } from 'src/subcategories/subcategory.entity';
import { ProductNotFoundException } from './exceptions/product-not-found.exception';
import { ProductRepository } from './product.repository';
import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { PostgresErrorCode } from '../database/postgres-error-code.enum';
import { getUniqueViolationKey } from '../app.helper';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductRepository)
        private readonly productRepository: ProductRepository
    ) {}

    async getProducts(params: ProductPaginationParamsDto, subcategoryId?: number): Promise<[Product[], number]> {
        return await this.productRepository.getProducts(params, subcategoryId);
    }

    async getProductById(id: number): Promise<Product> {
        const product = await this.productRepository.findOne(id);
        if(product) {
            return product;
        }
        throw new ProductNotFoundException(id);
    }

    async createProduct(subcategory: Subcategory, createProductDto: CreateProductDto): Promise<Product> {
        const product = this.productRepository.create(createProductDto);
        product.subcategoryId = subcategory.id;
        try{
            await product.save();
            return product;
        }catch(error) {
            if(error?.code === PostgresErrorCode.UniqueViolation){
                throw new BadRequestException('Product name is taken.');
            }
            throw new HttpException('Something went wrong.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createProducts(subcategory: Subcategory, productsDto: CreateProductDto[]): Promise<Product[]> {
        const products = this.productRepository.create(productsDto)
                                               .map(product => {
                                                   product.subcategoryId = subcategory.id;
                                                   return product;
                                               });
        try{
            await this.productRepository.save(products);
            return products;
        }catch(error) {
            if(error?.code === PostgresErrorCode.UniqueViolation){
                const value = getUniqueViolationKey(error?.detail as string);
                throw new BadRequestException(`Product ${value} is taken.`)
            }
            throw new HttpException('Something went wrong.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateProduct(id: number, updateProductDto: CreateProductDto): Promise<Product> {
        const product = await this.getProductById(id);
        return this.productRepository.updateProduct(product, updateProductDto); 
    }

    async deleteProduct(id: number) {
        const deleted = await this.productRepository.delete({id});
        if(deleted.affected === 0){
            throw new ProductNotFoundException(id);
        }
    }
}
