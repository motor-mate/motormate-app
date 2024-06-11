import { Modello } from './Modello';
import { Garage } from './Garage';

class Veicolo {
    private _targa: string;
    private _primaImmatricolazione: Date;
    private _modello: Modello;
    private _garage: Garage;

    constructor(targa: string, primaImmatricolazione: Date, marca: string, modello: string, versione: string, garage: Garage) {
        this._targa = targa;
        this._primaImmatricolazione = primaImmatricolazione;
        this._modello = new Modello(marca, modello, versione);
        this._garage = garage;
    }
    get targa(): string {
        return this._targa;
    }
    get primaImmatricolazione(): Date {
        return this._primaImmatricolazione;
    }
    get modello(): Modello {
        return this._modello;
    }
    get garage(): Garage {
        return this._garage;
    }
}

export { Veicolo };