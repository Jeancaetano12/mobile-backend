import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'
import PDFDocument from 'pdfkit'; 

@Injectable()
export class ReportsService {
    constructor(private readonly prisma: PrismaService) {}

    async generateGeneralReport(): Promise<Buffer> {

        const totalFamilias = await this.prisma.family.count()

        const totalPacientes = await this.prisma.patient.count()

        // Agrupar familias por bairro
        const familiasPorBairro = await this.prisma.family.groupBy({
            by:['bairro'],
            _count: {
                id: true,
            },
            orderBy: {
                _count: {
                    id: 'desc'
                },
            },
        });

        // Agrupar quem registrou mais (TOP 5)
        const topAgentsRaw = await this.prisma.family.groupBy({
            by: ['criadoPorId'],
            _count: {
                id: true,
            },
            orderBy: {
                _count: {
                    id: 'desc',
                },
            },
            take: 5,
        });

        const topAgentes = await Promise.all(
            topAgentsRaw.map(async (item) => {
                const user = await this.prisma.user.findUnique({
                    where: { id: item.criadoPorId },
                });
                return {
                    nome: user ? user.primeiroNome : 'Desconhecido',
                    total: item._count.id,
                };
            }),
        );

        return new Promise((resolve) => {
            const doc = new PDFDocument();
            const buffers: Buffer[] = [];

            doc.on('data', (chunk) => buffers.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(buffers)));

            // Cabeçalho
            doc.fontSize(20).text('Relatório Geral de Gestão de Saúde', { align: 'center'});
            doc.moveDown();
            doc.fontSize(12).text(`Gerado em: ${new Date().toLocaleDateString()}`, { align: 'center'});
            doc.moveDown(2);

            // Linha separadora
            doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
            doc.moveDown(1)

            doc.fontSize(14).text('Resumo Geral');
            doc.moveDown(0.5);

            doc.fontSize(12).text(`Total de pacientes Cadastrados: ${totalPacientes}`);
            doc.text(`Total de famílias Atendidas: ${totalFamilias}`);
            
            // Linha separadora
            doc.moveDown(1);
            doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
            doc.moveDown(1)

            // Seção 1: Bairros
            doc.fontSize(16).text('Distribuição por Bairro');
            doc.moveDown(0.5);

            familiasPorBairro.forEach((item) => {
                doc.fontSize(12).text(`- ${item.bairro}: ${item._count.id} famílias`);
            });

            doc.moveDown(2);

            // Seção 2: Top Agentes
            doc.fontSize(16).text('Top Agentes (Quem mais cadastrou)');
            doc.moveDown(0.5);

            topAgentes.forEach((agente, index) => {
                doc.text(`${index + 1}. ${agente.nome}: ${agente.total} registros`);
            });

            doc.end();
        });
    }
}
