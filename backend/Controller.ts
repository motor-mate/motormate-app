import mariadb from 'mariadb';

class Controller {
    private _dbConnection: mariadb.Pool;

    constructor(
        host: string,
        user: string,
        password: string,
        database: string,
        connectionLimit: number
    ) {
        this._dbConnection = mariadb.createPool({
            host: host,
            user: user,
            password: password,
            database: database,
            connectionLimit: 5 // TODO Cambiare secondo necessità
        });
    }
}