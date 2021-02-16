import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateSubcategoryDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    name: string;
}