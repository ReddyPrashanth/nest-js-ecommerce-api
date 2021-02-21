import { Subcategory } from './../subcategories/subcategory.entity';
import { ProductNotFoundException } from './exceptions/product-not-found.exception';
import { ProductRepository } from './product.repository';
import { ProductsService } from './products.service';
import { Test, TestingModule } from '@nestjs/testing';


const mockProduct = {id:1, name:'product 1', shortdescription: 'sample product', price: 99.99, stock: 10};

const mockProductRepository = () => ({
    getProducts: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
    updateProduct: jest.fn(),
});

describe("ProductsService", () => {
    let productsService: ProductsService;
    let productRepository;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsService,
                {provide: ProductRepository, useFactory: mockProductRepository}
            ],
        }).compile();
        productsService = await moduleRef.get<ProductsService>(ProductsService);
        productRepository = await moduleRef.get<ProductRepository>(ProductRepository);
    });

    describe('getProducts', () => {
        it('get all products from the repository', async () => {
            expect(productRepository.getProducts).not.toBeCalled();
            const params = {startId: 0, limit: 10};
            productRepository.getProducts.mockResolvedValue([[mockProduct],1]);
            const response = await productsService.getProducts(params, 1);
            expect(productRepository.getProducts).toBeCalled();
            expect(productRepository.getProducts).toHaveBeenCalledWith(params, 1);
            expect(response).toEqual([[mockProduct], 1]);
        });
    });

    describe('getProductById', () => {
        it('get product by id from repository', async () => {
            expect(productRepository.findOne).not.toBeCalled();
            productRepository.findOne.mockResolvedValue(mockProduct);
            const result = await productsService.getProductById(mockProduct.id);
            expect(productRepository.findOne).toHaveBeenCalledWith(mockProduct.id);
            expect(result).toEqual(mockProduct);
        });

        it('throws ProductNotFoundException', async () => {
            productRepository.findOne.mockResolvedValue(null);
            expect(productsService.getProductById(mockProduct.id)).rejects.toThrow(ProductNotFoundException);
        });
    });

    describe('deleteproduct', () => {
        it('deletes a product by id', async () => {
            expect(productRepository.delete).not.toBeCalled();
            productRepository.delete.mockResolvedValue({affected: 1});
            await productsService.deleteProduct(mockProduct.id);
            expect(productRepository.delete).toHaveBeenCalledWith({id: mockProduct.id});
        });

        it('throws productNotFoundException', async () => {
            productRepository.delete.mockResolvedValue({affected: 0});
            expect(productsService.deleteProduct(mockProduct.id)).rejects.toThrow(ProductNotFoundException);
        });
    });

    describe('updateProduct', () => {
        const productUpdateDto = {name: 'test product', shortdescription: 'test description', price: 99.99, stock: 10};
        it('throws ProductNotFoundException', async () => {
            try{
                await productsService.updateProduct(1, productUpdateDto);
            }catch(error){
                expect(error).toBeInstanceOf(ProductNotFoundException);
                expect(error.message).toEqual(`Product wih id '${1}' not found.`)
            } 
        });

        it('updates product', async () => {
            expect(productRepository.updateProduct).not.toBeCalled();
            productRepository.findOne.mockResolvedValue(mockProduct);
            productRepository.updateProduct.mockResolvedValue(mockProduct);
            const result = await productsService.updateProduct(mockProduct.id, productUpdateDto);
            expect(productRepository.updateProduct).toHaveBeenCalled();
            expect(result).toEqual(mockProduct);
        });
    });
}); 