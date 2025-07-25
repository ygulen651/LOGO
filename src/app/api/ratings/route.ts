import { NextRequest, NextResponse } from 'next/server';
import { getApiRatings } from '@/lib/apiRating';

export async function GET() {
  try {
    const ratings = await getApiRatings();
    return NextResponse.json(ratings);
  } catch (error) {
    console.error('API ratings error:', error);
    return NextResponse.json({ error: 'API puanları yüklenirken hata oluştu' }, { status: 500 });
  }
} 