class Modello {
    private _modello: string;
    private _marca: string;
    private _versione: string;

    constructor(modello: string, marca: string, versione: string) {
        this._modello = modello;
        this._marca = marca;
        this._versione = versione;
    }

    get modello(): string {
        return this._modello;
    }
    get marca(): string {
        return this._marca;
    }
    get versione(): string {
        return this._versione;
    }
}

export { Modello };