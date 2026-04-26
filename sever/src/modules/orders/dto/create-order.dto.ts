import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsOptional()
  userId?: string;

  @IsArray()
  @IsString({ each: true })
  items: string[];

  @IsNumber()
  totalAmount: number;
}
