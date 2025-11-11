import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty({ message: 'O campo nome não pode estar vazio.' })
    primeiroNome: string;

    @IsString()
    @IsNotEmpty({ message: 'O campo sobrenome não pode estar vazio' })
    sobrenome: string;

    @IsEmail({}, { message: 'Forneça um email válido.' })
    @IsNotEmpty({ message: 'Email inválido.' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'A sua senha deve ter pelo menos 6 caracteres.' })
    @IsNotEmpty({ message: 'Senha inválida.' })
    senha: string;
    
}