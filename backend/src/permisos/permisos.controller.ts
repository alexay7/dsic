import { PermisosService } from './permisos.service';
import { Controller } from '@nestjs/common';
import { Body, Get, Post, Req, UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { Permiso } from './interfaces/permiso.interface';

@Controller('permisos')
export class PermisosController {
  constructor(private readonly PermisosService: PermisosService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getPermisos(@Req() req) {
    return this.PermisosService.getUserPermisos(req.user._id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Req() req, @Body() createPermisoDto: CreatePermisoDto) {
    const newPermiso: Permiso = {
      userId: req.user._id,
      ...createPermisoDto,
    };

    return this.PermisosService.createPermiso(newPermiso);
  }
}
