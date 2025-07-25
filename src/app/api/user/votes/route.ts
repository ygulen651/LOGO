import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Vote from '@/lib/models/Vote';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 });
    }

    await connectDB();

    const votes = await Vote.find({ user: session.user.id })
      .populate('logo', 'title imageUrl')
      .sort({ createdAt: -1 });

    return NextResponse.json(votes);
  } catch (error) {
    console.error('Kullanıcı oyları hatası:', error);
    return NextResponse.json({ error: 'Oylar yüklenirken hata oluştu' }, { status: 500 });
  }
} 