import { CalendrierService } from './calendrier.service';
export declare class CalendrierController {
    private readonly calendrierService;
    constructor(calendrierService: CalendrierService);
    getCalendrier(): Promise<{
        message: string;
    }>;
}
