import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateOptionsetDto {
    @IsOptional()
    @IsNumber()
    id?: number;
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    name: string;
    
    @IsString()
    @IsNotEmpty()
    shortdescription: string
}