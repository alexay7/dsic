import { Controller, Get } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { VehiculoSearch } from './interfaces/vehiculo-search.interface';
import { VehiculosService } from './vehiculos.service';

@Controller('vehiculos')
export class VehiculosController {
  constructor(private vehiculosService: VehiculosService) {}

  @Get()
  async getCars(
    @Query('type') type,
    @Query('energy') energy,
    @Query('min') minPrice,
    @Query('max') maxPrice,
  ) {
    const searchQuery: VehiculoSearch = {
      type,
      energy,
      minPrice: parseInt(minPrice),
      maxPrice: parseInt(maxPrice),
    };

    return this.vehiculosService.searchFilter(searchQuery);
  }
}
