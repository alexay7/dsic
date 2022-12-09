import { CreateReservaDto } from './dto/create-reserva.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { Reserva } from './interfaces/reserva.interface';
import { VehiculosService } from 'src/vehiculos/vehiculos.service';

@Controller('reservas')
export class ReservasController {
  constructor(
    private reservasService: ReservasService,
    private vehiculosService: VehiculosService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async crearReserva(@Req() req, @Body() body: CreateReservaDto) {
    const newReserva: Reserva = {
      startDate: new Date(),
      userId: req.user._id,
      ...body,
    };
    const available = await this.vehiculosService.reserveVehicle(
      body.vehicleId,
    );
    if (available) {
      const result = await this.reservasService.createReserva(newReserva);
      return result;
    }
    throw new BadRequestException();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserReservas(@Req() req) {
    return this.reservasService.getReservasByUser(req.user._id);
  }
}
