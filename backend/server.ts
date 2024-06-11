import * as mariadb from 'mariadb';

// Configura i dettagli della connessione al database
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'motor-mate',
    connectionLimit: 5 // Limite massimo di connessioni al database
});

// Funzione per eseguire una query
async function eseguiQuery(sql: string, values?: any[]): Promise<any> {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(sql, values);
        return rows;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }
}

// Esempio di utilizzo: eseguire una query
async function main() {
    try {
        const results = await eseguiQuery('SELECT * FROM admin');
        console.log(results);
    } catch (error) {
        console.error('Errore durante l\'esecuzione della query:', error);
    }
}

main();
