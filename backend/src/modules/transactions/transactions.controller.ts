import { Controller, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  // GET /api/transactions
  @Get()
  getAll() {
    return this.transactionsService.getAll();
  }

  // GET /api/transactions/monthly
  @Get('monthly')
  getMonthlySummary() {
    return this.transactionsService.getMonthlySummary();
  }

  // GET /api/transactions/weekly-revenue
  @Get('weekly-revenue')
  getWeeklyRevenue() {
    return this.transactionsService.getWeeklyRevenue();
  }
}