import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { EntrepriseController } from './entreprise.controller';
import { EntrepriseService } from './entreprise.service';
// import { Employee } from './entities/employee.entity';
// import { Vehicle } from './entities/vehicle.entity';
// import { Contract } from './entities/contract.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Employee, Vehicle, Contract])
  ],
  controllers: [EntrepriseController],
  providers: [EntrepriseService],
  exports: [EntrepriseService],
})
export class EntrepriseModule {}