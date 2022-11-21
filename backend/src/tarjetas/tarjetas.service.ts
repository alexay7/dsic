import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TarjetaDocument } from './schemas/tarjeta.schema';

@Injectable()
export class TarjetasService {
  constructor(
    @InjectModel('Tarjeta') private tarjetaModel: Model<TarjetaDocument>,
  ) {}
}
