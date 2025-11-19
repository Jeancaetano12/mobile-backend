import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
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
  ) {
    console.log('Indicador recebido no controller:', dto);
    return this.patientService.addIndicator(patientCpf, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':cpf')
  findAllIndicators(@Param('cpf') cpf: string) {
    console.log('CPF recebido na rota:', cpf);
    return this.patientService.findAllIndicators(cpf);
  }

}