import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
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

  // PATCH /api/demandes/:id/statut
  @Patch(':id/statut')
  updateStatut(@Param('id') id: string, @Body() body: { statut: string }) {
    return this.demandesService.updateStatut(Number(id), body.statut);
  }
}