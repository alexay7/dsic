import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { PermisosService } from './permisos/permisos.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private permisosService: PermisosService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserData(@Request() req) {
    const permisos = await this.permisosService.getUserPermisos(req.user._id);
    req.user.licences = permisos;
    return req.user;
  }
}
