import { CreateReservaDto } from './dto/create-reserva.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { ReservasService } from './reservas.service';
import { Reserva } from './interfaces/reserva.interface';

@Controller('reservas')
export class ReservasController {
  constructor(
    private authService: AuthService,
    private reservasService: ReservasService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async crearReserva(@Req() req, @Body() body: CreateReservaDto) {
    const newReserva: Reserva = {
      userId: req.user._id,
      ...body,
    };
    console.log(newReserva);
  }
}
