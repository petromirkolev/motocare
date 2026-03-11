import express from 'express';
import healthRouter from './routes/health';
import authRouter from './routes/auth';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'Moto Care API is running' });
});
app.use('/health', healthRouter);
app.use('/auth', authRouter);

export default app;
