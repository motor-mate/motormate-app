import mariadb from 'mariadb';
import express, { Request, Response } from 'express';
import cors from 'cors';

// Configura i dettagli della connessione al database
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'motor-mate',
    connectionLimit: 5 // Limite massimo di connessioni al database
});

const app = express();
app.use(cors());
app.use(express.json());

const SERVICE_PORT = 4000;

async function eseguiQuery(sql: string, values?: any[]): Promise<any> {
    let conn;
    try {
        conn = await pool.getConnection();
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

app.get('/api/getAdmins', async (req: Request, res: Response) => {
    try {
        const results = await eseguiQuery('SELECT * FROM admin');
        res.json(results);
    } catch (error) {
        console.error('Errore durante l\'esecuzione della query:', error);
        res.status(500).json({ error: 'Errore durante l\'esecuzione della query' });
    }
});


app.post('/api/auth/login', async (req: Request, res: Response) => {
    try {
        const results = "Hello World!";
        res.json(results);
    } catch (error) {
        console.error('Errore: ', error);
        res.status(500).json({ error: 'Errore' });
    }
});


app.listen(SERVICE_PORT, () => {
    console.log(`Server is running on port ${SERVICE_PORT}`);
});
