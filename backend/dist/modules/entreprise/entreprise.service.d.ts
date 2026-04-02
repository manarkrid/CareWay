export declare class EntrepriseService {
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
    getRapports(): {
        id: number;
        titre: string;
        type: string;
        date: string;
        trajets: number;
        revenus: string;
        tauxAcceptation: string;
    }[];
    downloadReport(id: string): string;
}
