import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIndicatorDto } from './dto/create-indicator.dto';

@Injectable()
export class PatientService {
  // 1. Injetamos o PrismaService para falar com o banco
  constructor(private readonly prisma: PrismaService) {}

  async addIndicator(patientCpf: string, dto: CreateIndicatorDto) {
    // 2. Primeiro, verificamos se o paciente realmente existe
    const patient = await this.prisma.patient.findUnique({
      where: { cpf: patientCpf },
    });

    if (!patient) {
      throw new NotFoundException(`Paciente com ID "${patientCpf}" não encontrado.`);
    }

    // 3. Se o paciente existe, criamos o novo indicador
    const novoIndicador = await this.prisma.indicadorSaude.create({
      data: {
        ...dto,
        // Esta é a "mágica" que conecta o indicador ao paciente
        paciente: {
          connect: {
            cpf: patientCpf,
          },
        },
      },
    });

    return novoIndicador;
  }

  async findAllIndicators(patientCpf: string) {
    // Verificamos se o paciente existe
    const patient = await this.prisma.patient.findUnique({
      where: { cpf: patientCpf },
    });

    if (!patient) {
      throw new NotFoundException(`Paciente com CPF "${patientCpf}" não encontrado.`);
    }

    // Se o paciente existe, buscamos todos os indicadores relacionados a ele
    const indicadores = await this.prisma.indicadorSaude.findMany({
      where: {
        pacienteCpf: patientCpf,
      },
      orderBy: {
        dataRegistro: 'desc',
      }
    });
    if (indicadores.length === 0) {
      return []; // Retorna um array vazio se nenhum indicador for encontrado
    }
    return indicadores;
  }
}