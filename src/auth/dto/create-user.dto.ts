import { UserGender } from './../../users/user.entity';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;
    
    @IsString()
    @MinLength(7)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {
            message: "Password too weak"
        }
    )
    password: string;

    @IsOptional()
    @IsEnum(UserGender, {
        message: "gender must be a valid value"
    })
    gender: UserGender;
}