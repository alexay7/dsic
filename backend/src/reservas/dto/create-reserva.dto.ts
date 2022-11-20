import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateReservaDto {
  @IsNotEmpty()
  vehicleId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  days: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
