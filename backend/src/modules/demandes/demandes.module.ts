import { Module } from '@nestjs/common';
import { DemandesController } from './demandes.controller';
import { DemandesService } from './demandes.service';

@Module({
  controllers: [DemandesController],
  providers: [DemandesService],
})
export class DemandesModule {}