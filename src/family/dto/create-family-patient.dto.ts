import { IsDateString, IsNotEmpty, IsString, IsOptional, Matches } from 'class-validator';

export class CreateFamilyPatientDto {
    @IsString({ message: 'O CPF deve ser um texto.' })
    @IsNotEmpty({ message: 'O CPF é obrigatório.' })
    @Matches(/^\d{11}$/, {
        message: 'O CPF deve conter exatamente 11 dígitos numéricos.'
    })
    cpf: string;

    @IsString({ message: 'O nome completo deve ser um texto.' })
    @IsNotEmpty({ message: 'O nome completo é obrigatório.' })
    nomeCompleto: string;

    @IsDateString({}, { message: 'A data de nascimento deve ser uma data válida (YYYY-MM-DD).' })
    @IsNotEmpty({ message: 'A data de nascimento é obrigatória.' })
    dataNascimento: string; // O formato YYYY-MM-DD é um DateString

    @IsString({ message: 'O telefone deve ser um texto' })
    @IsOptional()
    @Matches(/^\d{10,11}$/, {
        message: 'O telefone deve conter apenas números e ter entre 10 ou 11 dígitos.'
    })
    pacienteTelefone?: string;
}