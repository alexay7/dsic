import { HydratedDocument, Schema } from 'mongoose';
import { Tarjeta } from '../interfaces/tarjeta.interface';

export type TarjetaDocument = HydratedDocument<Tarjeta>;

export const TarjetasSchema = new Schema<Tarjeta>({
  userId: { type: 'ObjectId', ref: 'User', required: true },
  cardNumber: { type: String, required: true },
  cvc: { type: String, required: true },
  expirationDate: { type: String, required: true },
});
