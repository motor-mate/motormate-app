import { Utente } from './Utente';

class Entry {
    private _contenuto: string;
    private _tipoOperazione: string;
    private _timestamp: Date;
    private _utente: Utente;

    constructor(
        contenuto: string,
        tipoOperazione: string,
        timestamp: Date,
        utente: Utente
    ) {
        this._contenuto = contenuto;
        this._tipoOperazione = tipoOperazione;
        this._timestamp = timestamp;
        this._utente = utente;
    }

    get contenuto(): string {
        return this._contenuto;
    }
    get tipoOperazione(): string {
        return this._tipoOperazione;
    }
    get timestamp(): Date {
        return this._timestamp;
    }
    get utente(): Utente {
        return this._utente;
    }

    toString(): string {
        return `${this._timestamp.toISOString()} - ${this._utente.id} - ${this._tipoOperazione} - ${this._contenuto}`;
    }
}

export { Entry };