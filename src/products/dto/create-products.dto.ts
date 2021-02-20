import { CreateProductDto } from './create-product.dto';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

export class CreateProductsDto {
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateProductDto)
    products: CreateProductDto[];
}