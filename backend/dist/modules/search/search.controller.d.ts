import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    search(q: string): {
        pages: {
            id: string;
            label: string;
            icon: string;
        }[];
        patients: {
            id: number;
            label: string;
            subLabel: string;
            action: string;
            icon: string;
        }[];
        demandes: {
            id: number;
            label: string;
            subLabel: string;
            action: string;
            icon: string;
        }[];
    };
}
