import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Logo from '@/lib/models/Logo';
import Vote from '@/lib/models/Vote';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { rating } = await request.json();
    
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Geçerli bir puan gerekli (1-5)' }, { status: 400 });
    }

    await connectDB();
    const { id } = await params;

    // Logo'nun var olup olmadığını kontrol et
    const logo = await Logo.findById(id);
    if (!logo) {
      return NextResponse.json({ error: 'Logo bulunamadı' }, { status: 404 });
    }

    // Kullanıcı kimliğini al (IP adresi veya session token)
    const userIdentifier = request.headers.get('x-forwarded-for') || 
                          request.headers.get('x-real-ip') || 
                          'unknown';

    // Kullanıcının daha önce bu logoya oy verip vermediğini kontrol et
    const existingVote = await Vote.findOne({ 
      logo: id, 
      user: userIdentifier 
    });

    if (existingVote) {
      return NextResponse.json({ 
        error: 'Bu logoya zaten oy verdiniz. Her kullanıcı sadece bir kez oy verebilir.' 
      }, { status: 400 });
    }

    // Yeni oy oluştur
    await Vote.create({
      logo: id,
      user: userIdentifier,
      rating,
    });

    // Logo'nun ortalama puanını güncelle
    const votes = await Vote.find({ logo: id });
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const votes = await Vote.find({ logo: id });
    const totalRating = votes.reduce((sum, vote) => sum + vote.rating, 0);
    const averageRating = votes.length > 0 ? totalRating / votes.length : 0;

    return NextResponse.json({ 
      totalVotes: votes.length,
      averageRating: averageRating
    });
  } catch (error) {
    console.error('Oylama kontrolü hatası:', error);
    return NextResponse.json({ error: 'Oylama kontrolü yapılırken hata oluştu' }, { status: 500 });
  }
} 