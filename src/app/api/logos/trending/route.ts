import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Logo from '@/lib/models/Logo';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    // En çok beğenilen logoları getir
    const trendingLogos = await Logo.find()
      .sort({ totalLikes: -1, totalVotes: -1 })
      .limit(limit);

    return NextResponse.json(trendingLogos);
  } catch (error) {
    console.error('Trending logos hatası:', error);
    return NextResponse.json({ error: 'Trending logolar yüklenirken hata oluştu' }, { status: 500 });
  }
} 