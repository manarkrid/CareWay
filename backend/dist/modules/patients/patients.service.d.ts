export declare class PatientsService {
    getStats(): {
        total: number;
        newThisMonth: number;
        avgTrajets: number;
        activePatients: number;
    };
    getAll(): {
        data: {
            id: number;
            name: string;
            address: string;
            phone: string;
            email: string;
            country: string;
            documents: string;
            status: string;
            dateAdded: string;
        }[];
        total: number;
    };
}
