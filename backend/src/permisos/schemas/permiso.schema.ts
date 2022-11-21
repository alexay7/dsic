import { HydratedDocument, Schema } from 'mongoose';
import { Permiso } from '../interfaces/permiso.interface';

export type PermisoDocument = HydratedDocument<Permiso>;

export const PermisosSchema = new Schema<Permiso>({
  userId: { type: 'ObjectId', ref: 'User', required: true },
  type: { type: String, required: true },
  documentUrl: { type: String, required: true },
});
