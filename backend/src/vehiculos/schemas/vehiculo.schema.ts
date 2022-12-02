import { HydratedDocument, Schema } from 'mongoose';
import { Vehiculo } from '../interfaces/vehiculo.interface';

export type VehiculoDocument = HydratedDocument<Vehiculo>;

export const VehiculosSchema = new Schema<Vehiculo>({
  type: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  location: String,
  imageUrl: String,
  price: Number,
  energy: String,
  available: { type: Boolean, default: true },
});
