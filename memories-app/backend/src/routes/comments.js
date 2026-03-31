import { Router } from 'express';
import { z } from 'zod';
import { query } from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', requireAuth, async (req, res) => {
  const schema = z.object({ photoId: z.number().int(), content: z.string().min(1).max(500) });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues });

  const { photoId, content } = parsed.data;
  const inserted = await query(
    `INSERT INTO comments (photo_id, user_id, content)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [photoId, Number(req.user.sub), content]
  );

  res.status(201).json(inserted.rows[0]);
});

export default router;
