import { CalendrierService } from './calendrier.service';
export declare class CalendrierController {
    private readonly calendrierService;
    constructor(calendrierService: CalendrierService);
    getTodayTrajets(): {
        id: string;
        heure: any;
        client: string;
        personne: string;
        statut: string;
    }[];
    addTrajet(body: any): {
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
