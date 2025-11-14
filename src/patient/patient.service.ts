import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIndicatorDto } from './dto/create-indicator.dto';

@Injectable()
export class PatientService {
  // 1. Injetamos o PrismaService para falar com o banco
  constructor(private readonly prisma: PrismaService) {}

  async addIndicator(patientId: string, dto: CreateIndicatorDto) {
    // 2. Primeiro, verificamos se o paciente realmente existe
    const patient = await this.prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      throw new NotFoundException(`Paciente com ID "${patientId}" não encontrado.`);
    }

    // 3. Se o paciente existe, criamos o novo indicador
    const novoIndicador = await this.prisma.indicadorSaude.create({
      data: {
        ...dto,
        // Esta é a "mágica" que conecta o indicador ao paciente
        paciente: {
          connect: {
            id: patientId,
          },
        },
      },
    });

    return novoIndicador;
  }
}