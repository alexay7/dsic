import { Types } from 'mongoose';

export interface Tarjeta {
  userId: Types.ObjectId;
  cardNumber: string;
  cvc: string;
  expirationDate: string;
}
