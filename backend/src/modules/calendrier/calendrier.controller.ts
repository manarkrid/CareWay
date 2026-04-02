import { Controller, Get, Post, Body } from '@nestjs/common';
import { CalendrierService } from './calendrier.service';

@Controller('calendrier')
export class CalendrierController {
  constructor(private readonly calendrierService: CalendrierService) { }

  // GET /api/calendrier/today
  @Get('today')
  getTodayTrajets() {
    return this.calendrierService.getTodayTrajets();
  }

  // POST /api/calendrier/trajet
  @Post('trajet')
  addTrajet(@Body() body: any) {
    return this.calendrierService.addTrajet(body);
  }

  // GET /api/calendrier/team
  @Get('team')
  getTeam() {
    return this.calendrierService.getTeam();
  }

  // GET /api/calendrier/planning
  @Get('planning')
  getPlanningHebdo() {
    return this.calendrierService.getPlanningHebdo();
  }
}