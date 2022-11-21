import { Types } from 'mongoose';

export interface Permiso {
  userId: Types.ObjectId;
  type: string;
  documentUrl: string;
}
