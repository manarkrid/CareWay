import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EntrepriseService } from './entreprise.service';

@Controller('entreprise')
export class EntrepriseController {
  constructor(private readonly entrepriseService: EntrepriseService) {}

  @Get('employees')
  async getEmployees() {
    return this.entrepriseService.getEmployees();
  }

  @Get('vehicles')
  async getVehicles() {
    return this.entrepriseService.getVehicles();
  }

  @Get('contracts')
  async getContracts() {
    return this.entrepriseService.getContracts();
  }

  @Get('stats')
  async getStats() {
    return this.entrepriseService.getStats();
  }
}