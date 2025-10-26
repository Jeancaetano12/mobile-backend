import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt'; // A "lógica" da estratégia
import { PrismaService } from 'src/prisma/prisma.service'; // Para buscar o usuário

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        config: ConfigService, // Para pegar a JWT_SECRET
        private prisma:PrismaService, // Para buscar o usuário no banco
    ) {
        const secret = config.get<string>('JWT_SECRET');
        if (!secret) {
            throw new Error('JWT_SECRET não esta definida nas variaveis de ambiente, aplicação incapaz de iniciar.');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret,
        });
    }
    // Payload é o token decodificado
    async validate(payload: { sub: string; email: string }) {
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
        });

        if (!user) {
            throw new UnauthorizedException('Usuário não encontrado');
        }

        // Por segurança, deleta a senha antes de retornar o user
        const { senha, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}