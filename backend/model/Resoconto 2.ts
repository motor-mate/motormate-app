import { Spesa } from "./Spesa";

class Resoconto {
    private _spese: Array<Spesa>;

    constructor(spese: Array<Spesa>) {
        this._spese = spese;
    }

    get spese(): Array<Spesa> {
        return this._spese;
    }
}