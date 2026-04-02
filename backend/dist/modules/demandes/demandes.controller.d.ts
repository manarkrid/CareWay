import { DemandesService } from './demandes.service';
export declare class DemandesController {
    private readonly demandesService;
    constructor(demandesService: DemandesService);
    getAll(): ({
        id: number;
        name: string;
        date: string;
        time: string;
        from: string;
        to: string;
        type: string;
        direction: string;
        distance: string;
        duration: string;
        status: string;
        wait: string;
        price: number;
    } | {
        id: number;
        name: string;
        date: string;
        time: string;
        from: string;
        to: string;
        type: string;
        direction: string;
        distance: string;
        duration: string;
        status: string;
        price: number;
        wait?: undefined;
    })[];
    getPriceMarkers(): {
        price: number;
        left: string;
        top: string;
    }[];
    updateStatut(id: string, body: {
        statut: string;
    }): {
        id: number;
        name: string;
        date: string;
        time: string;
        from: string;
        to: string;
        type: string;
        direction: string;
        distance: string;
        duration: string;
        status: string;
        wait: string;
        price: number;
    } | {
        id: number;
        name: string;
        date: string;
        time: string;
        from: string;
        to: string;
        type: string;
        direction: string;
        distance: string;
        duration: string;
        status: string;
        price: number;
        wait?: undefined;
    } | {
        error: string;
    };
}
