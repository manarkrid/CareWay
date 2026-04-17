import { Controller, Get, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  // GET /api/transactions
  @Get()
  getAll(@CurrentUser() user: any) {
    return this.transactionsService.getAll(user.userId);
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