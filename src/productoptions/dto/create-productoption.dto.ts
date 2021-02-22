import { Type } from 'class-transformer';
import { IsArray, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { CreateOptionDto } from './create-option.dto';
import { CreateOptionsetDto } from './create-optionset.dto';
export class CreateProductoptionDto {
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateOptionsetDto)
    optionset: CreateOptionsetDto;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateOptionDto)
    options: CreateOptionDto[];
}