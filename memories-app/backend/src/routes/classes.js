import { Router } from 'express';
import { query } from '../config/db.js';

const router = Router();

router.get('/', async (_, res) => {
  const result = await query(
    `SELECT c.id, c.graduation_year, c.class_name, c.cover_photo_url,
            COUNT(u.id) AS student_count,
            COUNT(p.id) AS photo_count
     FROM classes c
     LEFT JOIN users u ON u.class_id = c.id
     LEFT JOIN photos p ON p.class_id = c.id
     GROUP BY c.id
     ORDER BY c.graduation_year DESC, c.class_name ASC`
  );

  res.json(result.rows);
});

router.get('/:id', async (req, res) => {
  const classId = Number(req.params.id);
  const classInfo = await query('SELECT * FROM classes WHERE id = $1', [classId]);
  if (!classInfo.rowCount) return res.status(404).json({ error: 'Class not found' });

  const photos = await query(
    `SELECT p.id, p.title, p.taken_at, p.story, p.image_url, p.created_at,
            u.id AS uploader_id, u.name AS uploader_name,
            (SELECT COUNT(*) FROM comments WHERE photo_id = p.id) AS comments_count
     FROM photos p
     JOIN users u ON u.id = p.uploader_id
     WHERE p.class_id = $1
     ORDER BY p.taken_at DESC NULLS LAST, p.created_at DESC`,
    [classId]
  );

  res.json({ classInfo: classInfo.rows[0], photos: photos.rows });
});

export default router;
