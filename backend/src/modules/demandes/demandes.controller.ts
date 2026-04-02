import { Controller, Get } from '@nestjs/common';
import { DemandesService } from './demandes.service';

@Controller('demandes')
export class DemandesController {
  constructor(private readonly demandesService: DemandesService) { }

  // GET /api/demandes
  @Get()
  getAll() {
    return this.demandesService.getAll();
  }

  // GET /api/demandes/price-markers
  @Get('price-markers')
  getPriceMarkers() {
    return this.demandesService.getPriceMarkers();
  }
}