import { AuthModule } from './../auth/auth.module';
import { AddressRepository } from './adress.repository';
import { UserRepository } from './user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, AddressRepository])
    ],
    providers: [UsersService],
    exports: [UsersService],
    controllers: [UsersController]
})
export class UsersModule {}
