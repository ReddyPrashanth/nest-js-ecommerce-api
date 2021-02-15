import { UsersService } from './../users/users.service';
import { TokenPayload } from './token-payload.interface';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { User } from 'src/users/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private usersService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                return request?.cookies?.Authentication;
            }]),
            secretOrKey: configService.get('JWT_SECRET')
        })
    }

    async validate(payload: TokenPayload): Promise<User> {
        const {userId} = payload;
        const user = await this.usersService.getById(userId);
        return user;
    }
}