import { HydratedDocument, Schema } from 'mongoose';
import { Reserva } from '../interfaces/reserva.interface';

export type ReservaDocument = HydratedDocument<Reserva>;

export const ReservasSchema = new Schema<Reserva>({
  userId: { type: 'ObjectId', ref: 'User', required: true },
  vehicleId: { type: 'ObjectId', ref: 'Vehicle', required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  days: { type: Number, required: true },
  price: { type: Number, required: true },
});
