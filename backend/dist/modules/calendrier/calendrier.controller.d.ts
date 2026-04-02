import { CalendrierService } from './calendrier.service';
export declare class CalendrierController {
    private readonly calendrierService;
    constructor(calendrierService: CalendrierService);
    getTodayTrajets(): {
        id: number;
        heure: string;
        client: string;
        personne: string;
        statut: string;
    }[];
    addTrajet(body: any): {
        id: number;
        heure: any;
        client: any;
        personne: any;
        statut: string;
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
