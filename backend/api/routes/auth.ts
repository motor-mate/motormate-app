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
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const results = await eseguiQuery('SELECT * FROM admin WHERE username = ?', [username]);
  if(results.length > 0) {
    return res.status(409).json({ message: 'Username already taken' });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  await eseguiQuery('INSERT INTO admin (username, password) VALUES (?, ?)', [username, hashedPassword]);
  res.status(201).json({ message: 'User registered successfully' });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const results = await eseguiQuery('SELECT * FROM admin WHERE username = ?', [username]);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = results[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  } catch (err: any) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

export default router;
