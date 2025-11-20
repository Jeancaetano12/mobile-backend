import { ConflictException, Injectable, NotFoundException, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFamilyDto } from './dto/create-family.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class FamilyService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Cria uma nova família e seu primeiro paciente (paciente principal)
   * usando o "Nested Create" do Prisma.
   */
  async create(dto: CreateFamilyDto, userId: string) {
    // 1. Desestruturamos o DTO
    const { pacientes, ...dadosFamilia } = dto;

    try {
      const novaFamilia = await this.prisma.family.create({
        data: {
          criadoPor: { connect: { id: userId } },
          sobrenome: dadosFamilia.sobrenome,
          cep: dadosFamilia.cep,
          logradouro: dadosFamilia.logradouro,
          numero: dadosFamilia.numero,
          complemento: dadosFamilia.complemento || null,
          unidade: dadosFamilia.unidade || null,
          bairro: dadosFamilia.bairro,
          localidade: dadosFamilia.localidade,
          uf: dadosFamilia.uf,
          contatoTelefone: dadosFamilia.contatoTelefone || null,

          pacientes: {
            create: pacientes.map((pacientes) => ({
              cpf: pacientes.cpf,
              nomeCompleto: pacientes.nomeCompleto,
              dataNascimento: new Date(pacientes.dataNascimento),
              pacienteTelefone: pacientes.pacienteTelefone || null,
            })),
          },
        },
        include: {
          pacientes: true,
        },
      });

      return novaFamilia;
    } catch (error) {
      // 2. Verifique se o erro é um erro conhecido do Prisma
      if (error instanceof PrismaClientKnownRequestError) {
        // 3. Verifique se é o erro de 'constraint única' (P2002)
        if (error.code === 'P2002') {
          // 4. Verifique se o erro foi no campo 'cpf'
          // 'error.meta.target' nos diz qual campo falhou
          if (error.meta && Array.isArray(error.meta.target) && error.meta.target.includes('cpf')) {
            // 5. Retorne um erro 409 (Conflict) amigável
            throw new ConflictException(
              `Já existe um paciente cadastrado com o CPF informado.`,
            );
          }
        }
      }

      // 6. Se for qualquer outro erro, retorne o erro genérico
      console.error('Erro ao criar família:', error);
      throw new Error('Não foi possível criar a família.');
    }
  }

  async findAll(page:string, limit:string) {
    const pageNum = Math.max(1, Math.floor(Number(page)));
    const limitNum = Math.max(1, Math.floor(Number(limit)));

    const skip = (pageNum - 1) * limitNum;
    const take = limitNum;

    const families = await this.prisma.family.findMany({
      skip: skip,
      take: take,
      orderBy: {
        sobrenome: 'asc',
      },
      include: {
        pacientes: true,
      },
    });

    const totalFamilies = await this.prisma.family.count();

    return {
      data: families,
      total: totalFamilies,
      page: pageNum,
      totalPages: Math.ceil(totalFamilies / limitNum),
    };
  }

  async findOne(identifier: string) {
    // 1. Tenta encontrar por ID primeiro (é o mais rápido e comum)
    let family = await this.prisma.family.findUnique({
      where: { id: identifier },
      include: {
        pacientes: true,
      },
    });

    // 2. Se não encontrou por ID, tenta pelo Sobrenome
    if (!family) {
      family = await this.prisma.family.findFirst({ 
        where: { sobrenome: identifier }, 
        include: {
          pacientes: true,
        },
      });
    }

    // 3. Se não encontrou de NENHUMA forma, lança o erro
    if (!family) {
      throw new NotFoundException(`Família com ID ou Sobrenome "${identifier}" não encontrada.`);
    }

    return family;
  }

}