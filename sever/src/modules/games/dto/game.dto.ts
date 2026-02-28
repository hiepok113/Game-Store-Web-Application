import { PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsObject,
  IsArray,
} from 'class-validator';

class SystemRequirements {
  @IsArray()
  @IsString({ each: true })
  minimum: string[];

  @IsArray()
  @IsString({ each: true })
  recommended: string[];
}

export class CreateGameDto {
  @IsString()
  title: string;

  @IsNumber()
  @IsOptional()
  rating: number;

  @IsString()
  @IsOptional()
  feature: string;

  @IsString()
  category: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  aboutImage: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsObject()
  @IsOptional()
  systemRequirements: SystemRequirements;

  @IsString()
  @IsOptional()
  logo: string;

  @IsNumber()
  price: number;
}

export class UpdateGameDto extends PartialType(CreateGameDto) {}
