import { Controller, Get } from '@nestjs/common';
import { EntrepriseService } from './entreprise.service';

@Controller('entreprise')
export class EntrepriseController {
  constructor(private readonly entrepriseService: EntrepriseService) { }

  // GET /api/entreprise/equipe
  @Get('equipe')
  getEquipe() {
    return this.entrepriseService.getEquipe();
  }

  // GET /api/entreprise/vehicules
  @Get('vehicules')
  getVehicules() {
    return this.entrepriseService.getVehicules();
  }

  // GET /api/entreprise/trajets
  @Get('trajets')
  getTrajets() {
    return this.entrepriseService.getTrajets();
  }

  // GET /api/entreprise/contrats
  @Get('contrats')
  getContrats() {
    return this.entrepriseService.getContrats();
  }

  // GET /api/entreprise/historique
  @Get('historique')
  getHistorique() {
    return this.entrepriseService.getHistorique();
  }

  // GET /api/entreprise/notifications
  @Get('notifications')
  getNotifications() {
    return this.entrepriseService.getNotifications();
  }
}