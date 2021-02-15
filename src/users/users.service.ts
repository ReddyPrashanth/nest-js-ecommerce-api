import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { AddressRepository } from './adress.repository';
import { AuthCredentialsDto } from './../auth/dto/auth-credentials.dto';
import { CreateUserDto } from './../auth/dto/create-user.dto';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './address.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        @InjectRepository(AddressRepository)
        private addressRepository: AddressRepository
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<{email:string}> {
        const user = await this.userRepository.createUser(createUserDto);
        return user;
    }

    async authenticateUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const authenticatedUser = await this.userRepository.authenticateUser(authCredentialsDto);
        if(authenticatedUser){
            return authenticatedUser;
        }
        throw new UnauthorizedException('Incorrect user credentials');
    }

    async getById(userId: number) {
        const user = await this.userRepository.findOne(userId);
        if(user){
            return user;
        }
        throw new UserNotFoundException(userId);
    }

    async saveAddress(createAddressDto: CreateAddressDto, user: User): Promise<Address> {
        return this.addressRepository.saveAddress(createAddressDto, user.id);
    }
}
