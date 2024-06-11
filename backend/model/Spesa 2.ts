enum CategoriSpesa {
    Nessuna = "Nessuna",
    Rifornimento = "Rifornimento",
    Manutenzine = "Manutenzione",
    Tasse = "Tasse",
    Assicurazione = "Assicurazione",
    Accessori = "Accessori",
    Altro = "Altro"
}

class Spesa {
    private _desrizione: string;
    private _importo: number;
    private _categoria: CategoriSpesa;

    // Classe astratta
    constructor(descrizione: string, importo: number, categoria: CategoriSpesa) {
        if (this.constructor == Spesa) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this._desrizione = descrizione;
        this._importo = importo;
        this._categoria = categoria;
    }

    get descrizione(): string {
        return this._desrizione;
    }
    get importo(): number {
        return this._importo;
    }
    get categoria(): CategoriSpesa {
        return this._categoria;
    }
}

class SpesaSingola extends Spesa {
    private _data: Date;

    constructor(descrizione: string,
        importo: number,
        categoria: CategoriSpesa,
        data: Date
    ) {
        super(descrizione, importo, categoria);
        this._data = data;
    }

    get data(): Date {
        return this._data;
    }
}

class SpesaRicorrente extends Spesa {
    private _primaRicorrenza: Date;
    private _termineRicorrenza: Date;
    private _periodoRipetizione: PeriodoRipetizione;

    constructor(descrizione: string, importo: number, categoria: CategoriSpesa, primaRicorrenza: Date, termineRicorrenza: Date, periodoRipetizione: PeriodoRipetizione) {
        super(descrizione, importo, categoria);
        this._primaRicorrenza = primaRicorrenza;
        this._termineRicorrenza = termineRicorrenza;
        this._periodoRipetizione = periodoRipetizione;
    }

    get primaRicorrenza(): Date {
        return this._primaRicorrenza;
    }
    get termineRicorrenza(): Date {
        return this._termineRicorrenza;
    }
    get periodoRipetizione(): PeriodoRipetizione {
        return this._periodoRipetizione;
    }
}

class PeriodoRipetizione {
    private _giorni: number;
    private _mesi: number;
    private _anni: number;

    constructor(giorni: number, mesi: number, anni: number) {
        // Controllo che siano numeri interi 
        if (giorni % 1 != 0 || mesi % 1 != 0 || anni % 1 != 0) {
            throw new Error("I valori devono essere numeri interi");
        }
        if (giorni < 0 || mesi < 0 || anni < 0) {
            throw new Error("I valori devono essere numeri interi positivi");
        }
        this._giorni = giorni;
        this._mesi = mesi;
        this._anni = anni;
    }

    get giorni(): number {
        return this._giorni;
    }
    get mesi(): number {
        return this._mesi;
    }
    get anni(): number {
        return this._anni;
    }
}

export { Spesa };