import { Body, Controller, Post, UseGuards, Get, Query, Param } from '@nestjs/common';
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

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Query('page') page: string = '1', @Query('limit') limit: string = '10') {
    return this.familyService.findAll(page, limit);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get(':identifier')
  findOne(@Param('identifier') identifier: string) {
    return this.familyService.findOne(identifier);
  }
  
}