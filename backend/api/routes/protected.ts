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

export default router;
