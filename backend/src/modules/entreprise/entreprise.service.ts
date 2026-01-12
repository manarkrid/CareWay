import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Employee } from './entities/employee.entity';
// import { Vehicle } from './entities/vehicle.entity';
// import { Contract } from './entities/contract.entity';

@Injectable()
export class EntrepriseService {
  // constructor(
  //   @InjectRepository(Employee)
  //   private employeeRepository: Repository<Employee>,
  //   @InjectRepository(Vehicle)
  //   private vehicleRepository: Repository<Vehicle>,
  //   @InjectRepository(Contract)
  //   private contractRepository: Repository<Contract>,
  // ) {}

  async getEmployees() {
    // return this.employeeRepository.find();
    return [
      {
        id: 1,
        firstName: 'Loic',
        lastName: 'Dupont',
        role: 'Ambulancier',
        activityRate: 90,
        absenceDays: 2,
        status: 'Disponible'
      },
      {
        id: 2,
        firstName: 'Pierre',
        lastName: 'Bois',
        role: 'Chauffeur',
        activityRate: 95,
        absenceDays: 1,
        status: 'En trajet'
      }
    ];
  }

  async getVehicles() {
    // return this.vehicleRepository.find();
    return [
      {
        id: 1,
        registration: 'AB-133-BC',
        type: 'Ambulance',
        mileage: 45000,
        nextMaintenance: '2025-08-26',
        status: 'Disponible'
      },
      {
        id: 2,
        registration: 'ZV-887-FV',
        type: 'VSL',
        mileage: 120050,
        nextMaintenance: '2027-02-18',
        status: 'Disponible'
      }
    ];
  }

  async getContracts() {
    // return this.contractRepository.find();
    return [
      {
        id: 1,
        partnerName: 'CPAM Tarn',
        type: 'Public',
        status: 'En cours'
      },
      {
        id: 2,
        partnerName: 'Ct. du Sidobre',
        type: 'Privé',
        status: 'En cours'
      }
    ];
  }

  async getStats() {
    // const employeeCount = await this.employeeRepository.count();
    // const vehicleCount = await this.vehicleRepository.count();
    // const contractCount = await this.contractRepository.count();

    return {
      employees: 2,
      vehicles: 2,
      contracts: 2,
      totalTrips: 3359,
      delays: 3,
      cancellations: 12,
      incidents: 1,
    };
  }
}