import { body, param } from 'express-validator';

export const createErrandValidation = [
  body('title').trim().isLength({ min: 2, max: 60 }).withMessage('标题长度应在 2-60。'),
  body('description').trim().isLength({ min: 5, max: 500 }).withMessage('任务描述长度应在 5-500。'),
  body('type').isIn(['substitute-class', 'pickup-delivery', 'campus-run']).withMessage('任务类型不合法。'),
  body('reward').isFloat({ min: 0 }).withMessage('赏金必须为非负数。')
];

export const updateErrandStatusValidation = [
  param('id').isMongoId().withMessage('任务 ID 不合法。'),
  body('status').isIn(['pending', 'in-progress', 'completed']).withMessage('状态值不合法。')
];
