import {
  IsDefined,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsArray,
  IsString,
  ValidateNested,
  Matches,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFamilyPatientDto } from './create-family-patient.dto';

export class CreateFamilyDto {
  @IsString({ message: 'O sobrenome deve ser um texto.' })
  @IsNotEmpty({ message: 'O sobrenome é obrigatório.' })
  sobrenome: string;

  @IsString()
  @IsNotEmpty({ message: 'O CEP é obrigatório.' })
  // Aceita "60831-685" ou "60831685"
  @Matches(/^(\d{8}|\d{5}-\d{3})$/, { message: 'CEP inválido.' })
  cep: string;

  @IsString()
  @IsNotEmpty({ message: 'O logradouro é obrigatório.' })
  logradouro: string;

  @IsString()
  @IsNotEmpty({ message: 'O número é obrigatório.' })
  numero: string;

  @IsString()
  @IsOptional()
  complemento?: string;

  @IsString()
  @IsOptional()
  unidade?: string;

  @IsString()
  @IsNotEmpty({ message: 'O bairro é obrigatório.' })
  bairro: string;

  @IsString()
  @IsNotEmpty({ message: 'A localidade (cidade) é obrigatória.' })
  localidade: string;

  @IsString()
  @Length(2, 2, { message: 'A UF deve ter 2 letras (ex: CE).' })
  @IsNotEmpty({ message: 'A UF é obrigatória.' })
  uf: string;

  @IsString({ message: 'O telefone deve ser um texto.' })
  @IsOptional() 
  @Matches(/^\d{10,11}$/, {
    message: 'O telefone deve conter apenas números e ter entre 10 ou 11 dígitos.'
  })
  contatoTelefone?: string;

  @IsDefined({ message: 'Os dados do paciente principal são obrigatórios.' })
  @IsArray({ message: 'Os pacientes devem ser enviados em uma lista (array).' })
  @ValidateNested({ each: true })
  @Type(() => CreateFamilyPatientDto)
  pacientes: CreateFamilyPatientDto[];
}