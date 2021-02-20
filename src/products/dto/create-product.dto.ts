import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(40)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    shortdescription: string;

    @IsNumber({maxDecimalPlaces: 2})
    price: number;

    @IsInt()
    stock: number;
}