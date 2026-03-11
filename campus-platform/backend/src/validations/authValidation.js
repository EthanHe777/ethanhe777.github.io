import { body } from 'express-validator';

const ecjtuEmailRegex = /^[A-Za-z0-9._%+-]+@(ecjtu\.edu\.cn|stu\.ecjtu\.edu\.cn)$/;

export const registerValidation = [
  body('email').trim().matches(ecjtuEmailRegex).withMessage('请使用华东交通大学官方邮箱注册。'),
  body('password').isLength({ min: 6 }).withMessage('密码长度至少为 6 位。'),
  body('nickname').trim().isLength({ min: 2, max: 20 }).withMessage('昵称长度应在 2-20 之间。')
];

export const loginValidation = [
  body('email').trim().notEmpty().withMessage('邮箱不能为空。'),
  body('password').notEmpty().withMessage('密码不能为空。')
];
