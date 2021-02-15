import { AuthCredentialsDto } from './../auth/dto/auth-credentials.dto';
import { CreateUserDto } from './../auth/dto/create-user.dto';
import { User } from './user.entity';
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PostgresErrorCode } from 'src/database/postgres-error-code.enum';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createUser(createUserDto: CreateUserDto):Promise<{email: string}> {
        const {password, email} = createUserDto;
        const user = this.create(createUserDto);
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        try{
            await user.save();
            return {email};
        }catch(error) {
            if(error?.code === PostgresErrorCode.UniqueViolation){
                throw new HttpException(`User with email: '${email}' is taken`, HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async authenticateUser(authCredentials: AuthCredentialsDto) {
        const {email, password} = authCredentials;
        const user = await this.findOne({email});
        if(user && await user.validatePassword(password)) {
            return user;
        }else{
            null;
        }
    }

    async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }
}