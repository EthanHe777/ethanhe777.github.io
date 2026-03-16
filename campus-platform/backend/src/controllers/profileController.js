import { User } from '../models/User.js';
import { SecondHandItem } from '../models/SecondHandItem.js';
import { ErrandTask } from '../models/ErrandTask.js';

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-passwordHash').populate('favorites');
  const publishedItems = await SecondHandItem.find({ owner: req.user._id }).sort({ createdAt: -1 });
  const publishedTasks = await ErrandTask.find({ publisher: req.user._id }).sort({ createdAt: -1 });
  const acceptedTasks = await ErrandTask.find({ assignee: req.user._id }).sort({ createdAt: -1 });

  res.json({
    user,
    publishedItems,
    publishedTasks,
    acceptedTasks
  });
};
