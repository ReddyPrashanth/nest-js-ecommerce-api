import { RequestWithUser } from './request-with-user.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signup(createUserDto);
    }
    
    @Post('/signin')
    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    async signin(@Request() request: RequestWithUser) {
        const user = request.user;
        const cookie = this.authService.getCookieWithJwtToken(user.id);
        request.res.setHeader('Set-Cookie', cookie);
        return user;
    }

    @Post('/logout')
    @HttpCode(200)
    async logout(@Request() request: RequestWithUser) {
        request.res.setHeader('Set-Cookie', this.authService.getCookieForLogout());
    }

    @Get('')
    @UseGuards(JwtAuthGuard)
    async authenticate(@Request() request: RequestWithUser) {
        return request.user;
    }
}
