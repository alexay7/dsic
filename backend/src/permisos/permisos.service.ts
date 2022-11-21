import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PermisoDocument } from './schemas/permiso.schema';

@Injectable()
export class PermisosService {
  constructor(
    @InjectModel('Permiso') private permisoModel: Model<PermisoDocument>,
  ) {}
}
