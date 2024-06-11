import { Utente } from './Utente';
import { Veicolo } from './Veicolo';

enum StatoReclamo {
    APERTO,
    ACCETTATO,
    RIFIUTATO
}

class CartaDiCircolazione {
    private _urlImmagine: string;

    constructor(urlImmagine: string) {
        this._urlImmagine = urlImmagine;
    }

    get urlImmagine(): string {
        return this._urlImmagine;
    }
}

class Reclamo {
    private _dataOra: Date;
    private _stato: StatoReclamo;
    private _cartaDiCircolazione: CartaDiCircolazione;
    private _veicolo: Veicolo;
    private _utenteReclamante: Utente;

    constructor(
        dataOra: Date,
        stato: StatoReclamo,
        cartaDiCircolazione: CartaDiCircolazione,
        veicolo: Veicolo,
        utenteReclamante: Utente
    ) {
        this._dataOra = dataOra;
        this._stato = stato;
        this._cartaDiCircolazione = cartaDiCircolazione;
        this._veicolo = veicolo;
        this._utenteReclamante = utenteReclamante;
    }

    get dataOra(): Date {
        return this._dataOra;
    }
    get stato(): StatoReclamo {
        return this._stato;
    }
    get cartaDiCircolazione(): CartaDiCircolazione {
        return this._cartaDiCircolazione;
    }
    get veicolo(): Veicolo {
        return this._veicolo;
    }
    get utenteReclamante(): Utente {
        return this._utenteReclamante;
    }
}