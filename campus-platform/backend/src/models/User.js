import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    nickname: {
      type: String,
      required: true,
      trim: true
    },
    avatar: {
      type: String,
      default: ''
    },
    bio: {
      type: String,
      default: ''
    },
    favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SecondHandItem'
    }]
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
