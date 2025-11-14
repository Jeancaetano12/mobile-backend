import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';

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

        // Nome completo
        const nomeCompletoCalculado = `${dto.primeiroNome} ${dto.sobrenome}`;

        // Por fim, Registra o usuario
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                senha: hashSenha,  
                primeiroNome: dto.primeiroNome,
                nomeCompleto: nomeCompletoCalculado,
            },
        });
        // Retorna o token JWT
        return this.signToken(user.id, user.email);
    }

    async login(dto: LoginDto) {
        const userLogin = await this.prisma.user.findUnique({
            where: { email: dto.email },
        })

        if (!userLogin) {
            throw new ForbiddenException('Email não cadastrado.');
        } 

        const verificaSenha = await bcrypt.compare(dto.senha, userLogin.senha);

        if (!verificaSenha) {
            throw new ForbiddenException('Senha incorreta.');
        }
        
        return this.signToken(userLogin.id, userLogin.email);
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
            expiresIn: '30m',
            secret: secret,
        });

        return {
            access_token: token,
        };
    }
    
}
