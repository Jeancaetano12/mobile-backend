import {
  Body,
  Controller,
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


  // 2. Protegemos a rota (apenas usuários logados)
  @UseGuards(AuthGuard('jwt'))
  // 3. Definimos a rota, capturando o 'patientId' da URL
  @Post(':patientId/indicators')
  addIndicator(
    // 4. Pegamos o 'patientId' da URL
    @Param('patientId') patientId: string,
    @Body() dto: CreateIndicatorDto,
  ) {
    //    Chamamos o serviço para fazer o trabalho.
    return this.patientService.addIndicator(patientId, dto);
  }
}