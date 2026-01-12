import { Controller, Get } from '@nestjs/common';
import { DemandesService } from './demandes.service';

@Controller('demandes')
export class DemandesController {
  constructor(private readonly demandesService: DemandesService) {}

  @Get()
  async getDemandes() {
    return this.demandesService.getDemandes();
  }
}