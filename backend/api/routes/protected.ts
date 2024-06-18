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
 
router.get('/get/modelli', authenticateJWT, async (req: Request, res: Response) => {
  const marca = req.query.marca;
  const modello = req.query.modello;

  if(marca && modello) {
    const results = await eseguiQuery('SELECT id, versione FROM Modelli WHERE marca = ? AND modello = ?', [marca, modello]);
    res.json(results);
  } else if(marca) {
    const results = await eseguiQuery('SELECT DISTINCT modello FROM Modelli WHERE marca = ?', [marca]);
    res.json(results);
  } else {
    const results = await eseguiQuery('SELECT DISTINCT marca FROM Modelli');
    res.json(results);
  }
});

router.get('/get/userVehicles', authenticateJWT, async (req: Request, res: Response) => {
  const id_utente = req.query.id_utente;
  const results = await eseguiQuery('SELECT marca, modello, targa FROM Modelli m, Veicoli v, Garage g WHERE g.id_utente = ? AND v.id_garage = g.id AND m.id = v.id_modello', [id_utente]);
  res.json(results);
});

router.get('/get/speseVeicolo', authenticateJWT, async (req: Request, res: Response) => {
  const targa = req.query.targa;
  const speseSingole = await eseguiQuery('SELECT s.*, ss.data FROM Spese s, SpeseSingole ss WHERE targa = ? AND s.id = ss.id', [targa]);
  let newSpeseSingole = speseSingole.map((spesa: any) => {
    return { ...spesa, tipo: 'singola' };
  });
  const speseRicorrenti = await eseguiQuery('SELECT s.*, sr.primaRicorrenza FROM Spese s, SpeseRicorrenti sr WHERE targa = ? AND s.id = sr.id', [targa]);
  let newSpeseRicorrenti = speseRicorrenti.map((spesa: any) => {
    let { primaRicorrenza, ...resto } = spesa;
    return { ...resto, data: primaRicorrenza, tipo: 'ricorrente' };
  });
  res.json([...newSpeseSingole, ...newSpeseRicorrenti]);
});

// TODO Controllare se funziona
router.post('/post/aggiungiVeicolo', authenticateJWT, async (req: Request, res: Response) => {
  const { id_utente, id_modello, targa, primaImmatricolazione } = req.body;

  if (!id_utente || !id_modello || !targa || !primaImmatricolazione) {
    res.status(400).json({ message: 'Parametri mancanti' });
    return;
  }

  const t = await eseguiQuery('SELECT targa FROM Veicoli WHERE targa = ?', [targa]);
  if (t.length > 0) {
    res.status(400).json({ message: 'Targa già registrata' });
    return;
  }

  const garages  = await eseguiQuery('SELECT id FROM Garage WHERE id_utente = ?', [id_utente]); // momentaneamente ad ogni utene è associato un solo garage
  const id_garage: number = garages[0].id;
  try {
    await eseguiQuery('INSERT INTO Veicoli (id_garage, id_modello, targa, primaImmatricolazione) VALUES (?, ?, ?, ?)', [id_garage, id_modello, targa, primaImmatricolazione]);
    res.status(200).json({ message: 'Veicolo aggiunto' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Errore durante l\'inserimento del veicolo' });
  }
});

// AggiungiSpesa
// ModificaVeicolo
// ModificaSpesa

export default router;
