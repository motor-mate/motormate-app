import { Veicolo } from './Veicolo';

class Garage {
    private _veicoli: Array<Veicolo>;

    constructor(veicoli: Array<Veicolo>) {
        this._veicoli = veicoli;
    }

    get veicoli(): Array<Veicolo> {
        return this._veicoli;
    }
}