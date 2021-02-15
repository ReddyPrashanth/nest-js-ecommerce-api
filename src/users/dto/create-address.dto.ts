import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateAddressDto {
    @IsString()
    @MaxLength(100)
    address1: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    address2: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(90)
    city: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    state: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    country: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(12)
    zipCode: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    phone: string;
}