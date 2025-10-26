import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private config: ConfigService,
    ) {}

    async register(dto:RegisterDto) {
        const userExists = await this.prisma.user.findUnique({
            where: { email:dto.email},
        })

        if (userExists) {
            throw new ForbiddenException('Email já cadastrado.');
        }

        // Criptografa a senha
        const salt = await bcrypt.genSalt(10);
        const hashSenha = await bcrypt.hash(dto.senha, salt);

        // Por fim, Registra o usuario
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                nomeCompleto: dto.nomeCompleto,
                senha: hashSenha,  
            },
        });
        // Retorna o token JWT
        return this.signToken(user.id, user.email);
    }

    async login() {

    }

    async signToken(
        userId: string,
        email: string,
    ): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email,
        };

        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: '4m',
            secret: secret,
        });

        return {
            access_token: token,
        };
    }
    
}
