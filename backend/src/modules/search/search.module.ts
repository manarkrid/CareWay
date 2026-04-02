import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { DemandesModule } from '../demandes/demandes.module';
import { PatientsModule } from '../patients/patients.module';

@Module({
    imports: [DemandesModule, PatientsModule],
    controllers: [SearchController],
    providers: [SearchService],
})
export class SearchModule { }
