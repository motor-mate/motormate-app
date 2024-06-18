import { Controller } from './Controller';
import { Veicolo } from '../model/Veicolo';

interface IVeicoliController {
    aggiungi(veicolo: Veicolo): void;
    modifica(userId: string, vecchioVeicolo: Veicolo, nuovoVeicolo: Veicolo): void;
    rimuovi(userId: string, veicolo: Veicolo): void;
    getVeicoli(userId: string): Array<Veicolo>;
}

class VeicoliController extends Controller implements IVeicoliController {
    public aggiungi(veicolo: Veicolo): void {
        this.eseguiQuery('INSERT INTO veicoli (targa, marca, modello, cilindrata, potenza, userId) VALUES (?, ?, ?, ?, ?, ?)', [veicolo.targa, , veicolo.modello, veicolo.cilindrata, veicolo.potenza, veicolo.userId]);
    }
    public modifica(userId: string, vecchioVeicolo: Veicolo, nuovoVeicolo: Veicolo): void {
        // TODO
    }
    public rimuovi(userId: string, veicolo: Veicolo): void {
        // TODO
    }
    public getVeicoli(userId: string): Array<Veicolo> {
        // TODO
        return [];
    }
}

export { VeicoliController, IVeicoliController };