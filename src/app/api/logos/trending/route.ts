import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Logo from '@/lib/models/Logo';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const skip = (page - 1) * limit;

    // En çok beğenilen logoları getir
    const trendingLogos = await Logo.find()
      .sort({ totalLikes: -1, totalVotes: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Logo.countDocuments();

    return NextResponse.json({
      logos: trendingLogos,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Trending logos hatası:', error);
    return NextResponse.json({ error: 'Trending logolar yüklenirken hata oluştu' }, { status: 500 });
  }
} 