import { Controller, Get, Post, Patch, Param, Body, Query, Res } from '@nestjs/common';
import { EntrepriseService } from './entreprise.service';

@Controller('entreprise')
export class EntrepriseController {
  constructor(private readonly entrepriseService: EntrepriseService) { }

  @Get('equipe')
  getEquipe() {
    return this.entrepriseService.getEquipe();
  }

  @Post('equipe')
  addEmployee(@Body() employee: any) {
    return this.entrepriseService.addEmployee(employee);
  }

  @Get('vehicules')
  getVehicules() {
    return this.entrepriseService.getVehicules();
  }

  @Get('trajets')
  getTrajets(@Query('month') month?: string) {
    return this.entrepriseService.getTrajets(month);
  }

  @Get('trajets/next')
  getNextTrip() {
    return this.entrepriseService.getNextTrip();
  }

  @Get('contrats')
  getContrats() {
    return this.entrepriseService.getContrats();
  }

  @Get('historique')
  getHistorique() {
    return this.entrepriseService.getHistorique();
  }

  @Get('notifications/settings')
  getNotificationSettings() {
    return this.entrepriseService.getNotificationSettings();
  }

  @Patch('notifications/settings/:id')
  updateNotificationSetting(
    @Param('id') id: string,
    @Body('enabled') enabled: boolean
  ) {
    return this.entrepriseService.updateNotificationSetting(parseInt(id), enabled);
  }

  @Get('notifications')
  getNotifications() {
    return this.entrepriseService.getNotifications();
  }

  @Get('rapports')
  getRapports() {
    return this.entrepriseService.getRapports();
  }

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