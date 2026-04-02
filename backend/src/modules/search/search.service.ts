import { Injectable } from '@nestjs/common';
import { DemandesService } from '../demandes/demandes.service';
import { PatientsService } from '../patients/patients.service';

@Injectable()
export class SearchService {
    constructor(
        private demandesService: DemandesService,
        private patientsService: PatientsService,
    ) { }

    search(query: string) {
        if (!query || query.trim() === '') {
            return { patients: [], demandes: [], pages: [] };
        }

        const lowerQuery = query.toLowerCase();

        // Pages / Quick Actions mock
        const allPages = [
            { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
            { id: 'entreprise', label: 'Entreprise & Flotte', icon: '🏢' },
            { id: 'transactions', label: 'Transactions', icon: '💶' },
            { id: 'demandes', label: 'Demandes de trajets', icon: '🚕' },
            { id: 'patients', label: 'Patients', icon: '👥' },
            { id: 'calendrier', label: 'Calendrier', icon: '📅' },
            { id: 'profil', label: 'Mon Profil', icon: '👤' },
        ];
        const matchedPages = allPages.filter(p => p.label.toLowerCase().includes(lowerQuery));

        // Patients mock
        const { data: allPatients } = this.patientsService.getAll();
        const matchedPatients = allPatients
            .filter(p => p.name.toLowerCase().includes(lowerQuery) || (p.address && p.address.toLowerCase().includes(lowerQuery)))
            .slice(0, 5) // max 5 results
            .map(p => ({ id: p.id, label: p.name, subLabel: p.address, action: 'patients', icon: '👤' }));

        // Demandes mock
        const allDemandes = this.demandesService.getAll();
        const matchedDemandes = allDemandes
            .filter(d => d.name.toLowerCase().includes(lowerQuery) || d.from.toLowerCase().includes(lowerQuery) || d.to.toLowerCase().includes(lowerQuery))
            .slice(0, 5)
            .map(d => ({ id: d.id, label: `${d.name}`, subLabel: `${d.from} → ${d.to} (${d.date})`, action: 'demandes', icon: '🚕' }));

        return {
            pages: matchedPages,
            patients: matchedPatients,
            demandes: matchedDemandes
        };
    }
}
