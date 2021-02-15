import { IsEmail, IsString, MaxLength, MinLength, Matches } from "class-validator";

export class AuthCredentialsDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(7)
    @MaxLength(20)
    password: string
}