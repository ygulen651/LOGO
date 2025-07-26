import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Logo from '@/lib/models/Logo';
import Vote from '@/lib/models/Vote';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { like, sessionId } = await request.json();
    
    if (typeof like !== 'boolean') {
      return NextResponse.json({ error: 'Geçerli bir beğeni değeri gerekli' }, { status: 400 });
    }

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID gerekli' }, { status: 400 });
    }

    await connectDB();
    const { id } = await params;

    // Logo'nun var olup olmadığını kontrol et
    const logo = await Logo.findById(id);
    if (!logo) {
      return NextResponse.json({ error: 'Logo bulunamadı' }, { status: 404 });
    }

    // Kullanıcının daha önce bu logoya oy verip vermediğini kontrol et
    const existingVote = await Vote.findOne({ 
      logo: id, 
      user: sessionId 
    });

    if (existingVote) {
      return NextResponse.json({ 
        error: 'Bu logoya zaten oy verdiniz. Her kullanıcı sadece bir kez oy verebilir.' 
      }, { status: 400 });
    }

    // Yeni oy oluştur
    await Vote.create({
      logo: id,
      user: sessionId,
      like,
    });

    // Logo'nun beğeni sayısını güncelle
    const votes = await Vote.find({ logo: id, like: true });
    const totalLikes = votes.length;

    logo.totalLikes = totalLikes;
    logo.totalVotes = await Vote.countDocuments({ logo: id });
    await logo.save();

    return NextResponse.json({ 
      success: true, 
      totalLikes: logo.totalLikes,
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
    const likes = await Vote.find({ logo: id, like: true });
    const totalLikes = likes.length;
    const totalVotes = votes.length;

    return NextResponse.json({ 
      totalVotes,
      totalLikes
    });
  } catch (error) {
    console.error('Oylama kontrolü hatası:', error);
    return NextResponse.json({ error: 'Oylama kontrolü yapılırken hata oluştu' }, { status: 500 });
  }
} 