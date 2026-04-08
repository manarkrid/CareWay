import { EntrepriseService } from '../entreprise/entreprise.service';
export declare class CalendrierService {
    private readonly entrepriseService;
    constructor(entrepriseService: EntrepriseService);
    private todayTrajets;
    getTodayTrajets(): {
        id: string;
        heure: any;
        client: string;
        personne: string;
        statut: string;
    }[];
    addTrajet(trajetData: any): {
        id: string;
        date: any;
        conducteur: any;
        patient: any;
        destination: any;
        distance: string;
        statut: string;
        month: string;
        raw: any;
    };
    getTeam(): {
        id: number;
        name: string;
        role: string;
        statut: string;
        trajets: number;
    }[];
    getPlanningHebdo(): {
        joursSemaine: string[];
        planningData: {
            Lundi: string[];
            Mardi: string[];
            Mercredi: string[];
            Jeudi: string[];
            Vendredi: string[];
            Samedi: string[];
            Dimanche: string[];
        };
        todayStats: {
            trajetsCount: number;
            personnesDisponibles: string;
            vehiculesDisponibles: string;
        };
    };
}
