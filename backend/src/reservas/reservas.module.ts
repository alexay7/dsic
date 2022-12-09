import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ReservasController } from './reservas.controller';
import { ReservasService } from './reservas.service';
import { ReservasSchema } from './schemas/reserva.schema';
import { AuthModule } from 'src/auth/auth.module';
import { VehiculosModule } from 'src/vehiculos/vehiculos.module';

@Module({
  imports: [
    AuthModule,
    VehiculosModule,
    MongooseModule.forFeature([{ name: 'Reserva', schema: ReservasSchema }]),
  ],
  controllers: [ReservasController],
  providers: [ReservasService],
})
export class ReservasModule {}
