import { DemandesService } from './demandes.service';
export declare class DemandesController {
    private readonly demandesService;
    constructor(demandesService: DemandesService);
    getDemandes(): Promise<{
        message: string;
    }>;
}
