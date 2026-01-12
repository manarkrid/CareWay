import { Injectable } from '@nestjs/common';

@Injectable()
export class DemandesService {
  async getDemandes() {
    return { message: 'Demandes module - To be implemented' };
  }
}