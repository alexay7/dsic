import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ReservasModule } from './reservas/reservas.module';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { TarjetasModule } from './tarjetas/tarjetas.module';
import { PermisosModule } from './permisos/permisos.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/DSIC'),
    AuthModule,
    UsersModule,
    ReservasModule,
    VehiculosModule,
    TarjetasModule,
    PermisosModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
