import mongoose from 'mongoose';

const errandTaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['substitute-class', 'pickup-delivery', 'campus-run'],
      required: true
    },
    description: { type: String, required: true, trim: true },
    reward: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending'
    },
    publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
  },
  { timestamps: true }
);

export const ErrandTask = mongoose.model('ErrandTask', errandTaskSchema);
