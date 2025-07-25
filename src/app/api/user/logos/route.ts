import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Logo from '@/lib/models/Logo';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 });
    }

    await connectDB();

    const logos = await Logo.find({ creator: session.user.id })
      .sort({ createdAt: -1 });

    return NextResponse.json(logos);
  } catch (error) {
    console.error('Kullanıcı logoları hatası:', error);
    return NextResponse.json({ error: 'Logolar yüklenirken hata oluştu' }, { status: 500 });
  }
} 