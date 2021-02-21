import { CreateProductDto } from './dto/create-product.dto';
import { ProductPaginationParamsDto } from './dto/product-pagination-params.dto';
import { EntityRepository, Repository } from "typeorm";
import { Product } from "./product.entity";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

    async getProducts(params: ProductPaginationParamsDto, subcategoryId?: number): Promise<[Product[], number]> {
        const {startId, search, limit} = params;
        const query = this.createQueryBuilder('product');
        query.where('product.id > :productId', {productId: startId});
        
        if(subcategoryId){
            query.andWhere('product.subcategoryId = :subcategoryId', {subcategoryId});
        }
        
        if(search) {
            query.andWhere('product.name LIKE :search', {search: `%${search}%`});
        }
        
        const [products, count] = await query.limit(limit)
                                             .getManyAndCount();
        return [products, count];
    }

    async updateProduct(product: Product, updateProductDto: CreateProductDto): Promise<Product> {
        const {name, shortdescription, price, stock} = updateProductDto;
        product.name = name;
        product.shortdescription = shortdescription;
        product.price = price;
        product.stock = stock;
        await this.save(product);
        return product;
    }
}