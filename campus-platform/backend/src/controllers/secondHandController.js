import { SecondHandItem } from '../models/SecondHandItem.js';

export const createSecondHandItem = async (req, res) => {
  if (!req.files?.length) {
    return res.status(400).json({ message: '请至少上传一张图片。' });
  }

  const images = req.files.map((file) => `/uploads/${file.filename}`);

  const item = await SecondHandItem.create({
    ...req.body,
    images,
    owner: req.user._id
  });

  res.status(201).json(item);
};

export const listSecondHandItems = async (req, res) => {
  const filter = {};
  if (req.query.category) {
    filter.category = req.query.category;
  }

  const items = await SecondHandItem.find(filter)
    .populate('owner', 'nickname email')
    .sort({ createdAt: -1 });

  res.json(items);
};
