import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateOptionDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    shortname: string;
}