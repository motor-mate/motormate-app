import { Garage } from "./Garage";

class Utente {
    private _email: string;
    private _residenza: string;
    private _consenso: boolean;
    private _garage: Garage;

    // Classe astratta
    constructor(email: string, residenza: string, consenso: boolean, garage: Garage) {
        if (this.constructor == Utente) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this._email = email;
        this._residenza = residenza;
        this._consenso = consenso;
        this._garage = garage;
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
    get garage(): Garage {
        return this._garage;
    }

    get id(): string {
        throw new Error("Method 'id' must be implemented.");
    }
}

class UtentePrivato extends Utente {
    private _nome: string;
    private _cognome: string;
    private _codiceFiscale: string;

    constructor(email: string,
        residenza: string,
        consenso: boolean,
        garage: Garage,
        nome: string,
        cognome: string,
        codiceFiscale: string
    ) {
        super(email, residenza, consenso, garage);
        this._nome = nome;
        this._cognome = cognome;
        this._codiceFiscale = codiceFiscale;
    }

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

    constructor(email: string,
        residenza: string,
        consenso: boolean,
        partitaIva: string,
        ragioneSociale: string,
        garage: Garage
    ) {
        super(email, residenza, consenso, garage);
        this._partitaIva = partitaIva;
        this._ragioneSociale = ragioneSociale;
    }

    get id(): string {
        return this._partitaIva;
    }
    get ragioneSociale(): string {
        return this._ragioneSociale;
    }
}

export { Utente, UtentePrivato, UtenteAziendale };
