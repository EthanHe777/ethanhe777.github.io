import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDB = async () => {
  if (!env.mongoUri) {
    throw new Error('缺少 MONGO_URI 配置。');
  }

  await mongoose.connect(env.mongoUri, {
    autoIndex: true
  });
  console.log('✅ MongoDB 连接成功');
};
