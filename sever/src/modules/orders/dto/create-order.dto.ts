import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  userId: string;

  @IsArray()
  @IsString({ each: true })
  items: string[];

  @IsNumber()
  totalAmount: number;
}
