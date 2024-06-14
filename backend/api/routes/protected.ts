import { Router, Request, Response } from 'express';
import { authenticateJWT } from '../middleware/authMiddleware';
import mariadb from 'mariadb';

const router = Router();

// Configura i dettagli della connessione al database
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'motor-mate',
  connectionLimit: 5 // Limite massimo di connessioni al database
});

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


router.get('/verify', authenticateJWT, (req, res) => {
  res.json({ message: 'Valid token' });
});

router.get('/get/userVehicles', authenticateJWT, async (req: Request, res: Response) => {
  const id_utente = req.query.id_utente;
  const results = await eseguiQuery('SELECT marca, modello, targa FROM modelli m, veicoli v, garage g WHERE g.id_utente = ? AND v.id_garage = g.id AND m.id = v.id_modello', [id_utente]);
  res.json(results);
});

router.get('/get/speseVeicolo', authenticateJWT, async (req: Request, res: Response) => {
  const targa = req.query.targa;
  const speseSingole = await eseguiQuery('SELECT s.*, ss.data FROM Spese s, SpeseSingole ss WHERE targa = ? AND s.id = ss.id', [targa]);
  const speseRicorrenti = await eseguiQuery('SELECT s.*, sr.primaRicorrenza FROM Spese s, SpeseRicorrenti sr WHERE targa = ? AND s.id = sr.id', [targa]);
  res.json(
    {
      speseSingole: speseSingole,
      speseRicorrenti: speseRicorrenti
    }
  );
});

export default router;
