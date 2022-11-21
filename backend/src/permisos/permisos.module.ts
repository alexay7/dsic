import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { PermisosController } from './permisos.controller';
import { PermisosService } from './permisos.service';
import { PermisosSchema } from './schemas/permiso.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Permiso', schema: PermisosSchema }]),
  ],
  controllers: [PermisosController],
  providers: [PermisosService],
})
export class PermisosModule {}
