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
    return this.reservaModel.find({ userId });
  }
}
