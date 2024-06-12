import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';
//import protectedRoutes from './routes/protected';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
//app.use('/api', protectedRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
