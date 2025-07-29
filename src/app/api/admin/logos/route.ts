import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Logo from '@/lib/models/Logo';

export async function GET() {
  try {
    await connectDB();

    // Tüm logoları getir
    const logos = await Logo.find()
      .sort({ createdAt: -1 })
      .select('title firstName lastName email phone imageUrl createdAt totalLikes totalVotes status')
      .lean();

    return NextResponse.json(logos);
  } catch (error) {
    console.error('Admin logos error:', error);
    return NextResponse.json(
      { error: 'Logolar alınırken hata oluştu' },
      { status: 500 }
    );
  }
} 