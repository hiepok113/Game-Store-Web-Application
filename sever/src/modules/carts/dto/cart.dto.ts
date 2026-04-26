import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCartDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsNotEmpty()
  gameId: string;
}
