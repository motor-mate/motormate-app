import { promises as fs } from 'fs';

import mariadb from 'mariadb';

import { Entry } from '../model/Entry';

abstract class Controller {
    private _dbConnection: mariadb.Pool;
    private static LOGS_FOLDER = "logs";

    constructor(
        host: string,
        user: string,
        password: string,
        database: string,
    ) {
        this._dbConnection = mariadb.createPool({
            host: host,
            user: user,
            password: password,
            database: database,
            connectionLimit: 5 // TODO Cambiare secondo necessità
        });
    }

    protected async eseguiQuery(sql: string, values?: any[]): Promise<any> {
        let conn;
        try {
            conn = await this._dbConnection.getConnection();
            const rows = await conn.query(sql, values);
            return rows;
        }
        catch (err) {
            throw err;
        }
        finally {
            if (conn) {
                conn.end();
            }
        }
    }

    private async writeToLog(entry: Entry): Promise<void> {
        // Scrive entry in un file di testo nella cartella LOGS_FOLDER
        // Il nome del file è la data dell'entry
        // Se il file esiste già, appende l'entry
        // Se la cartella LOGS_FOLDER non esiste, la crea
        let fileName = `${Controller.LOGS_FOLDER}/${entry.logFileName}`;
        let content = entry.toString();

        try {
            await fs.mkdir(Controller.LOGS_FOLDER, { recursive: true });
            await fs.appendFile(fileName, content + '\n', 'utf8');
        }
        catch (err) {
            console.error(`Errore durante la scrittura dell'entry nel file ${fileName}:`, err);
            throw err;
        }
    }
}

export { Controller };