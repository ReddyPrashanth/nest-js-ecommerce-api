import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateOptionDto } from './create-option.dto';
export class CreateOptionsDto {
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateOptionDto)
    options: CreateOptionDto[]
}