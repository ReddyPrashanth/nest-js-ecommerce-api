import { UsersService } from './users.service';
import { User } from 'src/users/user.entity';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { GetUser } from './get-user.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Post("/address")
    async createAddress(@Body() createAddressDto: CreateAddressDto, @GetUser() user: User) {
        return await this.usersService.saveAddress(createAddressDto, user);
    }
}
