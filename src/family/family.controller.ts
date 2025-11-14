import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateFamilyDto } from './dto/create-family.dto';
import { FamilyService } from './family.service';

@Controller('family') // Rota base: /family
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  // 1. Protegemos a rota. Apenas usuários logados podem criar famílias.
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createFamily(@Body() dto: CreateFamilyDto) {
    // 2. O ValidationPipe (global) já validou o DTO,
    // incluindo o 'pacientePrincipal' aninhado.

    // 3. Chamamos o serviço para fazer a mágica do banco de dados
    console.log('Requisição de criar familia recebida')
    return this.familyService.create(dto);
  }
}