import { DemandesService } from '../demandes/demandes.service';
import { PatientsService } from '../patients/patients.service';
export declare class SearchService {
    private demandesService;
    private patientsService;
    constructor(demandesService: DemandesService, patientsService: PatientsService);
    search(query: string): {
        pages: {
            id: string;
            label: string;
            icon: string;
        }[];
        patients: {
            id: number;
            label: string;
            subLabel: string;
            action: string;
            icon: string;
        }[];
        demandes: {
            id: number;
            label: string;
            subLabel: string;
            action: string;
            icon: string;
        }[];
    };
}
