import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) { }

    @Get()
    getAll(@CurrentUser() user: any) {
        return this.notificationsService.getAll(user.userId);
    }

    @Patch('read-all')
    markAllAsRead(@CurrentUser() user: any) {
        return this.notificationsService.markAllAsRead(user.userId);
    }
}
