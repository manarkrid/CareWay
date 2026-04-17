import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { DemandesService } from './demandes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('demandes')
@UseGuards(JwtAuthGuard)
export class DemandesController {
  constructor(private readonly demandesService: DemandesService) { }

  // GET /api/demandes
  @Get()
  getAll(@CurrentUser() user: any) {
    return this.demandesService.getAll(user.userId);
  }

  // GET /api/demandes/price-markers
  @Get('price-markers')
  getPriceMarkers() {
    return this.demandesService.getPriceMarkers();
  }

  // PATCH /api/demandes/:id/statut
  @Patch(':id/statut')
  updateStatut(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() body: { statut: string }
  ) {
    return this.demandesService.updateStatut(user.userId, Number(id), body.statut);
  }
}