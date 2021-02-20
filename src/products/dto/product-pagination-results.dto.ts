import { Transform } from 'class-transformer';
import { Product } from './../product.entity';

export class ProductPaginationResultsDto {
    data: Product[];

    limit: number;

    count: number;
}