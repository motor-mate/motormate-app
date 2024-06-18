import { Controller } from './Controller';
import { Veicolo } from '../model/Veicolo';

interface IVeicoliController {
    aggiungi(userId: string, veicolo: Veicolo): void;
    modifica(userId: string, vecchioVeicolo: Veicolo, nuovoVeicolo: Veicolo): void;
    rimuovi(userId: string, veicolo: Veicolo): void;
    getVeicoli(userId: string): any;
}

class VeicoliController extends Controller implements IVeicoliController {

    static #instance: VeicoliController;

    private constructor() {
        super('localhost', 'root', 'password', 'motor-mate');
    }

    public static get instance(): VeicoliController {
        if (!VeicoliController.#instance) {
            VeicoliController.#instance = new VeicoliController();
        }
        return VeicoliController.#instance;
    }

    public aggiungi(userID: string, veicolo: Veicolo): void {
        const idGarage = this.eseguiQuery('SELECT id FROM Garage WHERE id_utente = ?', [userID]);
        if (!idGarage) {
            throw new Error("Utente non ha un garage");
        }

        this.eseguiQuery('INSERT INTO Veicoli (targa, primaImmatricolazione, marca, modello, versione, id_garage) VALUES (?, ?, ?, ?, ?, ?)',
            [
                veicolo.targa,
                veicolo.primaImmatricolazione,
                veicolo.modello.marca,
                veicolo.modello.modello,
                veicolo.modello.versione,
                idGarage,
            ]
        );

        console.log("Inserito veicolo");
    }

    public modifica(userId: string, vecchioVeicolo: Veicolo, nuovoVeicolo: Veicolo): void {
        const idGarage = this.eseguiQuery('SELECT id FROM Garage WHERE id_utente = ?', [userId]);
        if (!idGarage) {
            throw new Error("Utente non ha un garage");
        }
        this.eseguiQuery('UPDATE Veicoli SET targa = ?, primaImmatricolazione = ?, marca = ?, modello = ?, versione = ? WHERE id_garage = ? AND targa = ?', [
            vecchioVeicolo.targa,
            vecchioVeicolo.primaImmatricolazione,
            vecchioVeicolo.modello.marca,
            vecchioVeicolo.modello.modello,
            vecchioVeicolo.modello.versione,
            idGarage,
            nuovoVeicolo.targa
        ]);
    }

    public rimuovi(userId: string, veicolo: Veicolo): void {
        const idGarage = this.eseguiQuery('SELECT id FROM Garage WHERE id_utente = ?', [userId]);
        this.eseguiQuery('DELETE FROM Veicoli WHERE id_garage = ?', [idGarage]);
    }

    public async getVeicoli(userId: string) {
        const result = await this.eseguiQuery('SELECT targa, primaImmatricolazione, marca, modello, versione FROM Modelli m, Veicoli v, Garage g WHERE g.id_utente = ? AND v.id_garage = g.id AND m.id = v.id_modello', [userId]);
        result.map((veicolo: any) => new Veicolo(veicolo.targa, veicolo.primaImmatricolazione, veicolo.marca, veicolo.modello, veicolo.versione));
        return result;
    }
}

export { VeicoliController, IVeicoliController };