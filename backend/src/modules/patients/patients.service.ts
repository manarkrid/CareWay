import { Injectable } from '@nestjs/common';

@Injectable()
export class PatientsService {
  async getPatients() {
    return { message: 'Patients module - To be implemented' };
  }
}