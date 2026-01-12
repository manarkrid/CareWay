import { Injectable } from '@nestjs/common';

@Injectable()
export class CalendrierService {
  async getCalendrier() {
    return { message: 'Calendrier module - To be implemented' };
  }
}