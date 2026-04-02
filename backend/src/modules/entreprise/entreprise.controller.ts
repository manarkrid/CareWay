import { Controller, Get, Param, Res } from '@nestjs/common';
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

  // GET /api/entreprise/rapports
  @Get('rapports')
  getRapports() {
    return this.entrepriseService.getRapports();
  }

  // GET /api/entreprise/rapport/:id/download
  @Get('rapport/:id/download')
  downloadReport(@Param('id') id: string, @Res() res) {
    const csv = this.entrepriseService.downloadReport(id);
    if (!csv) {
      return res.status(404).json({ message: 'Rapport non trouvé' });
    }

    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', `attachment; filename="rapport-${id}.csv"`);
    return res.send(csv);
  }
}