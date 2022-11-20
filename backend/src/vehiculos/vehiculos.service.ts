import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VehiculoDocument } from './schemas/vehiculo.schema';

@Injectable()
export class VehiculosService {
  constructor(
    @InjectModel('Vehiculo') private vehiculoModel: Model<VehiculoDocument>,
  ) {}
}
