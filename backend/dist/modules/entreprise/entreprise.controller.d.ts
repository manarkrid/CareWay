import { EntrepriseService } from './entreprise.service';
export declare class EntrepriseController {
    private readonly entrepriseService;
    constructor(entrepriseService: EntrepriseService);
    getEquipe(): {
        id: number;
        nom: string;
        emplacement: string;
        absence: number;
        activite: number;
        statut: string;
    }[];
    addEmployee(employee: any): any;
    getVehicules(): {
        id: string;
        immatriculation: string;
        type: string;
        marque: string;
        statut: string;
        km: number;
    }[];
    getTrajets(month?: string): {
        id: string;
        date: string;
        conducteur: string;
        patient: string;
        destination: string;
        distance: string;
        statut: string;
        month: string;
    }[];
    getNextTrip(): {
        date: string;
        label: string;
        participant: string;
        departure: string;
        arrival: string;
        details: string;
    };
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
        retards: number;
        annulations: number;
        incidents: number;
    };
    getNotificationSettings(): {
        id: number;
        label: string;
        description: string;
        enabled: boolean;
    }[];
    updateNotificationSetting(id: string, enabled: boolean): {
        id: number;
        label: string;
        description: string;
        enabled: boolean;
    };
    getNotifications(): {
        id: number;
        type: string;
        message: string;
        date: string;
        priorite: string;
    }[];
    getRapports(): {
        id: number;
        titre: string;
        type: string;
        date: string;
        trajets: number;
        revenus: string;
        tauxAcceptation: string;
    }[];
    downloadReport(id: string, res: any): any;
}
