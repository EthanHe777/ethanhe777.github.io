import { body, query } from 'express-validator';

export const createSecondHandValidation = [
  body('title').trim().isLength({ min: 2, max: 50 }).withMessage('标题长度应在 2-50。'),
  body('description').trim().isLength({ min: 10, max: 1000 }).withMessage('描述长度应在 10-1000。'),
  body('condition').trim().notEmpty().withMessage('请填写成色信息。'),
  body('location').trim().notEmpty().withMessage('请填写交易地点。'),
  body('price').isFloat({ min: 0 }).withMessage('价格必须为非负数。'),
  body('category').isIn(['digital', 'books', 'daily', 'sports', 'other']).withMessage('分类不合法。')
];

export const listSecondHandValidation = [
  query('category').optional().isIn(['digital', 'books', 'daily', 'sports', 'other']).withMessage('分类筛选不合法。')
];
