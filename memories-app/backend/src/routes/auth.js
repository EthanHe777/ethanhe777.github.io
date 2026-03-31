import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { query } from '../config/db.js';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  graduationYear: z.number().int().min(1980).max(2100),
  className: z.string().min(2),
  avatarUrl: z.string().optional().nullable()
});

router.post('/register', async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues });

  const { email, password, name, graduationYear, className, avatarUrl } = parsed.data;

  const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
  if (existing.rowCount) return res.status(409).json({ error: 'Email already used' });

  const classResult = await query(
    `INSERT INTO classes (graduation_year, class_name)
     VALUES ($1, $2)
     ON CONFLICT (graduation_year, class_name)
     DO UPDATE SET class_name = EXCLUDED.class_name
     RETURNING id`,
    [graduationYear, className]
  );

  const passwordHash = await bcrypt.hash(password, 10);

  const inserted = await query(
    `INSERT INTO users (email, password_hash, name, graduation_year, class_id, avatar_url)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, email, name, graduation_year, class_id, avatar_url`,
    [email, passwordHash, name, graduationYear, classResult.rows[0].id, avatarUrl || null]
  );

  const user = inserted.rows[0];
  const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

  res.status(201).json({ token, user });
});

router.post('/login', async (req, res) => {
  const schema = z.object({ email: z.string().email(), password: z.string().min(6) });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues });

  const { email, password } = parsed.data;
  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  if (!result.rowCount) return res.status(401).json({ error: 'Invalid credentials' });

  const user = result.rows[0];
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

  return res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      graduationYear: user.graduation_year,
      classId: user.class_id,
      avatarUrl: user.avatar_url
    }
  });
});

export default router;
