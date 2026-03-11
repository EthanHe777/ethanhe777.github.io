import { User } from '../models/User.js';
import { hashPassword, verifyPassword } from '../services/authService.js';
import { signToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  const { email, password, nickname } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: '该邮箱已注册。' });
  }

  const passwordHash = await hashPassword(password);
  const user = await User.create({ email, passwordHash, nickname });

  const token = signToken({ userId: user._id });
  res.status(201).json({ token, user: { id: user._id, email: user.email, nickname: user.nickname } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return res.status(401).json({ message: '邮箱或密码错误。' });
  }

  const token = signToken({ userId: user._id });
  res.json({ token, user: { id: user._id, email: user.email, nickname: user.nickname } });
};
