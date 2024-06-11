class Utente {
    private _email: string;
    private _residenza: string;
    private _consenso: boolean;

    // Classe astratta
    constructor() {
        if (this.constructor == Utente) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    get email(): string {
        return this._email;
    }
    get residenza(): string {
        return this._residenza;
    }
    get consenso(): boolean {
        return this._consenso;
    }
}

class UtentePrivato extends Utente {
    private _nome: string;
    private _cognome: string;
    private _codiceFiscale: string;

    get id(): string {
        return this._codiceFiscale;
    }
    get nome(): string {
        return this._nome;
    }
    get cognome(): string {
        return this._cognome;
    }
}

class UtenteAziendale extends Utente {
    private _partitaIva: string;
    private _ragioneSociale: string;

    get id(): string {
        return this._partitaIva;
    }
    get ragioneSociale(): string {
        return this._ragioneSociale;
    }
}

