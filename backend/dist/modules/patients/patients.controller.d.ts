import { PatientsService } from './patients.service';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    getAll(): {
        data: {
            id: number;
            name: string;
            address: string;
            phone: string;
            email: string;
            country: string;
            documents: string;
            status: string;
            dateAdded: string;
        }[];
        total: number;
    };
    getStats(): {
        total: number;
        newThisMonth: number;
        avgTrajets: number;
        activePatients: number;
    };
}
