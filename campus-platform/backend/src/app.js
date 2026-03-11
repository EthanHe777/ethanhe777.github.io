import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { env } from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import secondHandRoutes from './routes/secondHandRoutes.js';
import errandRoutes from './routes/errandRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

export const app = express();

app.use(cors({ origin: env.clientOrigin }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.resolve('uploads')));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, name: 'ECJTU Campus Platform API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/market', secondHandRoutes);
app.use('/api/errands', errandRoutes);
app.use('/api/profile', profileRoutes);

app.use(errorHandler);
