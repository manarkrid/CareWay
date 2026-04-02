export declare class DemandesService {
    private demandes;
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
    updateStatut(id: number, statut: string): {
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
    getPriceMarkers(): {
        price: number;
        left: string;
        top: string;
    }[];
}
