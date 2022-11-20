import { HydratedDocument, Schema } from 'mongoose';
import { User } from '../interfaces/user.interface';

export type UserDocument = HydratedDocument<User>;

export const UsersSchema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
