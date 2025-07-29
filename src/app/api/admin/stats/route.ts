import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Logo from '@/lib/models/Logo';
import Vote from '@/lib/models/Vote';

export async function GET() {
  try {
    await connectDB();

    // Toplam logo sayısı
    const totalLogos = await Logo.countDocuments();

    // Toplam oy sayısı
    const totalVotes = await Vote.countDocuments();

    // Son yüklenen logolar (son 10 logo)
    const recentLogos = await Logo.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('title imageUrl createdAt totalLikes totalVotes')
      .lean();

    // Son oy verenler (son 10 oy)
    const recentVotes = await Vote.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('logo', 'title')
      .lean();

    // Toplam kullanıcı sayısı (benzersiz user'lar)
    const uniqueUsers = await Vote.distinct('user');

    const stats = {
      totalLogos: totalLogos || 0,
      totalVotes: totalVotes || 0,
      totalUsers: uniqueUsers?.length || 0,
      recentLogos: (recentLogos || []).map(logo => ({
        title: logo.title || 'Bilinmeyen Logo',
        imageUrl: logo.imageUrl || '',
        createdAt: logo.createdAt || new Date(),
        votes: logo.totalLikes || 0
      })),
      recentVotes: (recentVotes || []).map(vote => ({
        userName: `Kullanıcı ${vote.user?.slice(-4) || 'Anonim'}`,
        logoTitle: vote.logo?.title || 'Bilinmeyen Logo',
        createdAt: vote.createdAt || new Date()
      }))
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { error: 'Admin istatistikleri alınırken hata oluştu' },
      { status: 500 }
    );
  }
} 