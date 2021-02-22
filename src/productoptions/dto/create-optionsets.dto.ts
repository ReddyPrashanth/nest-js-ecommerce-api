import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateOptionsetDto } from './create-optionset.dto';

export class CreateOptionsetsDto {
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateOptionsetDto)
    optionsets: CreateOptionsetDto[];
}