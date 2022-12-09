import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reserva } from './interfaces/reserva.interface';
import { ReservaDocument } from './schemas/reserva.schema';

@Injectable()
export class ReservasService {
  constructor(
    @InjectModel('Reserva') private reservaModel: Model<ReservaDocument>,
  ) {}

  async createReserva(newReserva: Reserva): Promise<Reserva> {
    return this.reservaModel.create(newReserva);
  }

  async getReservasByUser(userId: Types.ObjectId): Promise<Reserva[]> {
    return await this.reservaModel
      .aggregate()
      .match({ userId: new Types.ObjectId(userId.toString()) })
      .lookup({
        from: 'vehiculos',
        foreignField: '_id',
        localField: 'vehicleId',
        as: 'vehicle',
      })
      .unwind({ path: '$vehicle' });
  }

  async deleteReserva(reservaId: Types.ObjectId): Promise<void> {
    return this.reservaModel.findByIdAndDelete(reservaId);
  }
}
