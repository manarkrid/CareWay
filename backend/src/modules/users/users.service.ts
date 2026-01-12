import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async getProfile() {
    return {
      id: 1,
      firstName: 'Pierre',
      lastName: 'Michel',
      email: 'pierre.michel@careway.fr',
      role: 'Transporteur coordinateur',
    };
  }
}