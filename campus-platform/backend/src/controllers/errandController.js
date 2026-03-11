import { ErrandTask } from '../models/ErrandTask.js';

export const createErrandTask = async (req, res) => {
  const task = await ErrandTask.create({
    ...req.body,
    publisher: req.user._id
  });

  res.status(201).json(task);
};

export const listErrandTasks = async (req, res) => {
  const tasks = await ErrandTask.find()
    .populate('publisher', 'nickname')
    .populate('assignee', 'nickname')
    .sort({ createdAt: -1 });

  res.json(tasks);
};

export const updateErrandStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const task = await ErrandTask.findById(id);
  if (!task) {
    return res.status(404).json({ message: '任务不存在。' });
  }

  if (status === 'in-progress' && !task.assignee) {
    task.assignee = req.user._id;
  }

  task.status = status;
  await task.save();

  res.json(task);
};
