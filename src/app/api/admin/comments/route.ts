import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Comment from '@/lib/models/Comment';

export async function GET() {
  try {
    await connectDB();

    console.log('Yorumlar getiriliyor...');

    // Tüm yorumları getir
    const comments = await Comment.find()
      .sort({ createdAt: -1 })
      .populate('logo', 'title')
      .lean();

    console.log('Bulunan yorum sayısı:', comments.length);
    console.log('İlk yorum örneği:', comments[0]);

    return NextResponse.json({
      success: true,
      count: comments.length,
      comments: comments
    });
  } catch (error) {
    console.error('Admin comments error:', error);
    return NextResponse.json(
      { 
        error: 'Yorumlar alınırken hata oluştu',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    );
  }
} 