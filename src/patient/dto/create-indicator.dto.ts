import {
      IsInt,
      IsNumber,
      IsOptional,
      IsString,
      Min,
    } from 'class-validator';

    export class CreateIndicatorDto {
      @IsNumber({}, { message: 'O peso deve ser um número.' })
      @Min(0, { message: 'O peso não pode ser negativo.' })
      @IsOptional()
      pesoKg?: number; // No schema é Float, no DTO usamos 'number'

      @IsString({ message: 'A pressão arterial deve ser um texto (ex: "120/80").' })
      @IsOptional()
      pressaoArterial?: string;

      @IsInt({ message: 'A glicemia deve ser um número inteiro (ex: 99).' })
      @Min(0, { message: 'A glicemia não pode ser negativa.' })
      @IsOptional()
      glicemiaMgDl?: number; // No schema é Int, no DTO usamos 'number'

      @IsNumber({}, { message: 'A altura deve ser um número (ex: 1.75).' })
      @Min(0, { message: 'A altura não pode ser negativa.' })
      @IsOptional()
      alturaM?: number; // No schema é Float, no DTO usamos 'number'
    }