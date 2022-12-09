import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { VehiculosController } from './vehiculos.controller';
import { VehiculosService } from './vehiculos.service';
import { VehiculosSchema } from './schemas/vehiculo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vehiculo', schema: VehiculosSchema }]),
  ],
  controllers: [VehiculosController],
  providers: [VehiculosService],
  exports: [VehiculosService],
})
export class VehiculosModule {}
