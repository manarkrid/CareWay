import { Module } from '@nestjs/common';
import { EntrepriseModule } from '../entreprise/entreprise.module';
import { CalendrierController } from './calendrier.controller';
import { CalendrierService } from './calendrier.service';

@Module({
  imports: [EntrepriseModule],
  controllers: [CalendrierController],
  providers: [CalendrierService],
})
export class CalendrierModule {}