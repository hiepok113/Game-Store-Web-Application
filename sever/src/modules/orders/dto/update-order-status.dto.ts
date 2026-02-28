import { IsString, IsEnum } from 'class-validator';

export class UpdateOrderStatusDto {
  @IsString()
  @IsEnum(['pending', 'paid', 'failed'])
  status: string;
}
