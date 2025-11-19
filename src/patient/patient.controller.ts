import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateIndicatorDto } from './dto/create-indicator.dto';

@Controller('patients')
export class PatientController {
  // 1. Injetamos o PatientService
  constructor(private readonly patientService: PatientService) {}


  @UseGuards(AuthGuard('jwt'))
  @Post(':patientCpf/indicators')
  addIndicator(
    @Param('patientCpf') patientCpf: string,
    @Body() dto: CreateIndicatorDto,
    @Req() req,
  ) {
    const usuarioId = req.user.id;
    console.log('Criar indicadores no controller:', dto, 'por:', usuarioId);
    return this.patientService.addIndicator(patientCpf, dto, usuarioId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':cpf')
  findAllIndicators(@Param('cpf') cpf: string) {
    console.log('Busca por indicadores:', cpf);
    return this.patientService.findAllIndicators(cpf);
  }

}