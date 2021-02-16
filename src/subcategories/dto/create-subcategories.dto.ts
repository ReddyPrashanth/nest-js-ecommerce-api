import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateSubcategoryDto } from 'src/subcategories/dto/create-subcategory.dto';
export class CreateSubcategoriesDto {
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateSubcategoryDto)
    subcategories: CreateSubcategoryDto[]
}