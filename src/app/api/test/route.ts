import { NextResponse } from 'next/server';

export async function GET() {
  const envCheck = {
    cloudinary: {
      cloudName: !!process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: !!process.env.CLOUDINARY_API_KEY,
      apiSecret: !!process.env.CLOUDINARY_API_SECRET,
    },
    mongodb: {
      uri: !!process.env.MONGODB_URI,
    },
    nodeEnv: process.env.NODE_ENV,
  };

  return NextResponse.json({
    message: 'Environment variables kontrolü',
    envCheck,
    timestamp: new Date().toISOString(),
  });
} 