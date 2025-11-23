import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express'; // Importante para manipular a resposta
import { ReportsService } from './reports.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from '@prisma/client';

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.ADMIN)
    @Get('general')
    async getReport(@Res() res: Response) {
        console.log('Relatorio geral requisitado.')
        const pdfBuffer = await this.reportsService.generateGeneralReport();

        // Configura os cabeçalhos para o navegador entender que é um PDF
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename=relatorio-geral.pdf', 
            'Content-Length': pdfBuffer.length,
        });
        console.log('Relatorio geral requisitado, enviando PDF')
        res.end(pdfBuffer);
    }
}
