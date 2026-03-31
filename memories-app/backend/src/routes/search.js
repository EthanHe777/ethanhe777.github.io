import { Router } from 'express';
import { query } from '../config/db.js';

const router = Router();

router.get('/', async (req, res) => {
  const { graduationYear, className, studentName } = req.query;

  const conditions = [];
  const values = [];

  if (graduationYear) {
    values.push(Number(graduationYear));
    conditions.push(`c.graduation_year = $${values.length}`);
  }

  if (className) {
    values.push(`%${className}%`);
    conditions.push(`c.class_name ILIKE $${values.length}`);
  }

  if (studentName) {
    values.push(`%${studentName}%`);
    conditions.push(`u.name ILIKE $${values.length}`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const sql = `
    SELECT DISTINCT c.id, c.graduation_year, c.class_name,
      json_build_object('id', u.id, 'name', u.name) AS matched_student
    FROM classes c
    LEFT JOIN users u ON u.class_id = c.id
    ${whereClause}
    ORDER BY c.graduation_year DESC, c.class_name ASC
    LIMIT 50
  `;

  const result = await query(sql, values);
  res.json(result.rows);
});

export default router;
