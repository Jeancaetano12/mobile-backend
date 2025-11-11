import { Body, Controller, Post, HttpCode, HttpStatus, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './decorator/roles.decorator';
import { RolesGuard } from './guard/roles.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() dto: RegisterDto) {
        console.log('Requisicao de registro recebida');
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        console.log('Requisicao de login recebida');
        return this.authService.login(dto);
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Req() req) {
        return req.user;
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('ADMIN')
    @Get('admin-test')
    adminTest(@Req() req) {
        return {
            message: 'Acesso concedido apenas para ADMINs!',
            user: req.user,
        };
    }
}
