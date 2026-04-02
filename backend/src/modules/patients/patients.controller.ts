import { Controller, Get } from '@nestjs/common';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) { }

  // GET /api/patients
  @Get()
  getAll() {
    return this.patientsService.getAll();
  }

  // GET /api/patients/stats
  @Get('stats')
  getStats() {
    return this.patientsService.getStats();
  }
}