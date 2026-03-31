import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/auth.js';
import classRoutes from './routes/classes.js';
import photoRoutes from './routes/photos.js';
import commentRoutes from './routes/comments.js';
import searchRoutes from './routes/search.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.resolve(process.env.UPLOAD_DIR || 'uploads')));

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/search', searchRoutes);

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
