import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFamilyDto } from './dto/create-family.dto';

@Injectable()
export class FamilyService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Cria uma nova família e seu primeiro paciente (paciente principal)
   * usando o "Nested Create" do Prisma.
   */
  async create(dto: CreateFamilyDto) {
    // 1. Desestruturamos o DTO
    const { pacientePrincipal, ...dadosFamilia } = dto;

    // 2. Usamos o "Nested Create"
    // O Prisma gerencia a transação automaticamente.
    try {
      const novaFamilia = await this.prisma.family.create({
        data: {
          // 3. Dados da Família (nível superior)
          sobrenome: dadosFamilia.sobrenome,
          endereco: dadosFamilia.endereco,
          contatoTelefone: dadosFamilia.contatoTelefone,

          // 4. Dados do Paciente (aninhados)
          // Como 'pacientes' é um relacionamento em 'Family',
          // podemos usar 'create' para criar um paciente JUNTO
          pacientes: {
            create: [
              // O 'create' espera uma lista
              {
                nomeCompleto: pacientePrincipal.nomeCompleto,
                // Convertemos o string (YYYY-MM-DD) do DTO para um objeto Date
                dataNascimento: new Date(pacientePrincipal.dataNascimento),
                // O Prisma cuida automaticamente de associar o 'familiaId'
                pacienteTelefone: pacientePrincipal.pacienteTelefone || null,
              },
            ],
          },
        },
        // 5. Incluímos o paciente criado na resposta
        include: {
          pacientes: true,
        },
      });

      return novaFamilia;
    } catch (error) {
      // Lidar com erros (ex: falha de validação do banco)
      console.error('Erro ao criar família:', error);
      throw new Error('Não foi possível criar a família.');
    }
  }
}