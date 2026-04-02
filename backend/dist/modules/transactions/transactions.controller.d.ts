import { TransactionsService } from './transactions.service';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    getAll(): {
        date: string;
        idTrajet: string;
        patient: string;
        distance: string;
        statut: string;
        montant: string;
        icon: string;
    }[];
    getMonthlySummary(): {
        month: string;
        totalTrajets: number;
        recusCPAM: string;
        totalNet: string;
    }[];
    getWeeklyRevenue(): {
        date: string;
        montant: number;
    }[];
}
