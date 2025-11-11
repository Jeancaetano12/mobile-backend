import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
    import { Reflector } from '@nestjs/core';
    import { Role } from '@prisma/client';
    import { ROLES_KEY } from '../decorator/roles.decorator';

    @Injectable()
    export class RolesGuard implements CanActivate {
      constructor(private reflector: Reflector) {}

      canActivate(context: ExecutionContext): boolean {
        // 1. Ler o "adesivo" @Roles da rota
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
          ROLES_KEY,
          [context.getHandler(), context.getClass()],
        );

        // Se a rota não tiver o "adesivo" @Roles,
        if (!requiredRoles) {
          return true;
        }

        // 2. Pegar o usuário da requisição
        // (Isso SÓ funciona porque o AuthGuard/JwtStrategy já rodou ANTES
        // e colocou o usuário no 'req')
        const { user } = context.switchToHttp().getRequest();

        // 3. Comparar o cargo do usuário com os cargos exigidos
        return requiredRoles.some((role) => user.role === role);
      }
    }