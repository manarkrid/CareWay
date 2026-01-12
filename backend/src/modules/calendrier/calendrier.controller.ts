import { Controller, Get } from '@nestjs/common';
import { CalendrierService } from './calendrier.service';

@Controller('calendrier')
export class CalendrierController {
  constructor(private readonly calendrierService: CalendrierService) {}

  @Get()
  async getCalendrier() {
    return this.calendrierService.getCalendrier();
  }
}