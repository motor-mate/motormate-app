import { Utente } from './Utente';
import { Veicolo } from './Veicolo';

class Garage {
    private _veicoli: Array<Veicolo>;
    private _utente: Utente;

    constructor(veicoli: Array<Veicolo>, utente: Utente) {
        this._veicoli = veicoli;
        this._utente = utente;
    }

    get veicoli(): Array<Veicolo> {
        return this._veicoli;
    }
    get utente(): Utente {
        return this._utente;
    }
}

export { Garage };