import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsService {
  async getTransactions() {
    return { message: 'Transactions module - To be implemented' };
  }
}