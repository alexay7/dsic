import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateReservaDto {
  @IsNotEmpty()
  vehicleId: Types.ObjectId;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  days: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
