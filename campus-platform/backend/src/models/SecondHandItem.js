import mongoose from 'mongoose';

const secondHandItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    condition: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    location: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['digital', 'books', 'daily', 'sports', 'other'],
      required: true
    },
    images: [{ type: String, required: true }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export const SecondHandItem = mongoose.model('SecondHandItem', secondHandItemSchema);
