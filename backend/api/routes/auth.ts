import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mariadb from 'mariadb';

const router = Router();

const JWT_SECRET = '2bb80d537b1da3e38bd30361aa855686bde0b2e5b9e6e109f2ba5b662e60fb6c';

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

// Registrazione
// TODO: modificare la tabella e i campi in base a come sono effettivamente strutturati
router.post('/register', async (req, res) => {
  const { codice_fiscale, password, email, residenza, consenso, nome, cognome } = req.body;

  if (!codice_fiscale || !email || !password || !residenza || consenso == null || !nome || !cognome) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const results = await eseguiQuery('SELECT * FROM utenti WHERE email = ?', [email]);
  if(results.length > 0) {
    return res.status(409).json({ message: 'Email già registrata' });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  await eseguiQuery('INSERT INTO utenti (id, password, email, residenza, consenso, nome, cognome) VALUES (?, ?, ?, ?, ?, ?, ?)', [codice_fiscale, hashedPassword, email, residenza, consenso, nome, cognome]);
  res.status(201).json({ message: 'Utente registrato con successo!' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const results = await eseguiQuery('SELECT * FROM utenti WHERE email = ?', [email]);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  } catch (err: any) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

export default router;
