export declare class EntrepriseService {
    getEmployees(): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        role: string;
        activityRate: number;
        absenceDays: number;
        status: string;
    }[]>;
    getVehicles(): Promise<{
        id: number;
        registration: string;
        type: string;
        mileage: number;
        nextMaintenance: string;
        status: string;
    }[]>;
    getContracts(): Promise<{
        id: number;
        partnerName: string;
        type: string;
        status: string;
    }[]>;
    getStats(): Promise<{
        employees: number;
        vehicles: number;
        contracts: number;
        totalTrips: number;
        delays: number;
        cancellations: number;
        incidents: number;
    }>;
}
