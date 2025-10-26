import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'Forneça um email válido.' })
    @IsNotEmpty({ message: 'O campo email é obrigatório.' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'O campo senha é obrigatório.' })
    senha: string;

}