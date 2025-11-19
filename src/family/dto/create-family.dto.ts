import {
  IsDefined,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsArray,
  IsString,
  ValidateNested,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFamilyPatientDto } from './create-family-patient.dto';

export class CreateFamilyDto {
  @IsString({ message: 'O sobrenome deve ser um texto.' })
  @IsNotEmpty({ message: 'O sobrenome é obrigatório.' })
  sobrenome: string;

  @IsString({ message: 'O endereço deve ser um texto.' })
  @IsNotEmpty({ message: 'O endereço é obrigatório.' })
  endereco: string;

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