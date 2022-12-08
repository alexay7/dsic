import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PermisoDocument } from './schemas/permiso.schema';

@Injectable()
export class PermisosService {
  constructor(
    @InjectModel('Permiso') private permisoModel: Model<PermisoDocument>,
  ) {}

  async getUserPermisos(userId: Types.ObjectId): Promise<string[]> {
    const permisos = await this.permisoModel.find({ userId });
    return permisos.map((el) => el.type);
  }
}
