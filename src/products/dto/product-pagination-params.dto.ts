import { Type } from 'class-transformer';
import { IsOptional, IsNumber, Min, IsNotEmpty } from 'class-validator';

export class ProductPaginationParamsDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    startId: number = 0;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(10)
    limit: number = 10;

    @IsOptional()
    @IsNotEmpty()
    search?: string;
}