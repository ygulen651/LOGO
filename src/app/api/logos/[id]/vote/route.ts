import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Logo from '@/lib/models/Logo';
import Vote from '@/lib/models/Vote';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 });
    }

    const { rating } = await request.json();
    
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Geçerli bir puan gerekli (1-5)' }, { status: 400 });
    }

    await connectDB();

    // Logo'nun var olup olmadığını kontrol et
    const logo = await Logo.findById(params.id);
    if (!logo) {
      return NextResponse.json({ error: 'Logo bulunamadı' }, { status: 404 });
    }

    // Kullanıcının daha önce oy verip vermediğini kontrol et
    const existingVote = await Vote.findOne({
      user: session.user.id,
      logo: params.id,
    });

    if (existingVote) {
      // Mevcut oyu güncelle
      existingVote.rating = rating;
      await existingVote.save();
    } else {
      // Yeni oy oluştur
      await Vote.create({
        user: session.user.id,
        logo: params.id,
        rating,
      });
    }

    // Logo'nun ortalama puanını güncelle
    const votes = await Vote.find({ logo: params.id });
    const totalRating = votes.reduce((sum, vote) => sum + vote.rating, 0);
    const averageRating = totalRating / votes.length;

    logo.averageRating = averageRating;
    logo.totalVotes = votes.length;
    await logo.save();

    return NextResponse.json({ 
      success: true, 
      averageRating: logo.averageRating,
      totalVotes: logo.totalVotes 
    });
  } catch (error) {
    console.error('Oylama hatası:', error);
    return NextResponse.json({ error: 'Oylama yapılırken hata oluştu' }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 });
    }

    await connectDB();

    const vote = await Vote.findOne({
      user: session.user.id,
      logo: params.id,
    });

    return NextResponse.json({ 
      hasVoted: !!vote,
      rating: vote?.rating || null 
    });
  } catch (error) {
    console.error('Oylama kontrolü hatası:', error);
    return NextResponse.json({ error: 'Oylama kontrolü yapılırken hata oluştu' }, { status: 500 });
  }
} 