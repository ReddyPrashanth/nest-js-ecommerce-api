import { ConfigService } from '@nestjs/config';
import { User } from './../users/user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersService } from './../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './token-payload.interface';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}
    async signup(createUserDto: CreateUserDto): Promise<{email: string}> {
        return await this.usersService.createUser(createUserDto);
    }

    async signin(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return await this.usersService.authenticateUser(authCredentialsDto);
    }

    getCookieWithJwtToken(userId: number) {
        const payload: TokenPayload = {userId};
        const token = this.jwtService.sign(payload);
        const cookie = `Authentication=${token}; httpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
        return cookie;
    }

    getCookieForLogout() {
        return `Authentication=; Path=/; Max-Age=0`;
    }
}
