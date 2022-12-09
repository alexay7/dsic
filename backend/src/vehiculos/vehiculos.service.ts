import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { VehiculoSearch } from './interfaces/vehiculo-search.interface';
import { Vehiculo } from './interfaces/vehiculo.interface';
import { VehiculoDocument } from './schemas/vehiculo.schema';

@Injectable()
export class VehiculosService {
  constructor(
    @InjectModel('Vehiculo') private vehiculoModel: Model<VehiculoDocument>,
  ) {}

  async reserveVehicle(vehicleId: Types.ObjectId): Promise<boolean> {
    const result = await this.vehiculoModel.findByIdAndUpdate(
      { vehicleId, available: true },
      {
        available: false,
      },
    );
    return result.isModified();
  }

  async searchFilter(filter: VehiculoSearch): Promise<Vehiculo[]> {
    const query = this.vehiculoModel.find({});

    if (filter.type) {
      query.where({ type: filter.type });
    }

    if (filter.energy) {
      query.where({ energy: filter.energy });
    }

    if (filter.minPrice || filter.maxPrice) {
      query.where({
        price: { $gte: filter.minPrice, $lte: filter.maxPrice },
      });
    }

    return query;
  }
}
