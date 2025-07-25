import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any

async function connectDB() {
  if (cached) {
    return cached;
  }

  if (!MONGODB_URI) {
    throw new Error('MongoDB URI is not configured');
  }

  cached = await mongoose.connect(MONGODB_URI);
  return cached;
}

export default connectDB; 