import { ProductPaginationParamsDto } from './dto/product-pagination-params.dto';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Test } from '@nestjs/testing';

const mockProduct = {id:1, name:'product 1', shortdescription: 'sample product', price: 99.99, stock: 10};

const mockProductsService = () => ({
    getProducts: jest.fn(),
    getProductById: jest.fn(),
    deleteProduct: jest.fn(),
    updateProduct: jest.fn()
});

describe('ProductsController', () => {
    let productsController: ProductsController;
    let productsService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [
                {provide: ProductsService, useFactory: mockProductsService}
            ]
        }).compile();
        productsService = moduleRef.get<ProductsService>(ProductsService);
        productsController = moduleRef.get<ProductsController>(ProductsController);
    });

    describe('getProducts', () => {
        it('retrives products from service', async () => {
            const filters: ProductPaginationParamsDto = {startId: 0, limit: 10}
            expect(productsService.getProducts).not.toBeCalled();
            const result = [['product 1'], 2];
            productsService.getProducts.mockResolvedValue(result);
            const response = await productsController.getProducts(filters);
            expect(response.data).toEqual(result[0]);
            expect(response.count).toEqual(2);
        });
    });

    describe('getProductById', () => {
        it('retrieves product by id', async () => {
            expect(productsService.getProductById).not.toBeCalled();
            productsService.getProductById.mockResolvedValue(mockProduct);
            const response = await productsController.getProductById(1);
            expect(response).toEqual(mockProduct);
        });
    });

    describe('updateProduct', () => {
        it('updates a product by id', async () => {
            const updateProductDto = {name: 'product update', shortdescription:'update product description', price: 100.00, stock: 6};
            const result = {id: 1, name: 'updated product'};
            expect(productsService.updateProduct).not.toBeCalled();
            productsService.updateProduct.mockResolvedValue(result);
            const response = await productsController.updateProduct(1, updateProductDto);
            expect(productsService.updateProduct).toHaveBeenCalledWith(1, updateProductDto);
            expect(response).toEqual(result);
        });
    });

    describe('deleteProduct', () => {
        it('deletes product by id', async () => {
            expect(productsService.deleteProduct).not.toBeCalled();
            productsService.deleteProduct.mockResolvedValue(null);
            await productsController.deleteProduct(1);
            expect(productsService.deleteProduct).toHaveBeenCalledWith(1);
        });
    });
});