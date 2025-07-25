import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Please define the MONGODB_URI environment variable');
  } else {
    console.warn('MONGODB_URI environment variable is not defined. Please add it to your .env.local file');
  }
}

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