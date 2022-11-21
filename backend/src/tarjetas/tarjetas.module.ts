import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { TarjetasSchema } from './schemas/tarjeta.schema';
import { TarjetasController } from './tarjetas.controller';
import { TarjetasService } from './tarjetas.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Tarjeta', schema: TarjetasSchema }]),
  ],
  controllers: [TarjetasController],
  providers: [TarjetasService],
})
export class TarjetasModule {}
