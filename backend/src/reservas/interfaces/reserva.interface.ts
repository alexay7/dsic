import { Types } from 'mongoose';

export interface Reserva {
  userId: Types.ObjectId;
  vehicleId: Types.ObjectId;
  city: string;
  address: string;
  days: number;
  price: number;
  startDate: Date;
}
