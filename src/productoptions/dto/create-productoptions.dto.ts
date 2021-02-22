import { CreateProductoptionDto } from './create-productoption.dto';
import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";

export class CreateProductoptionsDto {
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateProductoptionDto)
    productoptions: CreateProductoptionDto[]  
}