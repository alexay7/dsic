import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTarjetaDto {
  @IsNotEmpty()
  @IsString()
  cardNumber: string;

  @IsNotEmpty()
  @IsString()
  cvc: string;

  @IsNotEmpty()
  @IsString()
  expirationDate: string;
}
