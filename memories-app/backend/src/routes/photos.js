import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { z } from 'zod';
import { query } from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const uploadDir = process.env.UPLOAD_DIR || 'uploads';

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

const upload = multer({ storage, limits: { fileSize: 8 * 1024 * 1024 } });

router.post('/', requireAuth, upload.single('image'), async (req, res) => {
  const schema = z.object({
    classId: z.string(),
    title: z.string().min(1),
    takenAt: z.string().optional(),
    story: z.string().max(2000).optional(),
    category: z.enum(['old-photo', 'class-group', 'activity', 'graduation'])
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues });
  if (!req.file) return res.status(400).json({ error: 'Image is required' });

  const { classId, title, takenAt, story, category } = parsed.data;
  const imageUrl = `/uploads/${req.file.filename}`;

  const inserted = await query(
    `INSERT INTO photos (class_id, uploader_id, title, taken_at, story, image_url, category)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [Number(classId), Number(req.user.sub), title, takenAt || null, story || null, imageUrl, category]
  );

  res.status(201).json(inserted.rows[0]);
});

router.get('/:id', async (req, res) => {
  const photoId = Number(req.params.id);
  const photoResult = await query(
    `SELECT p.*, u.name AS uploader_name, u.avatar_url AS uploader_avatar
     FROM photos p
     JOIN users u ON u.id = p.uploader_id
     WHERE p.id = $1`,
    [photoId]
  );

  if (!photoResult.rowCount) return res.status(404).json({ error: 'Photo not found' });

  const comments = await query(
    `SELECT c.id, c.content, c.created_at, u.id AS user_id, u.name, u.avatar_url
     FROM comments c
     JOIN users u ON u.id = c.user_id
     WHERE c.photo_id = $1
     ORDER BY c.created_at ASC`,
    [photoId]
  );

  res.json({ photo: photoResult.rows[0], comments: comments.rows });
});

export default router;
