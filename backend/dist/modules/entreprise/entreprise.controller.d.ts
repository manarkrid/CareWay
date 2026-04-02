import { EntrepriseService } from './entreprise.service';
export declare class EntrepriseController {
    private readonly entrepriseService;
    constructor(entrepriseService: EntrepriseService);
    getEquipe(): {
        nom: string;
        emplacement: string;
        absence: number;
        activite: number;
        statut: string;
    }[];
    getVehicules(): {
        id: string;
        immatriculation: string;
        type: string;
        marque: string;
        statut: string;
        km: number;
    }[];
    getTrajets(): {
        id: string;
        date: string;
        conducteur: string;
        patient: string;
        distance: string;
        statut: string;
    }[];
    getContrats(): {
        id: string;
        organisme: string;
        type: string;
        dateDebut: string;
        dateFin: string;
        statut: string;
    }[];
    getHistorique(): {
        chartData: {
            month: string;
            value: number;
        }[];
        totalTrajets: number;
        totalRevenu: string;
        tauxSatisfaction: string;
    };
    getNotifications(): {
        id: number;
        type: string;
        message: string;
        date: string;
        priorite: string;
    }[];
}
